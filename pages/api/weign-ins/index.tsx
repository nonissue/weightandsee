import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { name, date, weight } = req.body;

  const result = await prisma.weighIn.create({
    data: {
      weighDate: date,
      weight: weight,
      person: { connect: { name: name } }
    }
  });
  res.json(result);
};
