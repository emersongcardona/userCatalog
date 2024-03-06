/*
  Warnings:

  - You are about to drop the column `remember_created_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "remember_created_at",
ALTER COLUMN "reset_password_token" DROP NOT NULL,
ALTER COLUMN "reset_password_sent_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
