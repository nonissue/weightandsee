-- AlterTable
ALTER TABLE "people" ADD COLUMN     "currentHeight" DECIMAL(65,30),
ADD COLUMN     "currentHeightID" INTEGER;

-- CreateTable
CREATE TABLE "heightcheck" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "heightDate" TIMESTAMP(3) NOT NULL,
    "height" DECIMAL(65,30) NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "heightcheck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "heightcheck" ADD CONSTRAINT "heightcheck_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
