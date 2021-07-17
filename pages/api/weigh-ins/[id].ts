import { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

import { WeighIn } from "interfaces";

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const weighInId = req.query.id;
  if (req.method === "GET") {
    return handleGET(weighInId as string, res);
  } else if (req.method === "DELETE") {
    return handleDELETE(weighInId as string, res);
  } else if (req.method === "PUT") {
    return handlePUT(weighInId as string, req.body.data, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function handleGET(weighInId: string, res: NextApiResponse) {
  let result;
  try {
    result = await prisma.weighIn.findUnique({
      where: { id: Number(weighInId) },
      include: { user: true },
    });
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json({ error: "Error: Weigh-In not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  } finally {
    prisma.$disconnect();
  }
}

async function handlePUT(
  weighInId: string,
  data: WeighIn,
  res: NextApiResponse
) {
  try {
    const weighIn = await prisma.weighIn.update({
      where: {
        id: Number(weighInId),
      },
      include: {
        user: true,
      },
      data: {
        ...data,
      },
    });
    return res.json(weighIn);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function handleDELETE(weighInId: string, res: NextApiResponse) {
  let result;
  try {
    result = await prisma.weighIn.delete({
      where: { id: Number(weighInId) },
    });
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("weighIN not found");
    }
  } catch (error) {
    // we know this is a prisma 'record not found' error
    if (error.meta.details.indexOf("RecordNotFound") !== -1) {
      console.error("Delete Error: Weigh-In not found");
      return res
        .status(404)
        .json({ error: "Could not find weigh-in to delete" });
    }
    return res.status(500).json(error);
  }
}
