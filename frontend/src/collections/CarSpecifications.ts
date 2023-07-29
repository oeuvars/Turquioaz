import { createUniqueId } from "solid-js";
export type CarSpecifications = {
  brand: string;
  models: {
    id: string
    name: string;
    transmission: string;
    fuelType: string;
    seatNumbers: number;
    condition: string;
    price: number;
    rentPrice: number;
  }[];
};
const CarSpecifications: CarSpecifications[] = [
  {
    brand: "Toyota",
    models: [
      {
        id: "id_1",
        name: "Camry",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 25000,
        rentPrice: 150,
      },
      {
        id: "id_2",
        name: "Corolla",
        transmission: "Manual",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 15000,
        rentPrice: 100,
      },
      {
        id: "id_3",
        name: "RAV4",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 20000,
        rentPrice: 120,
      },
      {
        id: "id_4",
        name: "Highlander",
        transmission: "Automatic",
        fuelType: "Hybrid",
        seatNumbers: 7,
        condition: "New",
        price: 35000,
        rentPrice: 200,
      },
      {
        id: "id_5",
        name: "Prius",
        transmission: "Automatic",
        fuelType: "Hybrid",
        seatNumbers: 5,
        condition: "Used",
        price: 18000,
        rentPrice: 110,
      },
    ],
  },
  {
    brand: "Honda",
    models: [
      {
        id: "id_6",
        name: "Civic",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 22000,
        rentPrice: 130,
      },
      {
        id: "id_7",
        name: "Accord",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 18000,
        rentPrice: 110,
      },
      {
        id: "id_8",
        name: "CR-V",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 25000,
        rentPrice: 150,
      },
      {
        id: "id_9",
        name: "Pilot",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 8,
        condition: "New",
        price: 35000,
        rentPrice: 200,
      },
      {
        id: "id_10",
        name: "Odyssey",
        transmission: "Automatic",
        fuelType: "Diesel",
        seatNumbers: 7,
        condition: "Used",
        price: 30000,
        rentPrice: 180,
      },
    ],
  },
  {
    brand: "Ford",
    models: [
      {
        id: "id_11",
        name: "F-150",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 6,
        condition: "New",
        price: 40000,
        rentPrice: 220,
      },
      {
        id: "id_12",
        name: "Mustang",
        transmission: "Manual",
        fuelType: "Petrol",
        seatNumbers: 4,
        condition: "Used",
        price: 30000,
        rentPrice: 170,
      },
      {
        id: "id_13",
        name: "Explorer",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "Used",
        price: 35000,
        rentPrice: 190,
      },
      {
        id: "id_14",
        name: "Escape",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 25000,
        rentPrice: 150,
      },
      {
        id: "id_15",
        name: "Focus",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 20000,
        rentPrice: 120,
      },
    ],
  },
  {
    brand: "Chevrolet",
    models: [
      {
        id: "id_16",
        name: "Silverado",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 40000,
        rentPrice: 220,
      },
      {
        id: "id_17",
        name: "Camaro",
        transmission: "Manual",
        fuelType: "Petrol",
        seatNumbers: 4,
        condition: "Used",
        price: 35000,
        rentPrice: 190,
      },
      {
        id: "id_18",
        name: "Equinox",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 30000,
        rentPrice: 180,
      },
      {
        id: "id_19",
        name: "Traverse",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "New",
        price: 45000,
        rentPrice: 250,
      },
      {
        id: "id_20",
        name: "Malibu",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 25000,
        rentPrice: 150,
      },
    ],
  },
  {
    brand: "Volkswagen",
    models: [
      {
        id: "id_21",
        name: "Golf",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 22000,
        rentPrice: 130,
      },
      {
        id: "id_22",
        name: "Passat",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 20000,
        rentPrice: 120,
      },
      {
        id: "id_23",
        name: "Tiguan",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 25000,
        rentPrice: 150,
      },
      {
        id: "id_24",
        name: "Jetta",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 23000,
        rentPrice: 140,
      },
      {
        id: "id_25",
        name: "Atlas",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "Used",
        price: 35000,
        rentPrice: 200,
      },
    ],
  },
  {
    brand: "BMW",
    models: [
      {
        id: "id_26",
        name: "3 Series",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 40000,
        rentPrice: 220,
      },
      {
        id: "id_27",
        name: "5 Series",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 50000,
        rentPrice: 280,
      },
      {
        id: "id_28",
        name: "X3",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 45000,
        rentPrice: 250,
      },
      {
        id: "id_29",
        name: "X5",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "New",
        price: 60000,
        rentPrice: 350,
      },
      {
        id: "id_30",
        name: "i8",
        transmission: "Automatic",
        fuelType: "Electric",
        seatNumbers: 2,
        condition: "Used",
        price: 100000,
        rentPrice: 500,
      },
    ],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      {
        id: "id_31",
        name: "C-Class",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 45000,
        rentPrice: 250,
      },
      {
        id: "id_32",
        name: "E-Class",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 55000,
        rentPrice: 320,
      },
      {
        id: "id_33",
        name: "GLC",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 50000,
        rentPrice: 280,
      },
      {
        id: "id_34",
        name: "GLE",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "New",
        price: 65000,
        rentPrice: 380,
      },
      {
        id: "id_35",
        name: "S-Class",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 80000,
        rentPrice: 450,
      },
    ],
  },
  {
    brand: "Audi",
    models: [
      {
        id: "id_36",
        name: "A4",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 40000,
        rentPrice: 220,
      },
      {
        id: "id_37",
        name: "A6",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 50000,
        rentPrice: 280,
      },
      {
        id: "id_38",
        name: "Q5",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 45000,
        rentPrice: 250,
      },
      {
        id: "id_39",
        name: "Q7",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "New",
        price: 60000,
        rentPrice: 350,
      },
      {
        id: "id_40",
        name: "TT",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "Used",
        price: 50000,
        rentPrice: 280,
      },
    ],
  },
  {
    brand: "Lexus",
    models: [
      {
        id: "id_41",
        name: "ES",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 45000,
        rentPrice: 250,
      },
      {
        id: "id_42",
        name: "RX",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 55000,
        rentPrice: 320,
      },
      {
        id: "id_43",
        name: "NX",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 50000,
        rentPrice: 280,
      },
      {
        id: "id_44",
        name: "LS",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 65000,
        rentPrice: 380,
      },
      {
        id: "id_45",
        name: "GX",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "Used",
        price: 80000,
        rentPrice: 450,
      },
    ],
  },
  {
    brand: "Nissan",
    models: [
      {
        id: "id_46",
        name: "Altima",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 22000,
        rentPrice: 130,
      },
      {
        id: "id_47",
        name: "Maxima",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 25000,
        rentPrice: 150,
      },
      {
        id: "id_48",
        name: "Rogue",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 30000,
        rentPrice: 180,
      },
      {
        id: "id_49",
        name: "Pathfinder",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "New",
        price: 35000,
        rentPrice: 200,
      },
      {
        id: "id_50",
        name: "Frontier",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 28000,
        rentPrice: 160,
      },
    ],
  },
  {
    brand: "Mazda",
    models: [
      {
        id: "id_51",
        name: "Mazda3",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 23000,
        rentPrice: 140,
      },
      {
        id: "id_52",
        name: "Mazda6",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 26000,
        rentPrice: 160,
      },
      {
        id: "id_53",
        name: "CX-5",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 30000,
        rentPrice: 180,
      },
      {
        id: "id_54",
        name: "CX-9",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "New",
        price: 40000,
        rentPrice: 240,
      },
      {
        id: "id_55",
        name: "MX-5",
        transmission: "Manual",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "Used",
        price: 35000,
        rentPrice: 200,
      },
    ],
  },
  {
    brand: "Hyundai",
    models: [
      {
        id: "id_56",
        name: "Elantra",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 22000,
        rentPrice: 130,
      },
      {
        id: "id_57",
        name: "Sonata",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 25000,
        rentPrice: 150,
      },
      {
        id: "id_58",
        name: "Tucson",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 28000,
        rentPrice: 160,
      },
      {
        id: "id_59",
        name: "Santa Fe",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "New",
        price: 38000,
        rentPrice: 220,
      },
      {
        id: "id_60",
        name: "Kona",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 26000,
        rentPrice: 160,
      },
    ],
  },
  {
    brand: "Kia",
    models: [
      {
        id: "id_61",
        name: "Optima",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 23000,
        rentPrice: 140,
      },
      {
        id: "id_62",
        name: "Sorento",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "Used",
        price: 35000,
        rentPrice: 200,
      },
      {
        id: "id_63",
        name: "Sportage",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 28000,
        rentPrice: 160,
      },
      {
        id: "id_64",
        name: "Telluride",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 8,
        condition: "New",
        price: 40000,
        rentPrice: 240,
      },
      {
        id: "id_65",
        name: "Forte",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 22000,
        rentPrice: 130,
      },
    ],
  },
  {
    brand: "Subaru",
    models: [
      {
        id: "id_66",
        name: "Impreza",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 24000,
        rentPrice: 150,
      },
      {
        id: "id_67",
        name: "Outback",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 30000,
        rentPrice: 180,
      },
      {
        id: "id_68",
        name: "Forester",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 28000,
        rentPrice: 160,
      },
      {
        id: "id_69",
        name: "Legacy",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 32000,
        rentPrice: 200,
      },
      {
        id: "id_70",
        name: "Crosstrek",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 26000,
        rentPrice: 160,
      },
    ],
  },
  {
    brand: "Jeep",
    models: [
      {
        id: "id_71",
        name: "Wrangler",
        transmission: "Manual",
        fuelType: "Petrol",
        seatNumbers: 4,
        condition: "New",
        price: 35000,
        rentPrice: 220,
      },
      {
        id: "id_72",
        name: "Cherokee",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 30000,
        rentPrice: 180,
      },
      {
        id: "id_73",
        name: "Grand Cherokee",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 38000,
        rentPrice: 240,
      },
      {
        id: "id_74",
        name: "Renegade",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 25000,
        rentPrice: 150,
      },
      {
        id: "id_75",
        name: "Compass",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 27000,
        rentPrice: 170,
      },
    ],
  },
  {
    brand: "Volvo",
    models: [
      {
        id: "id_76",
        name: "S60",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 38000,
        rentPrice: 240,
      },
      {
        id: "id_77",
        name: "S90",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 45000,
        rentPrice: 280,
      },
      {
        id: "id_78",
        name: "XC40",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 40000,
        rentPrice: 250,
      },
      {
        id: "id_79",
        name: "XC60",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 48000,
        rentPrice: 300,
      },
      {
        id: "id_80",
        name: "XC90",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 7,
        condition: "Used",
        price: 52000,
        rentPrice: 320,
      },
    ],
  },
  {
    brand: "Porsche",
    models: [
      {
        id: "id_81",
        name: "911",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 4,
        condition: "New",
        price: 100000,
        rentPrice: 500,
      },
      {
        id: "id_82",
        name: "Cayenne",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 90000,
        rentPrice: 450,
      },
      {
        id: "id_83",
        name: "Macan",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "Used",
        price: 80000,
        rentPrice: 400,
      },
      {
        id: "id_84",
        name: "Panamera",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 4,
        condition: "New",
        price: 110000,
        rentPrice: 550,
      },
      {
        id: "id_85",
        name: "Boxster",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "Used",
        price: 95000,
        rentPrice: 475,
      },
    ],
  },
  {
    brand: "Tesla",
    models: [
      {
        id: "id_86",
        name: "Model 3",
        transmission: "Automatic",
        fuelType: "Electric",
        seatNumbers: 5,
        condition: "New",
        price: 50000,
        rentPrice: 300,
      },
      {
        id: "id_87",
        name: "Model S",
        transmission: "Automatic",
        fuelType: "Electric",
        seatNumbers: 5,
        condition: "Used",
        price: 80000,
        rentPrice: 500,
      },
      {
        id: "id_88",
        name: "Model X",
        transmission: "Automatic",
        fuelType: "Electric",
        seatNumbers: 7,
        condition: "Used",
        price: 90000,
        rentPrice: 550,
      },
      {
        id: "id_89",
        name: "Model Y",
        transmission: "Automatic",
        fuelType: "Electric",
        seatNumbers: 5,
        condition: "New",
        price: 60000,
        rentPrice: 350,
      },
      {
        id: "id_90",
        name: "Cybertruck",
        transmission: "Automatic",
        fuelType: "Electric",
        seatNumbers: 6,
        condition: "New",
        price: 70000,
        rentPrice: 400,
      },
    ],
  },
  {
    brand: "Ferrari",
    models: [
      {
        id: "id_91",
        name: "458 Italia",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "Used",
        price: 250000,
        rentPrice: 1500,
      },
      {
        id: "id_92",
        name: "F8 Tributo",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "New",
        price: 300000,
        rentPrice: 1800,
      },
      {
        id: "id_93",
        name: "812 Superfast",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "New",
        price: 350000,
        rentPrice: 2000,
      },
      {
        id: "id_94",
        name: "Portofino",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "Used",
        price: 280000,
        rentPrice: 1600,
      },
      {
        id: "id_95",
        name: "SF90 Stradale",
        transmission: "Automatic",
        fuelType: "Hybrid",
        seatNumbers: 2,
        condition: "New",
        price: 500000,
        rentPrice: 3000,
      },
    ],
  },
  {
    brand: "Lamborghini",
    models: [
      {
        id: "id_96",
        name: "Huracan",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "New",
        price: 300000,
        rentPrice: 1800,
      },
      {
        id: "id_97",
        name: "Aventador",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "Used",
        price: 400000,
        rentPrice: 2400,
      },
      {
        id: "id_98",
        name: "Urus",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 5,
        condition: "New",
        price: 350000,
        rentPrice: 2000,
      },
      {
        id: "id_99",
        name: "Sian",
        transmission: "Automatic",
        fuelType: "Hybrid",
        seatNumbers: 2,
        condition: "New",
        price: 3000000,
        rentPrice: 15000,
      },
      {
        id: "id_100",
        name: "Veneno",
        transmission: "Automatic",
        fuelType: "Petrol",
        seatNumbers: 2,
        condition: "Used",
        price: 5000000,
        rentPrice: 25000,
      },
    ],
  },
];

export default CarSpecifications;
