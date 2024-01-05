// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        cart: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            const productId = action.payload;
            const product = state.items.find((item) => item.id === productId);

            if (product) {
                const existingItem = state.cart.find((item) => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.cart.push({ ...product, quantity: 1 });
                }
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter((item) => item.id !== productId);
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const product = state.cart.find((item) => item.id === productId);

            if (product) {
                product.quantity = quantity;
            }
        },
    },
});

export const {
    setProducts,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
} = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectCart = (state) => state.products.cart;

export default productsSlice.reducer;
