-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_variantId_fkey`;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `VariantItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
