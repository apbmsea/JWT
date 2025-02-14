import axios from "axios";
import {AuthResponse} from "../types/AuthResponse.ts";

export const API_URL = 'http://10.3.34.170:8081/api/v1/auth';

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh-token`, {withCredentials: true});
            localStorage.setItem("accessToken", response.data.accessToken);
            return $api.request(originalRequest);
        } catch (error) {
            console.error('ошибка на интерцепторе 401');
            console.error(error);
        }
    }
    throw error;
})

export default $api;