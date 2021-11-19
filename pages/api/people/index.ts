import { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";
// POST /api/post
// Required fields in body: title
// Optional fields in body: content

// Handle updateCurrentWeight

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  let test;
  // console.log(process.env);

  try {
    res.statusCode = 200;
    test = await prisma.user.findMany({
      orderBy: { name: "asc" },
      include: { weighIns: true },
    });
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.end(JSON.stringify(error));
  }

  res.json(test);
}
