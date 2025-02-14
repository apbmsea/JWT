import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../shared/types/IUser.ts";

interface AuthState {
    user: IUser | null;
    isAuth: boolean;
    email: string | null;
    isRegistered: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuth: false,
    email: null,
    isRegistered: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loginRequest: (_state, _action: PayloadAction<{ email: string; password: string }>) => {
        },
        loginSuccess: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        registrationRequest: (state, _action: PayloadAction<{ name: string; email: string; password: string }>) => {
            state.isRegistered = false;
        },
        registrationSuccess: (state, action: PayloadAction<{ email: string }>) => {
            state.email = action.payload.email;
            state.isRegistered = true;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        confirmCodeRequest: (_state, _action: PayloadAction<{ email: string; code: string }>) => {
        },
        confirmCodeSuccess: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isRegistered = false;
            state.email = null;
        },
        logoutRequest: (state) => {
            state.isAuth = false;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuth = false;
            state.email = null;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        checkAuthRequest: (_state) => {
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    registrationSuccess,
    registrationRequest,
    logoutRequest,
    logoutSuccess,
    confirmCodeSuccess,
    confirmCodeRequest,
    checkAuthRequest
} = authSlice.actions;
export default authSlice.reducer;