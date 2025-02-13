import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse.ts";

export const AuthService = {
    login: async (user: { email: string, password: string }): Promise<AxiosResponse<AuthResponse>> => {
        return await $api.post<AuthResponse>('/login', user);
    },
    registration: async (user: { name: string; email: string, password: string }): Promise<AxiosResponse<AuthResponse>> => {
        return await $api.post<AuthResponse>('/register', user);
    },
    confirmCode: async (email: string, code: string): Promise<AxiosResponse<AuthResponse>> => {
        return await $api.post<AuthResponse>(`/auth/confirm`, { email, code });
    },
    logout: async (): Promise<void> => {
        return await $api.post('/auth/logout');
    }
};
