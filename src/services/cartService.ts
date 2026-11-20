import { api } from './api';
import { CartItem } from '../types';

export const cartService = {
    getCart: async (userId: string): Promise<CartItem[]> => {
        const { data } = await api.get(`/api/cart/${userId}`);
        return data;
    },

    addToCart: async (userId: string, productId: string, quantity: number = 1) => {
        const validQty = Math.max(1, Math.floor(Number(quantity)) || 1);
        const { data } = await api.post(`/api/cart/${userId}/items?quantity=${validQty}`, {
            productId,
            quantity: validQty
        });
        return data;
    },

    updateQuantity: async (userId: string, cartItemId: string, quantity: number) => {
        const validQty = Math.max(1, Math.floor(Number(quantity)) || 1);
        try {
            const { data } = await api.patch(
                `/api/cart/${userId}/items/${cartItemId}?quantity=${validQty}`,
                { quantity: validQty },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return data;
        } catch {
            const { data } = await api.put(
                `/api/cart/${userId}/items/${cartItemId}?quantity=${validQty}`,
                { quantity: validQty },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return data;
        }
    },

    removeCartItem: async (userId: string, cartItemId: string) => {
        const { data } = await api.delete(`/api/cart/${userId}/items/${cartItemId}`);
        return data;
    }
};
