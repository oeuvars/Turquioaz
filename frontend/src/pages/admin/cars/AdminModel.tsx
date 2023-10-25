import { createEffect, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import image from "../../../assets/images/cars/Model.jpg";
import axios from "axios";
import toast, { Toaster } from "solid-toast";
import AdminNavbar from "../components/AdminNavbar";
import { HiSolidPencil } from 'solid-icons/hi'

const AdminModel = () => {
  const [model, setModel] = createSignal<any>([])
  const { id } = useParams<{ id: string }>();

  createEffect(async () => {
    const token = localStorage.getItem("loginToken");
    const res = await axios.get(
      `http://localhost:4000/admin/inventory/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setModel(res.data.car);
  })

  return (
    <>
      <AdminNavbar />
      <div class="m-auto tablet:grid tablet:grid-cols-2 gap-[1vw] rounded-lg">
        <img
          src={image}
          class="object-cover max-h-screen my-auto"
        />
        <div class="flex flex-col gap-[1.2vw] font-mabry-light my-auto justify-center m-[2vw]">
          <div>
            <h1 class="font-loubag text-lg ml-1">Model</h1>
            <p class="font-loubag text-lg text-white bg-white/5 px-5 py-2 rounded-md border border-white/20">{model().name}</p>
          </div>
          <div>
            <h1 class="font-loubag text-lg ml-1">Price</h1>
            <p class="font-loubag text-lg text-white bg-white/5 px-5 py-2 rounded-md border border-white/20">
             ${model().price}
            </p>
          </div>
          <div>
            <h1 class="font-loubag text-lg ml-1">Fuel Type</h1>
            <p class="phone:text-base lg:text-xlfont-loubag text-lg text-white bg-white/5 px-5 py-2 rounded-md border border-white/20">
              {model().fuelType}
            </p>
          </div>
          <div>
            <h1 class="font-loubag text-lg ml-1">Seat Numbers</h1>
            <p class="phone:text-base lg:text-xlfont-loubag text-lg text-white bg-white/5 px-5 py-2 rounded-md border border-white/20">
              {model().seatNumbers}
            </p>
          </div>
          <div>
            <h1 class="font-loubag text-lg ml-1">Transmission</h1>
            <p class="phone:text-base lg:text-xlfont-loubag text-lg text-white bg-white/5 px-5 py-2 rounded-md border border-white/20">
              {model().transmission}
            </p>
          </div>
          <div class="flex flex-col">
            <h1 class="font-loubag text-lg ml-1">Rent Price</h1>
            <p class="phone:text-base lg:text-xlfont-loubag text-lg text-white bg-white/5 px-5 py-2 rounded-md border border-white/20">
              <span class="font-mabry-light"></span>$
              {model().rentPrice}/day
            </p>
            <Toaster position="bottom-center" gutter={16} />
          </div>
          <A href={`/admin/inventory/update-cars/${id}`} class="flex gap-1 bg-emerald-800/50 hover:bg-emerald-800/60 animation px-5 py-2 my-[1vw] rounded-md mx-auto">
            <p class="text-lg">Update</p>
          </A>
        </div>
      </div>
    </>
  );
};

export default AdminModel;
