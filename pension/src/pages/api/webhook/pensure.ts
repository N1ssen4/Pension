import { NextApiRequest, NextApiResponse } from "next";

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

export async function getPensionInfo(apiToken: string) {
  const pensureResponse = await fetchPensureData(
    `${PENSURE_API_URL}/providers/pensionsinfo/file/data`,
    apiToken,
    "GET"
  );
  const pensureInfoJSON = await pensureResponse.json();
  return pensureInfoJSON;
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
      await getPensionInfo(apiToken);
      await markExported(apiToken);

      res.status(200).json(res)
    } catch (err) {
      console.log(err);

      res.status(500).json({ errormessage: (err as any)?.message });
    }
  }
  res.status(405).end();
}

