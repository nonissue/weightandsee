import { NextApiRequest, NextApiResponse } from "next";

import db from "prisma";
const prisma = db.getInstance().prisma;
// POST /api/weigh-ins
// Required fields in body: title
// Optional fields in body: content
// Currently creates, but should also handle get and if it is get, get all
export default async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  let result;
  try {
    result = await prisma.weighIn.findMany();
  } catch (error) {
    console.log(error);
    res.statusCode = 501;
    res.end();
  }
  res.json(result);
};
