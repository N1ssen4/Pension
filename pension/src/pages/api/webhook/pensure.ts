import { identity } from "cypress/types/lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { createPensionInfo } from "../../../services/pension.service";

const PENSURE_API_KEY = process.env.PENSURE_API_KEY!;
const PENSURE_API_URL = process.env.PENSURE_API_URL!;

const fetchPensureData = (
  url: string,
  apiToken: string,
  method: "GET" | "POST",
  body?: any
) => {
  const params: RequestInit = {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiToken}`,
      "X-Pensure-ApiKey": PENSURE_API_KEY,
    },
  };
  if (body) {
    params.body = body;
  }

  return fetch(url, params);
};
async function markExported(apiToken: string, failureMessage?: string) {
  let url = `${PENSURE_API_URL}/gateway/exported`;

  if (failureMessage) {
    url = `${url}?failed=${failureMessage}`;
  }

  const response = await fetchPensureData(url, apiToken, "POST");
  return response;
}

async function getPensionInfo(apiToken: string, uid: string) {
  const pensureResponse = await fetchPensureData(
    `${PENSURE_API_URL}/providers/pensionsinfo/file/data`,
    apiToken,
    "GET"
  );
  const pensureInfoJSON = await pensureResponse.json();

  function getIndividualPensionInfo(obj: any): any[] {
    const pensionInfo: any[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "PensionProviders") {
          // Iterate over the pension providers
          for (const provider of obj[key]) {
            // Get the provider name, payment, and saved value for each scheme
            const providerPayments = provider.Schemes.map((scheme: any) => ({
              PensionProviderName: provider.PensionProviderName,
              Payment: scheme.Payment,
              SavedValue: scheme.SavedValue,
            }));
            // Add the provider payments to the payments array
            pensionInfo.push(...providerPayments);
          }
        } else if (typeof obj[key] === "object") {
          // If the value is an object, call the function recursively on it
          pensionInfo.push(...getIndividualPensionInfo(obj[key]));
        }
      }
    }
    return pensionInfo;
  }

  const payments = getIndividualPensionInfo(pensureInfoJSON);
  
  await createPensionInfo(uid, payments);
}

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { apiToken, identity } = req.body;

    if (!apiToken || !identity) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }
    try {
      await getPensionInfo(apiToken, identity);
      await markExported(apiToken);

      res.status(200).end();
    } catch (err) {
      console.log(err);
      
      res.status(500).json({ errormessage: (err as any)?.message });
    }
  }
  res.status(405).end();
}
