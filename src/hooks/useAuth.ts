import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import { toast } from 'sonner';

interface AuthPayload {
    telegramId: number;
    fullName: string;
    username: string;
    language: number;
}

export const useAuth = () => {
    return useMutation({
        mutationFn: async (payload: AuthPayload) => {
            // 1. Native fetch debugging for CORS diagnostics
            try {
                const fetchRes = await fetch('https://ortadant-markert-api.kubesec.uz/api/users/create-or-update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `tma ${window.Telegram?.WebApp?.initData || ''}`
                    },
                    body: JSON.stringify(payload)
                });
                if (!fetchRes.ok) {
                    console.warn("Native Fetch Warning: Response not OK", fetchRes.status);
                }
            } catch (err: any) {
                console.error("Native Fetch Failed (Likely CORS):", err.message);
                toast.error("CORS Error detected. The backend must allow origin: https://stom-market.vercel.app");
            }

            // 2. Primary Axios Request
            const response = await api.post('/users/create-or-update', payload);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Auth Success:", data);
            toast.success("Tizimga muvaffaqiyatli kirildi! ✅");
        },
        onError: (error: any) => {
            console.error("API Error:", error);
            toast.error("Tarmoq xatosi (ERR_NETWORK). Iltimos, internetni yoki Backend CORS sozlamalarini tekshiring.");
        }
    });
};
