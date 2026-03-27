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
            const response = await api.post('/users/create-or-update', payload);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Auth Success:", data);
            toast.success("Tizimga muvaffaqiyatli kirildi! ✅");
        },
        onError: (error: any) => {
            console.error("API Error:", error);
            toast.error(`Xatolik yuz berdi: ${error?.message || "Noma'lum xatolik"} ❌`);
        }
    });
};
