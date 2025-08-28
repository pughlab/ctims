-- CreateTable
CREATE TABLE `agentclass` (
    `id` INTEGER NOT NULL,
    `agentclass` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `agentclass_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
