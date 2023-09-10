import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}

type ReqBody = {
  email: string
  password: string
  namesurname: string
}

export default async function handler(req: NextApiRequest,
  res: NextApiResponse<ResponseData>) {
  let body: ReqBody = req.body;
  let saltRounds = 10;
  console.log(1);

  console.log(2);

  await fetch(`${process.env.API_URL}createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: body.namesurname,
      email: body.email,
      password: await bcrypt.hash(body.password, saltRounds),
      businessID: 1,
    }),
  }).then((response) => {
    res.status(response.status).end();
  });
  console.log(3);

}
