/*
  Warnings:

  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminMail]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminMail` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_email_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "email",
ADD COLUMN     "adminMail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminMail_key" ON "Admin"("adminMail");
