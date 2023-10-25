import { JSX, createSignal } from "solid-js";
import axios from "axios";
import toast, { Toaster } from "solid-toast";

const brandsData = [
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
]

function AddCars() {
  const [carData, setCarData] = createSignal({
    carId: "",
    name: "",
    transmission: "",
    fuelType: "",
    seatNumbers: "",
    condition: "",
    price: "",
    rentPrice: "",
    published: false,
  });

  const handleBrandChange = (event: Event) => {
   const selectedBrandId = (event.target as HTMLSelectElement).value;
   setCarData({ ...carData(), carId: selectedBrandId });
 };

 const validateForm = () => {
   const formData = carData();
   return (
     formData.carId === "" ||
     formData.name === "" ||
     formData.transmission === "" ||
     formData.fuelType === "" ||
     formData.seatNumbers === "" ||
     formData.condition === "" ||
     formData.price === "" ||
     formData.rentPrice === ""
   );
 };

  const handleSubmit = async (e: Event) => {
   e.preventDefault();
   const token = localStorage.getItem("loginAdminToken");
   if (validateForm()) {
      toast.error("Please fill all fields", {
         style: {
           border: "2px solid rgba(255, 255, 255, 0.1)",
           padding: "10px",
           color: "#fff",
           "background-color": "rgba(0, 0, 0, 0.1)",
           "backdrop-filter": "blur(10px)",
           "font-size": '1.1em',
           "min-width": "10em",
         },
         iconTheme: {
           primary: "#000",
           secondary: "#fff",
         },
       });
      return;
    }
   try {
     const response = await axios.post("http://localhost:4000/admin/inventory/addCar",
      carData(),
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
     );
     console.log(response.data);
   } catch (error) {
     console.error("Error adding car:", error);
   }
 };

  return (
   <div class="w-[60%] mx-auto my-[7vw]">
      <form onSubmit={handleSubmit}>
         <h1 class="text-6xl text-center">Add A Car</h1>
         <div>
            <h1>Brand</h1>
            <select
               id="carId"
               value={carData().carId}
               onChange={handleBrandChange}
               class="w-full bg-transparent border rounded-lg px-5 py-2"
            >
               <option class="bg-emerald-950 text-emerald-600" value="">Select a Brand</option>
               {brandsData.map((brand) => (
                  <option value={brand.id} class="bg-emerald-900 text-white">
                     {brand.brand}
                  </option>
               ))}
            </select>
         </div>
         <div class="grid gap-1 mt-[2vw]">
            <h1 class="">Model</h1>
            <input
               type="text"
               id="name"
               value={carData().name}
               onInput={(e) => setCarData({ ...carData(), name: e.target.value })}
               class="text-white bg-transparent border rounded-lg px-5 py-2"
            />
         </div>
         <div class="grid gap-1 mt-[2vw]">
            <h1>Transmission</h1>
            <input
               type="text"
               id="transmission"
               value={carData().transmission}
               onInput={(e) => setCarData({ ...carData(), transmission: e.target.value })}
               class="text-white bg-transparent border rounded-lg px-5 py-2"
             />
         </div>
         <div class="grid gap-1 mt-[2vw]">
            <h1>Fuel Type</h1>
            <input
               type="text"
               id="fuelType"
               value={carData().fuelType}
               onInput={(e) => setCarData({ ...carData(), fuelType: e.target.value })}
               class="text-white bg-transparent border rounded-lg px-5 py-2"
            />
         </div>
         <div class="grid gap-1 mt-[2vw]">
            <h1>Seat Numbers</h1>
            <input
               type="number"
               id="seatNumbers"
               value={carData().seatNumbers}
               onInput={(e) => setCarData({ ...carData(), seatNumbers: e.target.value })}
               class="text-white bg-transparent border rounded-lg px-5 py-2"
             />
         </div>
         <div class="grid gap-1 mt-[2vw]">
            <h1>Condition</h1>
            <input
               type="text"
               id="condition"
               value={carData().condition}
               onInput={(e) => setCarData({ ...carData(), condition: e.target.value })}
               class="text-white bg-transparent border rounded-lg px-5 py-2"
            />
         </div>
         <div class="grid gap-1 mt-[2vw]">
            <h1>Price</h1>
            <input
               type="number"
               id="price"
               value={carData().price}
               onInput={(e) => setCarData({ ...carData(), price: e.target.value })}
               class="text-white bg-transparent border rounded-lg px-5 py-2"
            />
         </div>
         <div class="grid gap-1 mt-[2vw]">
            <h1>Rent Price</h1>
            <input
               type="number"
               id="rentPrice"
               value={carData().rentPrice}
               onInput={(e) => setCarData({ ...carData(), rentPrice: e.target.value })}
               class="text-white bg-transparent border rounded-lg px-5 py-2"
            />
         </div>
         <div class="flex gap-5 mt-[2vw]">
            <input
               type="checkbox"
               id="published"
               checked={carData().published}
               onChange={(e) => setCarData({ ...carData(), published: e.target.checked })}
               class="bg-transparent border px-5 py-2 w-5 h-5 rounded-lg"
             />
            <h1>Published?</h1>
         </div>
         <Toaster
              position="top-center"
          />
         <button type="submit" class="px-5 py-2 bg-emerald-700 w-full rounded-md hover:bg-emerald-800 animation text-lg mt-[2vw]">Add Car</button>
      </form>
   </div>
  );
}

export default AddCars;
