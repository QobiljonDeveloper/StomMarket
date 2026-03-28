import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product } from '../types';

export const useProducts = (categoryId?: string) => {
    return useQuery({
        queryKey: ['products', categoryId],
        queryFn: async (): Promise<Product[]> => {
            const endpoint = categoryId
                ? `/products?categoryId=${categoryId}`
                : '/products';
            const { data } = await api.get(endpoint);
            // Assuming the backend returns an array of products
            return data;
        }
    });
};
