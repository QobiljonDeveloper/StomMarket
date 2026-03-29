import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import { Product, CartItem } from '../types';
import { toast } from 'sonner';

export const useCartApi = (userId: string | undefined | null) => {
    const queryClient = useQueryClient();
    const safeUserId = userId ? String(userId) : null;

    // Fetch cart
    const { data: cart = [], isLoading, refetch } = useQuery({
        queryKey: ['cart', safeUserId],
        queryFn: async (): Promise<CartItem[]> => {
            if (!safeUserId) return [];
            console.log(`Fetching cart for user: ${safeUserId}`);
            try {
                const data = await cartService.getCart(safeUserId);
                console.log("Cart data received:", data);
                // Xavfsizlik qatlami: array emas bo'lsa (masalan {items: []} obyekt kelsa), array ni ajratib olish
                const items = Array.isArray(data) ? data : (data as any)?.items || [];
                return items;
            } catch (error: any) {
                console.error("Error fetching cart data:", error);
                alert(`Cart fetch xatoligi: ${error?.message || error}`);
                throw error;
            }
        },
        enabled: !!safeUserId,
    });

    // Add to cart mutation
    const addToCartMutation = useMutation({
        mutationFn: async (product: Product) => {
            if (!safeUserId) throw new Error("User not logged in");
            console.log(`Adding product ${product.id} to cart...`);
            try {
                const data = await cartService.addToCart(safeUserId, product.id);
                console.log("Add to cart success:", data);
                return data;
            } catch (error: any) {
                console.error("Error adding product to cart:", error);
                alert(`Cart add xatoligi: ${error?.message || error}`);
                throw error;
            }
        },
        onMutate: async (product: Product) => {
            await queryClient.cancelQueries({ queryKey: ['cart', safeUserId] });
            const previousCart = queryClient.getQueryData<CartItem[]>(['cart', safeUserId]);

            if (previousCart) {
                const existing = previousCart.find(item => item.product.id === product.id);
                if (existing) {
                    queryClient.setQueryData<CartItem[]>(['cart', safeUserId],
                        previousCart.map(item =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    );
                } else {
                    const newItem: CartItem = {
                        id: `temp-${Date.now()}`,
                        quantity: 1,
                        product
                    };
                    queryClient.setQueryData<CartItem[]>(['cart', safeUserId], [...previousCart, newItem]);
                }
            }
            return { previousCart };
        },
        onError: (err: any, _product, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(['cart', safeUserId], context.previousCart);
            }
            toast.error(err?.response?.data?.message || "Savatga qo'shishda xatolik");
            console.error("Add to cart error details:", err);
        },
        onSuccess: () => {
            toast.success("Savatga qo'shildi");
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    // Update Quantity Mutation
    const updateQuantityMutation = useMutation({
        mutationFn: async ({ cartItemId, quantity }: { cartItemId: string, quantity: number }) => {
            if (!safeUserId) throw new Error("User not logged in");
            console.log(`Updating cart item ${cartItemId} to quantity: ${quantity}`);
            try {
                const data = await cartService.updateQuantity(safeUserId, cartItemId, quantity);
                console.log("Update quantity success:", data);
                return data;
            } catch (error: any) {
                console.error("Error updating cart item quantity:", error);
                alert(`Cart update xatoligi: ${error?.message || error}`);
                throw error;
            }
        },
        onMutate: async ({ cartItemId, quantity }) => {
            await queryClient.cancelQueries({ queryKey: ['cart', safeUserId] });
            const previousCart = queryClient.getQueryData<CartItem[]>(['cart', safeUserId]);

            if (previousCart) {
                queryClient.setQueryData<CartItem[]>(['cart', safeUserId],
                    previousCart.map(item =>
                        item.id === cartItemId
                            ? { ...item, quantity }
                            : item
                    )
                );
            }
            return { previousCart };
        },
        onError: (err: any, _vars, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(['cart', safeUserId], context.previousCart);
            }
            toast.error(err?.response?.data?.message || "Miqdorni o'zgartirishda xatolik");
            console.error("Update quantity error details:", err);
        },
        onSuccess: () => {
            toast.success("Savat yangilandi");
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    // Remove Item Mutation
    const removeCartItemMutation = useMutation({
        mutationFn: async (cartItemId: string) => {
            if (!safeUserId) throw new Error("User not logged in");
            console.log(`Removing item ${cartItemId} from cart...`);
            try {
                const data = await cartService.removeCartItem(safeUserId, cartItemId);
                console.log("Remove cart item success:", data);
                return data;
            } catch (error: any) {
                console.error("Error removing cart item:", error);
                alert(`Cart remove xatoligi: ${error?.message || error}`);
                throw error;
            }
        },
        onMutate: async (cartItemId: string) => {
            await queryClient.cancelQueries({ queryKey: ['cart', safeUserId] });
            const previousCart = queryClient.getQueryData<CartItem[]>(['cart', safeUserId]);

            if (previousCart) {
                queryClient.setQueryData<CartItem[]>(['cart', safeUserId],
                    previousCart.filter(item => item.id !== cartItemId)
                );
            }
            return { previousCart };
        },
        onError: (err: any, _vars, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(['cart', safeUserId], context.previousCart);
            }
            toast.error(err?.response?.data?.message || "O'chirishda xatolik");
            console.error("Remove cart item error details:", err);
        },
        onSuccess: () => {
            toast.success("Savatdan o'chirildi");
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    return {
        cart,
        isLoading,
        refetch,
        addToCartMutation,
        updateQuantityMutation,
        removeCartItemMutation
    };
};
