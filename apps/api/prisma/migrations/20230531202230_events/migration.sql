-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` ENUM('LoginSuccessful', 'LoginFailed', 'TrialCreated', 'TrialRead', 'TrialReadMany', 'TrialUpdated', 'TrialDeleted', 'TrialDoesNotExist', 'TrialExported', 'CtmlJsonCreated', 'CtmlJsonRead', 'CtmlJsonReadMany', 'CtmlJsonUpdated', 'CtmlJsonUpdatedMany', 'CtmlJsonDeleted', 'CtmlJsonDoesNotExist', 'CtmlSchemaCreated', 'CtmlSchemaRead', 'CtmlSchemaReadMany', 'CtmlSchemaUpdated', 'CtmlSchemaDeleted', 'CtmlSchemaDoesNotExist') NOT NULL,
    `description` VARCHAR(191) NULL,
    `userId` INTEGER NULL,
    `metadata` JSON NULL,
    `trialId` INTEGER NULL,
    `ctml_jsonId` INTEGER NULL,
    `ctml_schemaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_trialId_fkey` FOREIGN KEY (`trialId`) REFERENCES `trial`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_ctml_jsonId_fkey` FOREIGN KEY (`ctml_jsonId`) REFERENCES `ctml_json`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_ctml_schemaId_fkey` FOREIGN KEY (`ctml_schemaId`) REFERENCES `ctml_schema`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
