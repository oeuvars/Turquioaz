import { Component, createEffect } from "solid-js";
import { supabase } from "../auth/supabaseClient";
import CarSpecifications from "../collections/CarSpecifications";

interface CarModel {
  id: string;
  name: string;
  transmission: string;
  fuelType: string;
  seatNumbers: number;
  condition: string;
  price: number;
  rentPrice: number;
}

const Wishlist: Component = () => {
  createEffect(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: userIdList } = await supabase.from("wishlist").select("userId");
    const matchingUserId = userIdList!.find((item) => item.userId === user?.id);
    const matchedUserId = matchingUserId?.userId || null;

    const { data: allIdList } = await supabase.from("wishlist").select("*");
    const cardIdsArray = allIdList!.filter((item) => item.userId === matchedUserId).map((item) => item.cardId);

    console.log(cardIdsArray)
  });
  return (
    <div class="font-mauline text-emerald-600 tex-5xl">
      <div class="black">Bokachoda</div>
    </div>
  );
};

export default Wishlist;
