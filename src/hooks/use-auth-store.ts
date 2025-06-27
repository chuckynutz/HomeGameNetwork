import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isAgeVerified: boolean;
  isFirstOpen: boolean;
  user: User | null;
  setAuthenticated: (authenticated: boolean) => void;
  setAgeVerified: (verified: boolean) => void;
  setFirstOpen: (firstOpen: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isAgeVerified: false,
  isFirstOpen: true,
  user: null,
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setAgeVerified: (verified) => set({ isAgeVerified: verified }),
  setFirstOpen: (firstOpen) => set({ isFirstOpen: firstOpen }),
  setUser: (user) => set({ user }),
  logout: () => set({ 
    isAuthenticated: false, 
    user: null,
    isAgeVerified: false 
  }),
})); 