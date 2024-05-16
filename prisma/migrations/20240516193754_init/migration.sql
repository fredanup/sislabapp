/*
  Warnings:

  - You are about to drop the column `destinationd` on the `Example` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_destinationd_fkey";

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "destinationd",
ADD COLUMN     "destinationId" TEXT;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
