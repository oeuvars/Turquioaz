import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const car = await prisma.cars.createMany({
    data: [
      {
        brand: "Toyota",
        id: 1,
      },
      {
        brand: "Honda",
        id: 2,
      },
      {
        brand: "Ford",
        id: 3,
      },
      {
        brand: "Chevrolet",
        id: 4,
      },
      {
        brand: "Volkswagen",
        id: 5,
      },
      {
        brand: "BMW",
        id: 6,
      },
      {
        brand: "Mercedes-Benz",
        id: 7,
      },
      {
        brand: "Audi",
        id: 8,
      },
      {
        brand: "Lexus",
        id: 9,
      },
      {
        brand: "Nissan",
        id: 10,
      },
      {
        brand: "Mazda",
        id: 11,
      },
      {
        brand: "Hyundai",
        id: 12,
      },
      {
        brand: "Kia",
        id: 13,
      },
      {
        brand: "Subaru",
        id: 14,
      },
      {
        brand: "Jeep",
        id: 15,
      },
      {
        brand: "Volvo",
        id: 16,
      },
      {
        brand: "Porsche",
        id: 17,
      },
      {
        brand: "Tesla",
        id: 18,
      },
      {
        brand: "Ferrari",
        id: 19,
      },
      {
        brand: "Lamborghini",
        id: 20,
      },
    ],
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
