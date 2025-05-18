/*
  Warnings:

  - You are about to alter the column `favorite` on the `Clothe` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Clothe` MODIFY `favorite` BOOLEAN NOT NULL;
