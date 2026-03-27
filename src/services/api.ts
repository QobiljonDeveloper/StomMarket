import axios from 'axios';

// Function to dynamically get initData to ensure it's always fresh
const getInitData = () => {
    return window.Telegram?.WebApp?.initData || '';
};

export const api = axios.create({
    baseURL: 'https://ortadant-markert-api.kubesec.uz/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach Telegram Auth automatically
api.interceptors.request.use((config) => {
    const initData = getInitData();
    if (initData) {
        config.headers.Authorization = `tma ${initData}`;
    }
    return config;
});

// Response Interceptor for advanced Network/CORS Debugging
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("DEBUG - URL:", error.config?.url);
        console.error("DEBUG - Method:", error.config?.method);
        console.error("DEBUG - Status:", error.response?.status);
        console.error("DEBUG - Is CORS?", error.message?.includes('Network Error') && !error.response);

        return Promise.reject(error);
    }
);
