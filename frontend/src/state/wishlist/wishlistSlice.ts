import { createSlice } from "@reduxjs/toolkit";

interface wishlistState {
   isWishlisted: boolean;
}

const initialState: wishlistState = {
   isWishlisted: false,
}

const wishlistSlice = createSlice({
   name: "wishlist",
   initialState,
   reducers: {
      isLiked: (state) => {
         state.isWishlisted = true
      },
      isNotLiked: (state) => {
         state.isWishlisted = false
         console.log("toggled")
      },
   }
})
export const { isLiked, isNotLiked } = wishlistSlice.actions;

export default wishlistSlice.reducer;
