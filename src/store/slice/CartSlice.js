import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const maxQty = 10;

let initialState = {
    items: [],
    cartItems: [],
    totalQuantity: 0,
    totalItems: 0,
    totalPrice: 0,
    taxPercent: 18,
    taxAmount: 0,
    shippingCost: 100,
    discountAmount: 0,
    discountCoupon: null,
    totalPayable: 0,
    coupons: [
        { code: 'DISC5', percent: 5 },
        { code: 'DISC10', percent: 10 },
        { code: 'DISC15', percent: 15 },
        { code: 'DISC20', percent: 20 }
    ]
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.cartItems.find(
                i => i.productID === product.id || i.productID === product.productID
            );

            if (existing) {
                if (existing.quantity < maxQty) {
                    existing.quantity += 1;
                }
            } else {
                state.cartItems.push({
                    id: uuid(),
                    productID: product.id || product.productID,
                    title: product.title,
                    thumbnail: product.thumbnail,
                    price: product.price,
                    quantity: 1
                });
            }
            updateCartSummary(state);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
            updateCartSummary(state);
        },

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item && item.quantity < maxQty) item.quantity += 1;
            updateCartSummary(state);
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) item.quantity -= 1;
                else state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
            }
            updateCartSummary(state);
        },

        applyCoupon: (state, action) => {
            const code = action.payload;
            const coupon = state.coupons.find(c => c.code === code.toUpperCase());
            if (coupon) {
                state.discountCoupon = coupon.code;
                state.discountAmount = ((state.totalPrice * coupon.percent) / 100);
            } else {
                state.discountCoupon = null;
                state.discountAmount = 0;
            }
            updateCartSummary(state);
        },

        removeCoupon: (state) => {
            state.discountCoupon = null;
            state.discountAmount = 0;
            updateCartSummary(state);
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.discountCoupon = null;
            state.discountAmount = 0;
            updateCartSummary(state);
        }
    }
});

function updateCartSummary(state) {
    state.totalQuantity = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    state.totalItems = state.cartItems.length;
    state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    state.taxAmount = (state.totalPrice * state.taxPercent) / 100;

    if (state.totalItems === 0) {
        state.discountCoupon = null;
        state.discountAmount = 0;
    } else if (state.discountCoupon) {
        const coupon = state.coupons.find(c => c.code === state.discountCoupon);
        if (coupon) {
            state.discountAmount = (state.totalPrice * coupon.percent) / 100;
        }
    }

    state.totalPayable = state.totalPrice + state.taxAmount + state.shippingCost - state.discountAmount;
}

export const { 
    addToCart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    applyCoupon, 
    removeCoupon, 
    clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
