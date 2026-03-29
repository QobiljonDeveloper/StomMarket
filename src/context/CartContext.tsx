import { createContext, useContext, ReactNode, useCallback } from "react";
import type { Product, CartItem } from "../types";
import { useAuthContext } from "./AuthContext";
import { useCartApi } from "../hooks/useCartApi";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string) => number;
    cartTotal: number;
    cartCount: number;
    refetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuthContext();
    const { cart, refetch, addToCartMutation, updateQuantityMutation, removeCartItemMutation } = useCartApi(user?.id);

    // Xavfsizlik qatlami: cart doim massiv ekanligiga ishonch hosil qilish
    const safeCart = Array.isArray(cart) ? cart : (cart as any)?.items || [];

    const cartCount = safeCart.reduce((count: number, item: any) => count + (item?.quantity || 0), 0);
    const cartTotal = safeCart.reduce(
        (total: number, item: any) => total + ((item?.product?.basePrice || item?.product?.priceValue || 0) * (item?.quantity || 0)),
        0
    );

    const getItemQuantity = useCallback((productId: string) => {
        const item = safeCart.find((item: any) => item?.product?.id === productId);
        return item ? item.quantity : 0;
    }, [safeCart]);

    const addToCart = useCallback((product: Product) => {
        addToCartMutation.mutate(product);
    }, [addToCartMutation]);

    const removeFromCart = useCallback((productId: string) => {
        if (!user?.id) return;
        const item = safeCart.find((i: any) => i?.product?.id === productId);
        if (item) {
            removeCartItemMutation.mutate(item.id);
        }
    }, [user?.id, safeCart, removeCartItemMutation]);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (!user?.id) return;
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            const item = safeCart.find((i: any) => i?.product?.id === productId);
            if (item) {
                updateQuantityMutation.mutate({ cartItemId: item.id, quantity });
            } else if (quantity === 1) {
                // Failsafe in case product isn't mapped but update was fired
            }
        }
    }, [user?.id, safeCart, removeFromCart, updateQuantityMutation]);

    const clearCart = useCallback(() => {
        // Typically a loop removing everything, or better a dedicated backend endpoint.
        // The prompt didn't request a clearCart endpoint, so skipping it.
        console.warn("Backend clear cart endpoint not yet configured.");
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart: safeCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                getItemQuantity,
                refetchCart: refetch,
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
