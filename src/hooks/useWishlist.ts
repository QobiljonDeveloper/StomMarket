import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product } from '../types';

interface TogglePayload {
    productId: string;
    product: Product;
    isCurrentlySaved: boolean;
}

export const useWishlist = (userId: string | undefined | null) => {
    const queryClient = useQueryClient();
    // Ensure userId is always a clean string (guards against stale localStorage with numeric ids)
    const safeUserId = userId ? String(userId) : null;

    // Fetch wishlist
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', safeUserId],
        queryFn: async (): Promise<Product[]> => {
            if (!safeUserId) return [];
            console.log("Fetching wishlist for user:", safeUserId);
            const { data } = await api.get(`/wishlist/${safeUserId}`);
            return data;
        },
        enabled: !!safeUserId,
    });

    const isSaved = (productId: string) => wishlist.some((p: Product) => p.id === productId);

    // Toggle Mutation with Optimistic Updates
    const toggleMutation = useMutation({
        mutationFn: async ({ productId, isCurrentlySaved }: TogglePayload) => {
            if (!safeUserId) throw new Error("User not logged in");
            const url = `/wishlist/${safeUserId}/${productId}`;
            const fullUrl = `${api.defaults.baseURL}${url}`;
            console.log("=== WISHLIST DEBUG ===");
            console.log("Method:", isCurrentlySaved ? "DELETE" : "POST");
            console.log("User ID:", safeUserId);
            console.log("Product ID:", productId);
            console.log("Full URL:", fullUrl);
            console.log("Token:", localStorage.getItem('token')?.slice(0, 20) + "...");
            console.log("=====================");
            try {
                if (isCurrentlySaved) {
                    await api.delete(url);
                } else {
                    await api.post(url, null);
                }
            } catch (error: any) {
                console.error("Wishlist mutation failed:");
                console.error("  Status:", error?.response?.status);
                console.error("  Data:", error?.response?.data);
                console.error("  Message:", error?.message);
                throw error;
            }
        },
        onMutate: async ({ product, isCurrentlySaved }: TogglePayload) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['wishlist', safeUserId] });

            // Snapshot the previous value
            const previousWishlist = queryClient.getQueryData<Product[]>(['wishlist', safeUserId]);

            // Optimistically update to the new value
            if (previousWishlist) {
                if (isCurrentlySaved) {
                    queryClient.setQueryData<Product[]>(
                        ['wishlist', safeUserId],
                        previousWishlist.filter(p => p.id !== product.id)
                    );
                } else {
                    queryClient.setQueryData<Product[]>(
                        ['wishlist', safeUserId],
                        [...previousWishlist, product]
                    );
                }
            }
            return { previousWishlist };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (_err, _variables, context) => {
            console.error("Reverting optimistic UI update due to backend error");
            if (context?.previousWishlist) {
                queryClient.setQueryData(['wishlist', safeUserId], context.previousWishlist);
            }
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
            if (!safeUserId) return; // Prevent action if no user
            toggleMutation.mutate({
                productId: product.id,
                product,
                isCurrentlySaved: isSaved(product.id)
            });
        }
    };
};
