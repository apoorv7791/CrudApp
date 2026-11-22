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
    cache: Record<string, { products: Product[]; total: number }>;
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
    cache: {},

    fetchProducts: async (skip, query = '', category = '') => {
        const { limit, cache } = get();

        // Create a unique cache key based on skip, search query and category
        const cacheKey = `products-${skip}-${query.trim()}-${category.trim()}`;

        // If data already exists in cache, use it instead of calling the API
        // This avoids unnecessary network requests and improves performance
        if (cache[cacheKey]) {
            set({
                products: cache[cacheKey].products,
                total: cache[cacheKey].total,
                loading: false,
            });
            return;
        }

        set({ loading: true });

        try {
            let endpoint = '';

            if (category) {
                endpoint = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
            } else if (query.trim()) {
                endpoint = `https://dummyjson.com/products/search?q=${encodeURIComponent(query.trim())}&limit=${limit}&skip=${skip}`;
            } else {
                endpoint = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
            }

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const result = await response.json();

            // Store the result in cache for future use
            set({
                products: result.products,
                total: result.total,
                cache: {
                    ...get().cache,
                    [cacheKey]: {
                        products: result.products,
                        total: result.total,
                    },
                },
                loading: false,
            });
        } catch (error) {
            console.error('Unable to fetch products:', error);
            set({ loading: false });
        }
    },
}));