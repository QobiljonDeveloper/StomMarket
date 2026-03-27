import { useQuery } from '@tanstack/react-query';
import { getUserAvatar } from '../services/api';

export const useUserAvatar = (telegramId?: number) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['userAvatar', telegramId],
        queryFn: async () => {
            if (!telegramId) return null;
            try {
                const response = await getUserAvatar(telegramId);
                return URL.createObjectURL(response.data);
            } catch (error: any) {
                if (error.response?.status === 404) {
                    console.info("User has no telegram avatar, using fallback.");
                    return null;
                }
                throw error;
            }
        },
        enabled: !!telegramId,
        retry: false,
        refetchOnWindowFocus: false,
        // Store image URL without refetching constantly to preserve browser memory
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24, // Keep in garbage collection for 24 properties
    });

    return { avatarUrl: data, isLoading, isError };
};
