import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('/users', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/users/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  },

  updateProfile: async (userData: { name?: string; email?: string; password?: string }) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },
};

// Boards API
export const boardsAPI = {
  getBoards: async () => {
    try {
      const response = await api.get('/boards');
      return response.data;
    } catch (error: any) {
      console.error('Get boards error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to get boards');
    }
  },

  getBoard: async (id: string) => {
    try {
      const response = await api.get(`/boards/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Get board error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to get board');
    }
  },

  createBoard: async (title: string) => {
    try {
      const response = await api.post('/boards', { title });
      return response.data;
    } catch (error: any) {
      console.error('Create board error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to create board');
    }
  },

  updateBoard: async (id: string, data: any) => {
    try {
      const response = await api.put(`/boards/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Update board error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to update board');
    }
  },

  deleteBoard: async (id: string) => {
    try {
      const response = await api.delete(`/boards/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete board error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete board');
    }
  },

  addColumn: async (boardId: string, title: string) => {
    try {
      const response = await api.post(`/boards/${boardId}/columns`, { title });
      return response.data;
    } catch (error: any) {
      console.error('Add column error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to add column');
    }
  },

  deleteColumn: async (boardId: string, columnId: string) => {
    try {
      const response = await api.delete(`/boards/${boardId}/columns/${columnId}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete column error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete column');
    }
  },

  addTask: async (boardId: string, columnId: string, task: any) => {
    try {
      const response = await api.post(
        `/boards/${boardId}/columns/${columnId}/tasks`,
        task
      );
      return response.data;
    } catch (error: any) {
      console.error('Add task error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to add task');
    }
  },

  deleteTask: async (boardId: string, columnId: string, taskId: string) => {
    try {
      const response = await api.delete(
        `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Delete task error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  },

  moveTask: async (
    boardId: string,
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => {
    try {
      const response = await api.put(`/boards/${boardId}/tasks/${taskId}/move`, {
        fromColumnId,
        toColumnId,
      });
      return response.data;
    } catch (error: any) {
      console.error('Move task error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to move task');
    }
  },
};