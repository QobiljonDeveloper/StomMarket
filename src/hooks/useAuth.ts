import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import { toast } from 'sonner';
import { useAuthContext, User } from '../context/AuthContext';

interface AuthResponse {
    token: string;
    user: User;
}

export const useAuth = () => {
    const { setToken, setUser } = useAuthContext();

    return useMutation({
        mutationFn: async (initData: string): Promise<AuthResponse> => {
            const response = await api.post('/auth/telegram', { initData });
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Auth Success:", data);
            setToken(data.token);
            setUser(data.user);
            toast.success("Tizimga muvaffaqiyatli kirildi! ✅");
        },
        onError: (error: any) => {
            console.error("API Error:", error);
            // Ignore 404s if it's expected during dev, else show error
            toast.error("Avtorizatsiyada xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        }
    });
};
