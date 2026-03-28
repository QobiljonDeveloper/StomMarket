import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Product, CartItem } from "../types";
import { useAuthContext } from "./AuthContext";
import { api } from "../services/api";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string) => number;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const userId = user?.id;

    // 1. Fetch Cart
    const { data: cart = [] } = useQuery({
        queryKey: ['cart', userId],
        queryFn: async (): Promise<CartItem[]> => {
            if (!userId) return [];
            const { data } = await api.get(`/cart/${userId}`);
            return data;
        },
        enabled: !!userId,
    });

    // Calculations
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartTotal = cart.reduce(
        (total, item) => total + (item.product.basePrice || item.product.priceValue || 0) * item.quantity,
        0
    );

    const getItemQuantity = (productId: string) => {
        const item = cart.find((item) => item.product.id === productId);
        return item ? item.quantity : 0;
    };

    // 2. Add To Cart Mutation
    const addMutation = useMutation({
        mutationFn: async (productId: string) => {
            if (!userId) throw new Error("Not logged in");
            await api.post(`/cart/${userId}`, { productId, quantity: 1 });
        },
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ['cart', userId] });
            const previousCart = queryClient.getQueryData<CartItem[]>(['cart', userId]);
            // Optimistic update for UI (creates a fake cartItem ID until refetch)
            if (previousCart) {
                const existing = previousCart.find(item => item.product.id === productId);
                if (existing) {
                    queryClient.setQueryData<CartItem[]>(['cart', userId],
                        previousCart.map(item =>
                            item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                        )
                    );
                } else {
                    // We don't have the full product object here to perfectly mock it, 
                    // but the UI will likely quickly refetch. We'll let it be handled by onSuccess.
                    // This is sufficient for the badge count to update via the invalidate.
                }
            }
            return { previousCart };
        },
        onError: (_err, _vars, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(['cart', userId], context.previousCart);
            }
            toast.error("Savatga qo'shishda xatolik yuz berdi");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
        }
    });

    // 3. Remove From Cart Mutation
    const removeMutation = useMutation({
        mutationFn: async (cartItemId: string) => {
            if (!userId) throw new Error("Not logged in");
            await api.delete(`/cart/${userId}/items/${cartItemId}`);
        },
        onMutate: async (cartItemId) => {
            await queryClient.cancelQueries({ queryKey: ['cart', userId] });
            const previousCart = queryClient.getQueryData<CartItem[]>(['cart', userId]);
            if (previousCart) {
                queryClient.setQueryData<CartItem[]>(['cart', userId],
                    previousCart.filter(item => item.id !== cartItemId)
                );
            }
            return { previousCart };
        },
        onError: (_err, _vars, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(['cart', userId], context.previousCart);
            }
            toast.error("Savatdan o'chirishda xatolik yuz berdi");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
        }
    });

    // 4. Update Quantity Mutation
    const updateMutation = useMutation({
        mutationFn: async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
            if (!userId) throw new Error("Not logged in");
            await api.patch(`/cart/${userId}/items/${cartItemId}?quantity=${quantity}`);
        },
        onMutate: async ({ cartItemId, quantity }) => {
            await queryClient.cancelQueries({ queryKey: ['cart', userId] });
            const previousCart = queryClient.getQueryData<CartItem[]>(['cart', userId]);
            if (previousCart) {
                queryClient.setQueryData<CartItem[]>(['cart', userId],
                    previousCart.map(item =>
                        item.id === cartItemId ? { ...item, quantity } : item
                    )
                );
            }
            return { previousCart };
        },
        onError: (_err, _vars, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(['cart', userId], context.previousCart);
            }
            toast.error("Miqdorni o'zgartirishda xatolik yuz berdi");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', userId] });
        }
    });

    // Exposed Functions
    const addToCart = (product: Product) => {
        if (!userId) {
            toast.error("Iltimos, avval tizimga kiring!");
            return;
        }
        addMutation.mutate(product.id);
        toast.success("Savatga qo'shildi!");
    };

    const removeFromCart = (productId: string) => {
        if (!userId) return;
        const cartItem = cart.find(item => item.product.id === productId);
        if (cartItem) {
            removeMutation.mutate(cartItem.id);
        }
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (!userId) return;
        const cartItem = cart.find(item => item.product.id === productId);
        if (cartItem) {
            if (quantity <= 0) {
                removeMutation.mutate(cartItem.id);
            } else {
                updateMutation.mutate({ cartItemId: cartItem.id, quantity });
            }
        }
    };

    const clearCart = () => {
        // Option functionality - not explicit in API requirements, could loop mapping over items or do nothing
        cart.forEach(item => {
            removeMutation.mutate(item.id);
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                getItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
