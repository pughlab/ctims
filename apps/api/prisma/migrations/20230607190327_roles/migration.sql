-- AlterTable
ALTER TABLE `trial` ADD COLUMN `trial_groupId` INTEGER NULL;

-- CreateTable
CREATE TABLE `trial_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `trial_group_name_key`(`name`),
    INDEX `trial_group_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trial` ADD CONSTRAINT `trial_trial_groupId_fkey` FOREIGN KEY (`trial_groupId`) REFERENCES `trial_group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
