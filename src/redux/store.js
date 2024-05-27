import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAdminAuth = {
    auth: JSON.parse(localStorage.getItem("mm_cse_admin")) || false,
    admin: JSON.parse(localStorage.getItem("mm_cse_admin")) || null
}

const initialMentorAuth = {
    auth: JSON.parse(localStorage.getItem("mm_cse_mentor")) || false,
    mentor: JSON.parse(localStorage.getItem("mm_cse_mentor")) || null
}

const initialStudentAuth = {
    auth: JSON.parse(localStorage.getItem("mm_cse_student")) || false,
    student: JSON.parse(localStorage.getItem("mm_cse_student")) || null
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

const mentorSlice = createSlice({
    name: "mentorSlice",
    initialState: initialMentorAuth,
    reducers: {
        login(state, actions){
            state.auth = true;
            state.mentor = actions.payload.mentor;
            localStorage.setItem('mm_cse_mentor', JSON.stringify(actions.payload.mentor));
        },
        logout(state, actions){
            state.auth = false;
            state.mentor = null;
            localStorage.removeItem('mm_cse_mentor');
        }
    }
})

export const adminAuthActions = adminSlice.actions;
export const mentorAuthActions = mentorSlice.actions;

const store = configureStore({
    reducer: {
        adminAuth: adminSlice.reducer,
        mentorAuth: mentorSlice.reducer
    }
})

export default store;