-- AlterTable
ALTER TABLE `account` ADD COLUMN `subscriptionId` INTEGER NULL;

-- CreateTable
CREATE TABLE `subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan` ENUM('MOBILE', 'BASIC', 'STANDARD', 'PREMIUM') NOT NULL DEFAULT 'BASIC',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `subscription`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
