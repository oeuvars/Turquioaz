import { createEffect, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import image from "../../../assets/images/cars/Model.jpg";
import axios from "axios";
import toast, { Toaster } from "solid-toast";
import AdminNavbar from "../components/AdminNavbar";

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
      <div class="m-auto tablet:flex gap-[5vw] rounded-lg">
        <img
          src={image}
          class="object-cover max-h-screen my-auto"
        />
        <div class="flex flex-col gap-[1.5vw] font-mabry-light text-white my-auto justify-center">
          <p class="font-loubag phone:text-3xl lg:text-7xl">Model: {model().name}</p>
          <p class="phone:text-2xl lg:text-4xl">
            Price: &nbsp;<span class="font-mabry">${model().price}</span>
          </p>
          <p class="phone:text-base lg:text-xl">
            {model().fuelType} &nbsp; | &nbsp; {model().seatNumbers}
            &nbsp; Seater &nbsp; | &nbsp; {model().transmission}
          </p>
          <div class="flex flex-col gap-[1vw]">
            <p class="font-mabry text-3xl">
              <span class="font-mabry-light"></span>$
              {model().rentPrice}/day
            </p>
            <Toaster position="bottom-center" gutter={16} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModel;
