/*
  Warnings:

  - You are about to drop the column `move_date` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `move_status` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `move_type` on the `Movement` table. All the data in the column will be lost.
  - Added the required column `moveDate` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveStatus` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveType` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "move_date",
DROP COLUMN "move_status",
DROP COLUMN "move_type",
ADD COLUMN     "moveDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "moveStatus" TEXT NOT NULL,
ADD COLUMN     "moveType" TEXT NOT NULL;
