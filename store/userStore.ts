
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
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    loading: false,
    limit: 10,
    total: 0,

    fetchUsers: async (skip, query = '') => {
        set({ loading: true });

        try {
            const { limit } = get();

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
