/*
  Warnings:

  - Made the column `productId` on table `Example` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchId` on table `Example` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_productId_fkey";

-- AlterTable
ALTER TABLE "Example" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "branchId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
