import {authSlice}  from "./index"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})