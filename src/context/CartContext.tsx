import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { Product, CartItem } from "../types";

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

const CART_STORAGE_KEY = "stom_cart";

function loadCart(): CartItem[] {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveCart(cart: CartItem[]) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(loadCart);

    // Persist to localStorage on every change
    useEffect(() => {
        saveCart(cart);
    }, [cart]);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    const cartTotal = cart.reduce(
        (total, item) => total + (item.product.basePrice || item.product.priceValue || 0) * item.quantity,
        0
    );

    const getItemQuantity = useCallback((productId: string) => {
        const item = cart.find((item) => item.product.id === productId);
        return item ? item.quantity : 0;
    }, [cart]);

    const addToCart = useCallback((product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Create a new local CartItem with a generated id
            const newItem: CartItem = {
                id: `local-${product.id}-${Date.now()}`,
                quantity: 1,
                product,
            };
            return [...prev, newItem];
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setCart((prev) => prev.filter((item) => item.product.id !== productId));
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.product.id === productId ? { ...item, quantity } : item
                )
            );
        }
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    // No-op since we're local, but kept for interface compatibility
    const refetchCart = useCallback(() => { }, []);

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
                refetchCart,
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
