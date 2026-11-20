import { create } from 'zustand'


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
    fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    loading: false,

    fetchUsers: async () => {
        set({ loading: true })
        try {
            const response = await fetch("https://dummyjson.com/users?limit=10&skip=0");
            if (!response.ok) throw new Error("Failed to fetch users: ");
            const result = await response.json()
            set({
                users: result.users,
                loading: false
            });
        } catch (error) {
            console.log("Faled to fetch users: ", error);
            set({ loading: false });
        }
    }
}))