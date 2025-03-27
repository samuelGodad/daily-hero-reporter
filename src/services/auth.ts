
import api from './api';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  phone?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const AuthService = {
  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { user, token } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      return null;
    }
  },
  
  async logout(): Promise<boolean> {
    try {
      await api.post('/auth/logout');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return true; // Return true anyway to force client-side logout
    } finally {
      // Clear local storage regardless of server response
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    
    try {
      return JSON.parse(userData) as User;
    } catch (error) {
      return null;
    }
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};

export default AuthService;
