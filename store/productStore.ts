
import { create } from 'zustand';
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    thumbnail: string;
    images: string[];
}
interface ProductState {
    products: Product[];
    loading: boolean;
    limit: number;
    total: number;
    fetchProducts: (
        skip: number,
        query?: string,
        category?: string
    ) => Promise<void>;
}
export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    loading: false,
    limit: 10,
    total: 0,
    fetchProducts: async (skip, query = '', category = '') => {
        set({ loading: true });

        try {
            const { limit } = get();
            const endpoint = category
                ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
                : query.trim()
                    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query.trim())}&limit=${limit}&skip=${skip}`
                    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const result = await response.json();
            set({
                products: result.products,
                total: result.total,
                loading: false
            });
        } catch (error) {
            console.log('Unable to fetch products: ', error);
            set({ loading: false });
        }
    }
}));