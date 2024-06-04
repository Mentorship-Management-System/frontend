import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAdminAuth = {
    auth: JSON.parse(localStorage.getItem("mm_cse_admin")) ? true : false,
    admin: JSON.parse(localStorage.getItem("mm_cse_admin")) || null
}

const initialMentorAuth = {
    auth: JSON.parse(localStorage.getItem("mm_cse_mentor")) ? true : false,
    mentor: JSON.parse(localStorage.getItem("mm_cse_mentor")) || null
}

const initialStudentAuth = {
    auth: JSON.parse(localStorage.getItem("mm_cse_student")) ? true : false,
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
        },
        update(state, actions){
            state.admin.user = actions.payload.user;
            localStorage.setItem('mm_cse_admin', JSON.stringify(state.admin));
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
        },
        update(state, actions){
            state.mentor.user = actions.payload.user;
            localStorage.setItem('mm_cse_mentor', JSON.stringify(state.mentor));
        }
    }
})

const studentSlice = createSlice({
    name: "studentSlice",
    initialState: initialStudentAuth,
    reducers: {
        login(state, actions){
            state.auth = true;
            state.student = actions.payload.student;
            localStorage.setItem('mm_cse_student', JSON.stringify(actions.payload.student));
        },
        logout(state, actions){
            state.auth = false;
            state.student = null;
            localStorage.removeItem('mm_cse_student');
        },
        update(state, actions){
            state.student.user = actions.payload.user;
            localStorage.setItem('mm_cse_student', JSON.stringify(state.student));
        }
    }
})

export const adminAuthActions = adminSlice.actions;
export const mentorAuthActions = mentorSlice.actions;
export const studentAuthActions = studentSlice.actions;

const store = configureStore({
    reducer: {
        adminAuth: adminSlice.reducer,
        mentorAuth: mentorSlice.reducer,
        studentAuth: studentSlice.reducer
    }
})

export default store;