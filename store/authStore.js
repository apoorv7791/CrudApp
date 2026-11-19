import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    token: null,
    user: null,
    setSession: (session) =>
        set({
            token: session?.accessToken ?? null,
            user: session?.user ?? null,
        }),
    logout: () => set({ token: null, user: null }),
}));