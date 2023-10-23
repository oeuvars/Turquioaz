import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rent = await prisma.rentedCar.create({
    data: {
      carId: 2,
      rentedtoId: 1,
      startDate: "7th Oct, 2023",
      endDate: "15th Oct, 2023",
      status: true,
    },
  });
}

main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
