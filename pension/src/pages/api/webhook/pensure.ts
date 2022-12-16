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
  console.log(apiToken)
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
  const JSONpensureResponse = await pensureResponse.json();
  console.log(JSON.stringify(JSONpensureResponse));
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
      console.log("Got here");
      res.status(200).end();
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
  res.status(405).end();
}
