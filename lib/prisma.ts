/* eslint-disable */
import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

declare const global: NodeJS.Global & { prisma?: PrismaClient };

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
