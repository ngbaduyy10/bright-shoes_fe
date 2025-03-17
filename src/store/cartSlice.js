import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCart, addToCart, updateCartItem, deleteCartItem, clearCart} from '@/services/cart.service.js';

export const getCartSlice = createAsyncThunk(
    "cart/getCart",
    async (id) => {
        return await getCart(id);
    }
);

export const addToCartSlice = createAsyncThunk(
    "cart/addToCart",
    async (data) => {
        return await addToCart(data);
    }
);

export const updateCartItemSlice = createAsyncThunk(
    "cart/updateCartItem",
    async (data) => {
        return await updateCartItem(data);
    }
);

export const deleteCartItemSlice = createAsyncThunk(
    "cart/deleteCartItem",
    async (data) => {
        return await deleteCartItem(data);
    }
);

export const clearCartSlice = createAsyncThunk(
    "cart/clearCart",
    async (id) => {
        return await clearCart(id);
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: '',
        cartItems: [],
        totalPrice: 0,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartSlice.fulfilled, (state, action) => {
                state.cartId = action.payload.cartId;
                state.cartItems = action.payload.cartItems;
                state.totalPrice = action.payload.totalPrice;
                state.loading = false;
            })
            .addCase(getCartSlice.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addToCartSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCartSlice.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartItems;
                state.totalPrice = action.payload.totalPrice;
                state.loading = false;
            })
            .addCase(addToCartSlice.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCartItemSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartItemSlice.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartItems;
                state.totalPrice = action.payload.totalPrice;
                state.loading = false;
            })
            .addCase(updateCartItemSlice.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteCartItemSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCartItemSlice.fulfilled, (state, action) => {
                state.cartItems = action.payload.cartItems;
                state.totalPrice = action.payload.totalPrice;
                state.loading = false;
            })
            .addCase(deleteCartItemSlice.rejected, (state) => {
                state.loading = false;
            })
            .addCase(clearCartSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearCartSlice.fulfilled, (state) => {
                state.cartItems = [];
                state.totalPrice = 0;
                state.loading = false;
            })
            .addCase(clearCartSlice.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default cartSlice.reducer;