/*
  Warnings:

  - Added the required column `protocol_no` to the `trial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trial` ADD COLUMN `protocol_no` VARCHAR(191) NOT NULL;
