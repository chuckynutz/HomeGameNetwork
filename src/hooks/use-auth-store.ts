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
// THIS SHOULD BE PHASED OUT ONCE FIREBASE AUTH IS INTEGRATED. Right now wer're just this test user
export const useAuthStore = create<AuthState>((set) => ({
  // For testing purposes, we'll start with a mock user
  isAuthenticated: true,
  isAgeVerified: true,
  isFirstOpen: false,
  user: {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    avatar: ''
  },
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