-- CreateTable
CREATE TABLE `ctml_schema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` INTEGER NOT NULL,
    `schema` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ctml_schema_version_key`(`version`),
    INDEX `ctml_schema_version_idx`(`version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ctml_json` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `versionId` INTEGER NULL,
    `data` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `trialId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nct_id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `principal_investigator` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'COMPLETED') NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `modifiedById` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `last_name` VARCHAR(191) NULL,
    `refresh_token` LONGTEXT NULL,
    `keycloak_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_keycloak_id_key`(`keycloak_id`),
    INDEX `user_keycloak_id_idx`(`keycloak_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ctml_schemaTotrial` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ctml_schemaTotrial_AB_unique`(`A`, `B`),
    INDEX `_ctml_schemaTotrial_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ctml_json` ADD CONSTRAINT `ctml_json_versionId_fkey` FOREIGN KEY (`versionId`) REFERENCES `ctml_schema`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ctml_json` ADD CONSTRAINT `ctml_json_trialId_fkey` FOREIGN KEY (`trialId`) REFERENCES `trial`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trial` ADD CONSTRAINT `trial_modifiedById_fkey` FOREIGN KEY (`modifiedById`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trial` ADD CONSTRAINT `trial_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ctml_schemaTotrial` ADD CONSTRAINT `_ctml_schemaTotrial_A_fkey` FOREIGN KEY (`A`) REFERENCES `ctml_schema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ctml_schemaTotrial` ADD CONSTRAINT `_ctml_schemaTotrial_B_fkey` FOREIGN KEY (`B`) REFERENCES `trial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
