-- AlterTable
ALTER TABLE `trial` MODIFY `trial_status` ENUM('PENDING', 'MATCHED', 'ERROR') NULL;
