import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// POST /api/post
// Required fields in body: title
// Optional fields in body: content

// Handle updateCurrentWeight

export default async function handler(_req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {

  let test;
  try {
    res.statusCode = 200;
    test = await prisma.person.findMany({
      orderBy: { name: "asc" },
      include: { weighIns: true },
    });
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify(error));
    console.log(error);
  }

  res.json(test);
}
