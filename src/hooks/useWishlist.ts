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

    // Fetch wishlist
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['wishlist', userId],
        queryFn: async (): Promise<Product[]> => {
            if (!userId) return [];
            const { data } = await api.get(`/wishlist/${userId}`);
            return data;
        },
        enabled: !!userId,
    });

    const isSaved = (productId: string) => wishlist.some((p: Product) => p.id === productId);

    // Toggle Mutation with Optimistic Updates
    const toggleMutation = useMutation({
        mutationFn: async ({ productId, isCurrentlySaved }: TogglePayload) => {
            if (!userId) throw new Error("User not logged in");
            try {
                if (isCurrentlySaved) {
                    await api.delete(`/wishlist/${userId}/${productId}`);
                } else {
                    await api.post(`/wishlist/${userId}/${productId}`);
                }
            } catch (error) {
                console.error("Wishlist mutation failed:", error);
                throw error;
            }
        },
        onMutate: async ({ product, isCurrentlySaved }: TogglePayload) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['wishlist', userId] });

            // Snapshot the previous value
            const previousWishlist = queryClient.getQueryData<Product[]>(['wishlist', userId]);

            // Optimistically update to the new value
            if (previousWishlist) {
                if (isCurrentlySaved) {
                    queryClient.setQueryData<Product[]>(
                        ['wishlist', userId],
                        previousWishlist.filter(p => p.id !== product.id)
                    );
                } else {
                    queryClient.setQueryData<Product[]>(
                        ['wishlist', userId],
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
                queryClient.setQueryData(['wishlist', userId], context.previousWishlist);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist', userId] });
        },
    });

    return {
        wishlist,
        isLoading,
        isSaved,
        toggleWishlist: (product: Product) => {
            if (!userId) return; // Prevent action if no user
            toggleMutation.mutate({
                productId: product.id,
                product,
                isCurrentlySaved: isSaved(product.id)
            });
        }
    };
};
