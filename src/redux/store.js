import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAdminAuth = {
    auth: JSON.parse(localStorage.getItem("mm_cse_admin")) || false,
    admin: JSON.parse(localStorage.getItem("mm_cse_admin")) || null
}

const adminSlice = createSlice({
    name: "adminAuth",
    initialState: initialAdminAuth,
    reducers: {
        login(state, actions){
            state.auth = true;
            state.admin = actions.payload.admin
            localStorage.setItem('mm_cse_admin', JSON.stringify(actions.payload.admin));
        },
        logout(state, actions){
            state.auth = false;
            state.admin = null;
            localStorage.removeItem('mm_cse_admin');
        }
    }
})

export const adminAuthActions = adminSlice.actions;

const store = configureStore({
    reducer: {
        adminAuth: adminSlice.reducer
    }
})

export default store;