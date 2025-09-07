import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/CartSlice";
import wishlistSlice from "./slice/WishListSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice
    }
});
