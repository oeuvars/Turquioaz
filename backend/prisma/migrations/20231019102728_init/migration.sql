-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addedCar" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "addedById" INTEGER NOT NULL,

    CONSTRAINT "addedCar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "addedCar" ADD CONSTRAINT "addedCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addedCar" ADD CONSTRAINT "addedCar_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
