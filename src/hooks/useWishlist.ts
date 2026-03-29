import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product, WishlistItem } from '../types';
import { toast } from 'sonner';

export const useWishlist = (userId: string | undefined | null) => {
    const queryClient = useQueryClient();
    const safeUserId = userId ? String(userId) : null;

    // Fetch wishlist — returns WishlistItem[] from backend
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', safeUserId],
        queryFn: async (): Promise<WishlistItem[]> => {
            if (!safeUserId) return [];
            try {
                const { data } = await api.get(`wishlist/${safeUserId}`);
                return data;
            } catch (error) {
                console.error("Wishlist error:", error);
                throw error;
            }
        },
        enabled: !!safeUserId,
    });

    // Check if a product is saved — match on productId
    const isSaved = (productId: string) =>
        wishlist.some((item: WishlistItem) => item.productId === productId);

    // Toggle mutation (add/remove from catalog ProductCard)
    const toggleMutation = useMutation({
        mutationFn: async ({ productId, isCurrentlySaved }: { productId: string; isCurrentlySaved: boolean }) => {
            if (!safeUserId || !productId) return;
            const url = `wishlist/${safeUserId}/${productId}`;
            if (isCurrentlySaved) {
                await api.delete(url);
            } else {
                await api.post(url, null);
            }
        },
        onMutate: async ({ productId, isCurrentlySaved }) => {
            await queryClient.cancelQueries({ queryKey: ['wishlist', safeUserId] });
            const previousWishlist = queryClient.getQueryData<WishlistItem[]>(['wishlist', safeUserId]);

            if (previousWishlist) {
                if (isCurrentlySaved) {
                    queryClient.setQueryData<WishlistItem[]>(
                        ['wishlist', safeUserId],
                        previousWishlist.filter(item => item.productId !== productId)
                    );
                }
                // For add, we can't construct a full WishlistItem locally — let onSuccess refetch
            }
            return { previousWishlist };
        },
        onError: (err: any, _variables, context) => {
            if (context?.previousWishlist) {
                queryClient.setQueryData(['wishlist', safeUserId], context.previousWishlist);
            }
            toast.error(err?.message || "Xatolik yuz berdi");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist', safeUserId] });
        },
    });

    // Remove mutation (used from WishlistCard trash button)
    const removeMutation = useMutation({
        mutationFn: async (productId: string) => {
            if (!safeUserId || !productId) return;
            await api.delete(`wishlist/${safeUserId}/${productId}`);
        },
        onMutate: async (productId: string) => {
            await queryClient.cancelQueries({ queryKey: ['wishlist', safeUserId] });
            const previousWishlist = queryClient.getQueryData<WishlistItem[]>(['wishlist', safeUserId]);

            if (previousWishlist) {
                queryClient.setQueryData<WishlistItem[]>(
                    ['wishlist', safeUserId],
                    previousWishlist.filter(item => item.productId !== productId)
                );
            }
            return { previousWishlist };
        },
        onError: (err: any, _variables, context) => {
            if (context?.previousWishlist) {
                queryClient.setQueryData(['wishlist', safeUserId], context.previousWishlist);
            }
            toast.error(err?.message || "Xatolik yuz berdi");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist', safeUserId] });
        },
    });

    return {
        wishlist,
        isLoading,
        isSaved,
        toggleWishlist: (product: Product) => {
            if (!safeUserId) return;
            toggleMutation.mutate({
                productId: product.id,
                isCurrentlySaved: isSaved(product.id),
            });
        },
        removeFromWishlist: (productId: string) => {
            if (!safeUserId) return;
            removeMutation.mutate(productId);
        },
    };
};
