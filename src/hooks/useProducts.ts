import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product } from '../types';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async (): Promise<Product[]> => {
            const { data } = await api.get('/products');
            // Assuming the backend returns an array of products
            return data;
        }
    });
};
