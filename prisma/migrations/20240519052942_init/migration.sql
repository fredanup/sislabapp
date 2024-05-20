/*
  Warnings:

  - You are about to drop the column `destinationId` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `move_date` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `move_state` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `move_type` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `provenanceId` on the `Example` table. All the data in the column will be lost.
  - Added the required column `example_code` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `Example` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_provenanceId_fkey";

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "destinationId",
DROP COLUMN "move_date",
DROP COLUMN "move_state",
DROP COLUMN "move_type",
DROP COLUMN "provenanceId",
ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "example_code" TEXT NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "move_type" TEXT NOT NULL,
    "move_date" TIMESTAMP(3) NOT NULL,
    "move_status" TEXT NOT NULL,
    "provenanceId" TEXT,
    "destinationId" TEXT,
    "exampleId" TEXT,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_provenanceId_fkey" FOREIGN KEY ("provenanceId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_exampleId_fkey" FOREIGN KEY ("exampleId") REFERENCES "Example"("id") ON DELETE SET NULL ON UPDATE CASCADE;
