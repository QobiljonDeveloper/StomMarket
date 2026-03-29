import { api } from './api';
import { CartItem } from '../types';

export const cartService = {
    getCart: async (userId: string): Promise<CartItem[]> => {
        const { data } = await api.get(`/api/cart/${userId}`);
        return data;
    },

    addToCart: async (userId: string, productId: string) => {
        const { data } = await api.post(`/api/cart/${userId}/items`, {
            productId,
            quantity: 1
        });
        return data;
    },

    updateQuantity: async (userId: string, cartItemId: string, quantity: number) => {
        const { data } = await api.patch(`/api/cart/${userId}/items/${cartItemId}?quantity=${quantity}`);
        return data;
    },

    removeCartItem: async (userId: string, cartItemId: string) => {
        const { data } = await api.delete(`/api/cart/${userId}/items/${cartItemId}`);
        return data;
    }
};
