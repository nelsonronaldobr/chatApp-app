import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const chatApi = axios.create({
    baseURL: VITE_API_URL
});

chatApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const headers: AxiosRequestHeaders = Object.assign({}, config.headers, {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem('tokenSession')}`
        });
        config.headers = headers;
        return config;
    }
);
