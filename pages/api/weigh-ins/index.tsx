import { NextApiRequest, NextApiResponse } from "next";
import { Entry } from "../../../interfaces";
import prisma from "lib/prisma";

// const prisma = db.getInstance().prisma;
// POST /api/weigh-ins
// Required fields in body: title
// Optional fields in body: content
// Currently creates, but should also handle get and if it is get, get all
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "GET") {
    return handleGET(res);
  } else if (req.method === "POST") {
    return handlePOST(req, res);
  } else {
    return res.status(500).json({
      error: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
};

async function handleGET(res: NextApiResponse) {
  let result;
  try {
    result = await prisma.weighIn.findMany();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }

  return res.status(200).json(result);
}

// this needs to be cleaned up
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { date, entries, updateCurrentWeight } = req.body;
  // use id for connecting weighins to user, not name

  if (
    !(
      updateCurrentWeight === "true" ||
      updateCurrentWeight === "false" ||
      typeof updateCurrentWeight === "boolean"
    )
  ) {
    return res.status(400).json({
      error:
        "updateCurrentWeight must be a boolean or string 'true' or 'false'",
    });
  }

  if (entries.length === 0) {
    return res.status(400).json({ error: "Entries field required" });
  }

  const records = entries
    .filter((entry: Entry) => !!entry)
    .map((entry: Entry) => {
      return prisma.weighIn.create({
        data: {
          weighDate: date,
          weight:
            typeof entry.weight === "string"
              ? parseFloat(entry.weight)
              : entry.weight,
          user: { connect: { name: entry.name } },
        },
        include: { user: true },
      });
    });

  // console.log("records!");
  // console.log(records);
  let result;

  try {
    result = await prisma.$transaction(records);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

  let updateWeightRes;

  // console.log("updating current weights");
  // console.log(entries);
  if (updateCurrentWeight) {
    try {
      // replace this with updateMany?
      const updateCurrentWeights = entries
        .filter((entry: Entry) => !!entry)
        .map((entry: Entry) => {
          return prisma.user.update({
            where: { name: entry.name },
            data: {
              currentWeight:
                typeof entry.weight === "string"
                  ? parseFloat(entry.weight)
                  : entry.weight,
            },
          });
        });
      updateWeightRes = await prisma.$transaction(updateCurrentWeights);
    } catch (error) {
      console.log("Error updating current weight");
      console.log(error);
      return res.status(500).json(error);
    }
  }

  return res.status(201).json([result, updateWeightRes]);
}
