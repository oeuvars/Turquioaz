/*
  Warnings:

  - You are about to drop the `addedCar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addedCar" DROP CONSTRAINT "addedCar_addedById_fkey";

-- DropForeignKey
ALTER TABLE "addedCar" DROP CONSTRAINT "addedCar_carId_fkey";

-- DropTable
DROP TABLE "addedCar";
