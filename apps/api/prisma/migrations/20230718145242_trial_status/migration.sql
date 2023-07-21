/*
  Warnings:

  - The values [PENDING] on the enum `trial_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `trial` ADD COLUMN `trial_status` ENUM('PENDING', 'MATCHED') NULL,
    MODIFY `status` ENUM('DRAFT', 'IN_REVIEW', 'COMPLETED') NULL DEFAULT 'DRAFT';
