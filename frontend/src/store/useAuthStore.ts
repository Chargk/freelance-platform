import { create } from 'zustand';
import { authAPI } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name?: string; email?: string; password?: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authAPI.register({ name, email, password });
      localStorage.setItem('token', data.token);
      set({ user: data, token: data.token, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authAPI.login({ email, password });
      localStorage.setItem('token', data.token);
      set({ user: data, token: data.token, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  updateProfile: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authAPI.updateProfile(userData);
      set({ user: data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Profile update failed',
        isLoading: false,
      });
      throw error;
    }
  },
}));