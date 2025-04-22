import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authChecking} from "@/services/auth.service.js";

export const authCheck = createAsyncThunk(
    "authCheck",
    async () => {
        return await authChecking();
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authCheck.pending, (state) => {
                state.loading = true;
            })
            .addCase(authCheck.fulfilled, (state, action) => {
                state.isAuth = action.payload.success;
                state.user = action.payload?.user;
                state.loading = false;
            })
            .addCase(authCheck.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default authSlice.reducer;