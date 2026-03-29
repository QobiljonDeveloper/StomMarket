import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product } from '../types';

export const useProducts = (categoryId?: string, searchQuery?: string) => {
    return useQuery({
        queryKey: ['products', categoryId ?? null, searchQuery ?? ''],
        queryFn: async (): Promise<Product[]> => {
            const params = new URLSearchParams();
            if (categoryId) params.append('categoryId', categoryId);
            if (searchQuery) params.append('q', searchQuery);
            const url = `/api/products${params.toString() ? '?' + params.toString() : ''}`;
            const { data } = await api.get(url);
            return data;
        }
    });
};
