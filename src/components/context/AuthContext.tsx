'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { AuthState, LoginCredentials, User } from '../../components/Types/type';
import { mockUser } from '../../lib/mockData';
import { useToast } from '../ui/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const loadAuthState = () => {
      try {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('authState') : null;
        if (saved) {
          const parsed = JSON.parse(saved);
          setAuthState({ ...parsed, isLoading: false });
        } else {
          setAuthState({ ...initialState, isLoading: false });
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
        setAuthState({ ...initialState, isLoading: false });
      }
    };
    loadAuthState();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    await new Promise(res => setTimeout(res, 1000)); // Simulate API delay

    if (credentials.email && credentials.password) {
      const newAuthState: AuthState = {
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      };
      setAuthState(newAuthState);
      localStorage.setItem('authState', JSON.stringify(newAuthState));

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${mockUser.name}!`,
      });

      router.push('/dashboard');
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
  }, [router, toast]);

  const logout = useCallback(() => {
    localStorage.removeItem('authState');
    localStorage.removeItem('apiToken');
    localStorage.removeItem('userProfileData');
    window.dispatchEvent(new Event('storage')); // Trigger storage event for other tabs
    setAuthState({ ...initialState, isLoading: false });

    toast({
      title: 'Logged Out',
      description: 'You\'ve been successfully logged out.',
    });

    router.push('/');
  }, [router, toast]);

  const updateUser = useCallback((userData: Partial<User>) => {
    setAuthState(prev => {
      if (!prev.user) return prev;

      const updatedUser = { ...prev.user, ...userData };
      const newState = { ...prev, user: updatedUser };

      localStorage.setItem('authState', JSON.stringify(newState));

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });

      return newState;
    });
  }, [toast]);

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
