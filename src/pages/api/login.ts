import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  result: object
}

type ReqBody = {
  email: string
}

export default async function handler(req: NextApiRequest,
  res: NextApiResponse<ResponseData>) {
  let body: ReqBody = req.body;
  await fetch(`${process.env.API_URL}getPassHash`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body.email,
    }),
  }).then(async (response) => {    
    res.status(response.status).json(await response.json())
    res.end();
  });

}
