-- AlterTable
ALTER TABLE `event` MODIFY `type` ENUM('LoginSuccessful', 'LoginFailed', 'TrialCreated', 'TrialRead', 'TrialReadMany', 'TrialUpdated', 'TrialDeleted', 'TrialDoesNotExist', 'TrialExported', 'TrialLocked', 'TrialUnlocked', 'CtmlJsonCreated', 'CtmlJsonRead', 'CtmlJsonReadMany', 'CtmlJsonUpdated', 'CtmlJsonUpdatedMany', 'CtmlJsonDeleted', 'CtmlJsonDoesNotExist', 'CtmlJsonSentToMatchminer', 'CtmlSchemaCreated', 'CtmlSchemaRead', 'CtmlSchemaReadMany', 'CtmlSchemaUpdated', 'CtmlSchemaDeleted', 'CtmlSchemaDoesNotExist', 'ResultDownloaded', 'MatchJobCreated', 'MatchMessageRecevied') NOT NULL;

-- CreateTable
CREATE TABLE `trial_lock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trialId` INTEGER NOT NULL,
    `locked_by` INTEGER NOT NULL,
    `locked_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lock_expiry` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trial_lock` ADD CONSTRAINT `trial_lock_trialId_fkey` FOREIGN KEY (`trialId`) REFERENCES `trial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trial_lock` ADD CONSTRAINT `trial_lock_locked_by_fkey` FOREIGN KEY (`locked_by`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
