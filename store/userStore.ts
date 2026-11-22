
import { create } from 'zustand';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    company: {
        name: string;
        title: string;
        department: string;
    };
}

interface UserState {
    users: User[];
    loading: boolean;
    limit: number;
    total: number;
    fetchUsers: (skip: number, query?: string) => Promise<void>;
    cache: Record<string, { users: User[]; total: number }>;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    loading: false,
    limit: 10,
    total: 0,
    cache: {},

    fetchUsers: async (skip, query = '') => {

        const { limit, cache } = get();

        const cacheKey = `users-${skip}-${query.trim()}`;

        // Check whether this request already exists in cache.
        if (cache[cacheKey]) {
            set({
                users: cache[cacheKey].users,
                total: cache[cacheKey].total,
                loading: false,
            });

            return;
        }

        set({ loading: true });

        try {
            const endpoint = query.trim()
                ? `https://dummyjson.com/users/search?q=${encodeURIComponent(query.trim())}&limit=${limit}&skip=${skip}`
                : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const result = await response.json();

            set({
                users: result.users,
                total: result.total,
                cache: {
                    ...get().cache,
                    [cacheKey]: {
                        users: result.users,
                        total: result.total,
                    },
                },
                loading: false,
            });
        } catch (error) {
            console.error('Failed to fetch users:', error);

            set({
                loading: false,
            });
        }
    },
}));
