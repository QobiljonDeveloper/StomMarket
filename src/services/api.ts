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
