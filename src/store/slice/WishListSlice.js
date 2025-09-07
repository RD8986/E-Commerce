import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        userid: 1,
        wishlistItems: []
    },
    reducers: {
        addItemToWishlist: (state, action) => {
            const payload = action.payload;
            const newItem = {
                id: uuid(),
                productID: payload.id,
                title: payload.title,
                thumbnail: payload.thumbnail,
                price: payload.price
            };
            state.wishlistItems = [...state.wishlistItems, newItem];
        },

        RemoveItemFromWishlist: (state, action) => {
            const wishlistId = action.payload;
            state.wishlistItems = state.wishlistItems.filter(
                (item) => item.id !== wishlistId
            );
        }
    }
});

export const { addItemToWishlist, RemoveItemFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
