import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { FormResult, Entry } from "../../../interfaces";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const prisma = new PrismaClient();
  const { date, entries } = req.body;

  const result = entries.map(async (entry: Entry) => {
    try {
      const insert = await prisma.weighIn.create({
        data: {
          weighDate: date,
          weight: parseInt(entry.weight),
          person: { connect: { name: entry.name } }
        }
      });
      console.log(insert);
    } catch (e) {
      console.log(e);
    }
  });

  /*  const result = await prisma.weighIn.create({
    data: {
      weighDate: date,
      weight: 1234,
      person: { connect: { name: name } }
    }
  }); */
  res.json(result);
};
