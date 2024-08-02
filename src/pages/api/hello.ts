import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  status: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const responseMessage = {
    message: "Essa é uma mesagem de 200!",
    status: 200,
  };

  res.status(200).json(responseMessage);
}
