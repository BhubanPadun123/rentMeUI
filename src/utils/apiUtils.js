// apiClient.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from './utils';

const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Add token to headers (optional)
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Reusable API function
export async function apiRequest(method, url, data = {}, config = {}) {
    try {
        const response = await api({
            method,
            url,
            data,
            ...config,
        });

        return {response };
    } catch (error) {
        const errData = error?.response?.data || { message: 'Something went wrong' };
        // console.error(`[API ERROR] ${method.toUpperCase()} ${url}`, errData);
        return { error: errData };
    }
}
