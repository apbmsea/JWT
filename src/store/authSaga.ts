import {call, put, takeLatest} from "redux-saga/effects";
import {AuthService} from "../services/AuthService.ts";
import {
    confirmCodeRequest,
    confirmCodeSuccess,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    registrationRequest,
    registrationSuccess,
    checkAuthRequest
} from "./authSlice.ts";
import {PayloadAction} from "@reduxjs/toolkit";
import {AuthResponse} from "../models/response/AuthResponse.ts";
import {API_URL} from "../http";
import axios from "axios";

function* authLogin(action: PayloadAction<{ email: string; password: string }>): Generator {
    try {
        const response = yield call(AuthService.login, action.payload);
        localStorage.setItem('accessToken', response.data.accessToken);
        yield put(loginSuccess(response.data.user));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

function* authRegistration(action: PayloadAction<{ name: string; email: string; password: string }>): Generator {
    try {
        yield call(AuthService.registration, action.payload);
        yield put(registrationSuccess({email: action.payload.email}));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

function* authConfirmCode(action: ReturnType<typeof confirmCodeRequest>): Generator {
    try {
        const response = yield call(AuthService.confirmCode, action.payload.email, action.payload.code);
        localStorage.setItem("accessToken", response.data.accessToken);
        yield put(confirmCodeSuccess(response.data.user));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

function* checkAuth(): Generator {
    try {
        const response = yield axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
        console.log(response)
        localStorage.setItem("accessToken", response.data.accessToken);
        yield put(loginSuccess(response.data.user));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

function* authLogout(): Generator {
    try {
        yield call(AuthService.logout);
        localStorage.removeItem('accessToken');
        yield put(logoutSuccess());
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}

export function* watchAuthSaga() {
    yield takeLatest(loginRequest.type, authLogin);
    yield takeLatest(registrationRequest.type, authRegistration);
    yield takeLatest(confirmCodeRequest.type, authConfirmCode);
    yield takeLatest(logoutRequest.type, authLogout);
    yield takeLatest(checkAuthRequest.type, checkAuth);
}