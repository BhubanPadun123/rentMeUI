import axios from "axios";
import { getLocalData } from "./localStorage";

const apiService = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
apiService.interceptors.request.use(
    async (config) => {
        const token = await getLocalData("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized, redirecting to login...");
            // Optional: trigger logout or refresh logic here
        }
        return Promise.reject(error);
    }
);

// Handle all kinds of requests (GET, POST, PUT, DELETE, etc.)
const handleRequest = async (method: string, url: string, data?: any, params?: any) => {
    try {
        const response = await apiService({
            method,
            url,
            data,
            params,
        });
        return { response: response.data, error: null }; // Return response if successful
    } catch (err: any) {
        const errorData = err?.response?.data || err.message || "Something went wrong";
        return { response: null, error: errorData }; // Return error if failed
    }
};

export default handleRequest;
