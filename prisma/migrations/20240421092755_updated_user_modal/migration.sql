/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmPassword" TEXT,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
