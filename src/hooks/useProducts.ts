import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product } from '../types';

export const useProducts = (categoryId?: string, searchQuery?: string) => {
    return useQuery({
        queryKey: ['products', categoryId, searchQuery],
        queryFn: async (): Promise<Product[]> => {
            try {
                const params = new URLSearchParams();
                if (categoryId) params.append('categoryId', categoryId);
                if (searchQuery) params.append('q', searchQuery);

                const queryString = params.toString();
                const url = `/api/products${queryString ? '?' + queryString : ''}`;

                const { data } = await api.get(url);
                return data;
            } catch (error: any) {
                console.error("Products fetch error:", error);
                alert(`Products xatolik: ${error?.message || error}`);
                throw error;
            }
        }
    });
};
