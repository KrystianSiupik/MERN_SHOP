import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    name: Cookies.get('name') || "",
    token:  Cookies.get('token') || null,
    cart: getCartFromCookies(),
    mode: Cookies.get('mode') || 'light'
}

function getCartFromCookies() {
    const cartValue = Cookies.get('cart');
    try {
        return JSON.parse(cartValue) || [];
    } catch (error) {
        console.error('Błąd parsowania wartości ciasteczka "cart":', error);
        return [];
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            const newMode = state.mode;
            Cookies.set('mode', newMode);
        },
        setLogin: (state, action) => {
            Cookies.set('name', action.payload.name);
            state.name = action.payload.name;
            state.token = action.payload.token;
            Cookies.set('token', action.payload.token);
        },
        setLogout: (state) => {
            state.name = null;
            state.token = null;
            Cookies.remove('name');
            Cookies.remove('token');
        },
        setCart: (state, action) => {
            state.cart = action.payload.cart;
            Cookies.set('cart', JSON.stringify(action.payload.cart));
        },
        addToCart: (state, action) => {
            const { productId, price  } = action.payload;
            const existingProductIndex = state.cart.findIndex(product => product.id === productId);
            if (existingProductIndex !== -1) {
                state.cart[existingProductIndex].quantity++;
               
            } else {
                state.cart.push({ id: productId, quantity: 1, price });
                
            }
            Cookies.set('cart', JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload;
            const updatedCart = state.cart.filter(product => product.id !== productId);
            state.cart = updatedCart;
            Cookies.set('cart', JSON.stringify(updatedCart));
        },
       
    }
})

export const { setMode, setLogin, setLogout, setCart, addToCart, removeFromCart } = authSlice.actions;
export default authSlice.reducer;