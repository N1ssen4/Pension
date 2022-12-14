import { NextApiRequest, NextApiResponse } from "next";

const PENSURE_API_KEY = process.env.PENSURE_API_KEY!;
const PENSURE_API_URL = process.env.PENSURE_API_URL!;

function fetchPensureData(
  url: string,
  apiToken: string,
  method: "GET" | "POST",
  body?: any
) {
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
}

async function markExported(apiToken: string, failureMessage?: string) {
  let url = `${PENSURE_API_URL}/gateway/exported`;

  if (failureMessage) {
    url = `${url}?failed=${failureMessage}`;
  }

  const response = await fetchPensureData(url, apiToken, "POST");
  return response;
}
export async function getPensionInfo(apiToken: string, uid: string) {
  const pensureInfoJSONResponse = await fetchPensureData(
    `${PENSURE_API_URL}/providers/pensionsinfo/file/data`,
    apiToken,
    "GET"
  );
  const pensureInfoJSON = await pensureInfoJSONResponse.json();

  console.log("JSON insertion result");
  console.log(pensureInfoJSON);

  const pensureInfoPDFResponse = await fetchPensureData(
    `${PENSURE_API_URL}/providers/pensionsinfo/file/pdf`,
    apiToken,
    "GET"
  );

  const pensionInfoPDF = await pensureInfoPDFResponse.arrayBuffer();

  console.log(`PDF insertion result`);
  console.log(pensionInfoPDF);
}

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { apiToken, identity } = req.body;

    if (!apiToken || !identity) {
      res
        .status(400)
        .json({ message: "Expected fields missing in request body" });
      return;
    }

    try {
      await getPensionInfo(apiToken, identity);
      await markExported(apiToken);

      // add key 'fetchPensionInformation' - indicating user has pensionInfo.
      const pensionInfoAddedKey = {
        key: "fetchPensionInformation",
        value: "YesGetPensionInfo",
      };
      console.log(pensionInfoAddedKey)

      res.status(200).end();
    } catch (e) {
      console.error(e);
      const exportedCallResponse = await markExported(
        apiToken,
        (e as any)?.message
      );
      res.status(500).json({ errorMessage: (e as any)?.message });
    }
  }

  res.status(405).end();
}
