/*
  Warnings:

  - Made the column `personId` on table `weighins` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "weighins" DROP CONSTRAINT "weighins_personId_fkey";

-- AlterTable
ALTER TABLE "weighins" ALTER COLUMN "personId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "weighins" ADD CONSTRAINT "weighins_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
