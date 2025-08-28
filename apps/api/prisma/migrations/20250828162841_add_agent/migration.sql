-- CreateTable
CREATE TABLE `agent` (
    `id` INTEGER NOT NULL,
    `agent` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `agent_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;