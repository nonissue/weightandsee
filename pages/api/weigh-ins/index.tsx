import { NextApiRequest, NextApiResponse } from "next";

import { Entry } from "../../../interfaces";
import db from "prisma";
const prisma = db.getInstance().prisma;
// POST /api/post
// Required fields in body: title
// Optional fields in body: content

// Handle updateCurrentWeight

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { date, entries, updateCurrentWeight } = req.body;

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
          person: { connect: { name: entry.name } },
        },
        include: { person: true },
      });
    });

  let result;

  try {
    result = await prisma.$transaction(records);
  } catch (e) {
    console.log(e);
  }

  let updateWeightRes;

  if (updateCurrentWeight) {
    try {
      const updateCurrentWeights = entries
        .filter((entry: Entry) => !!entry)
        .map((entry: Entry) => {
          return prisma.person.update({
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
    } catch (e) {
      console.log("Error updating current weight");
      console.log(e);
    }
  }

  console.log(result);

  res.json([result, updateWeightRes]);
};
