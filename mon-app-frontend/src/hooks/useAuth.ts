// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import authService from '../services/auth.service';
import type { RegisterRequest, User } from '../types/auth.types';
interface UseAuthReturn {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasRole: (role: string) => boolean;
}

export const useAuth = (): UseAuthReturn => {
  // États
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * INITIALISATION : Vérifier si l'utilisateur est déjà connecté
   */
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = authService.getToken();
        const storedUser = authService.getUser();

        if (storedToken && storedUser && authService.isAuthenticated()) {
          setToken(storedToken);
          setUser(storedUser);
        } else {
          authService.logout();
          setToken(null);
          setUser(null);
        }
      } catch (e) {
        console.error('Erreur initialisation auth:', e);
        authService.logout();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * FONCTION 1 : LOGIN
   */
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const decoded = await authService.login(email, password);

      const newToken = authService.getToken();
      setToken(newToken);

      setUser({
        email: decoded.sub,
        sub: decoded.sub,
        roles: decoded.roles ?? [],
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erreur de connexion';
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * FONCTION 2 : REGISTER
   */
  const register = useCallback(
    async (data: RegisterRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        await authService.register(data);

        await login(data.email, data.password);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Erreur d'inscription";
        setError(message);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  /**
   * FONCTION 3 : LOGOUT
   */
  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  /**
   * FONCTION 4 : CLEAR ERROR
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * FONCTION 5 : CHECK ROLE
   */
  const hasRole = useCallback((role: string): boolean => {
    return authService.hasRole(role);
  }, []);

  // État dérivé
  const isAuthenticated = !!token && !!user;

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    hasRole,
  };
};
        