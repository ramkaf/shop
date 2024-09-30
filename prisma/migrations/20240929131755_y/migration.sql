/*
  Warnings:

  - You are about to drop the column `ShippingCost` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `ShippingDate` on the `order` table. All the data in the column will be lost.
  - Added the required column `shippingCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingDate` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `ShippingCost`,
    DROP COLUMN `ShippingDate`,
    ADD COLUMN `shippingCost` DOUBLE NOT NULL,
    ADD COLUMN `shippingDate` DATETIME(3) NOT NULL;
