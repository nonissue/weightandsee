import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE /api/post/:id
export default async function handle(req:  NextApiRequest, res: NextApiResponse): Promise<void> {
  const weighInId = req.query.id;
  if (req.method === 'GET') {
    handleGET(weighInId as string, res);
  } else if (req.method === 'DELETE') {
    handleDELETE(weighInId as string, res);
  } else if (req.method === 'PUT') {
    handlePUT(weighInId as string, req.body.data, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }

  // if (req.method === "DELETE") {
  //   const weighIn = await prisma.weighIn.delete({
  //     where: { id: Number(weighInId) },
  //   });

  //   res.json(weighIn);
  // } else {
  //   res.statusCode = 501;
  //   throw new Error(
  //     `The HTTP ${req.method} method is not supported at this route.`
  //   );
  // }
}

async function handleGET(weighInId: string, res: NextApiResponse) {
  const weighIn = await prisma.weighIn.findOne({
    where: { id: Number(weighInId) },
    include: { person: true },
  });

  res.json(weighIn);
}

async function handlePUT(weighInId: string, data: any, res: NextApiResponse) {
  const weighIn = await prisma.weighIn.update({
    where: {
      id: Number(weighInId),
    },
    include: {
      person: true,
    },
    data: {
      ...data
    },
  });
  res.json(weighIn);
}

async function handleDELETE(weighInId: string, res: NextApiResponse) {
  const weighIn = await prisma.weighIn.delete({
    where: { id: Number(weighInId) },
  });
  res.json(weighIn);
}
