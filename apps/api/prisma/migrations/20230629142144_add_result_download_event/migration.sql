-- AlterTable
ALTER TABLE `ctml_json` MODIFY `data` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `type` ENUM('LoginSuccessful', 'LoginFailed', 'TrialCreated', 'TrialRead', 'TrialReadMany', 'TrialUpdated', 'TrialDeleted', 'TrialDoesNotExist', 'TrialExported', 'CtmlJsonCreated', 'CtmlJsonRead', 'CtmlJsonReadMany', 'CtmlJsonUpdated', 'CtmlJsonUpdatedMany', 'CtmlJsonDeleted', 'CtmlJsonDoesNotExist', 'CtmlSchemaCreated', 'CtmlSchemaRead', 'CtmlSchemaReadMany', 'CtmlSchemaUpdated', 'CtmlSchemaDeleted', 'CtmlSchemaDoesNotExist', 'ResultDownloaded') NOT NULL;
