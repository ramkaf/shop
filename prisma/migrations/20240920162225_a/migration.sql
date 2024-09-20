/*
  Warnings:

  - You are about to drop the column `recipientlastName` on the `order` table. All the data in the column will be lost.
  - Added the required column `recipientLastName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `recipientlastName`,
    ADD COLUMN `recipientLastName` VARCHAR(191) NOT NULL;
