import axios from 'axios';



export const api = axios.create({
    baseURL: 'https://ortadant-markert-api.kubesec.uz/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach JWT Token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor for advanced Network/CORS Debugging
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Quietly pass 404 avatar requests without polluting the console
        if (error.response?.status === 404 && error.config?.url?.includes('/avatar')) {
            return Promise.reject(error);
        }

        console.error("DEBUG - URL:", error.config?.url);
        console.error("DEBUG - Method:", error.config?.method);
        console.error("DEBUG - Status:", error.response?.status);
        console.error("DEBUG - Is CORS?", error.message?.includes('Network Error') && !error.response);

        return Promise.reject(error);
    }
);

// Fetch user profile image via Telegram ID as a Blob
export const getUserAvatar = async (telegramId: number) => {
    return await api.get(`/users/telegram/${telegramId}/avatar`, {
        responseType: 'blob'
    });
};
