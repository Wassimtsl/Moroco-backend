// src/services/auth.service.ts
import httpClient from '../utils/httpClient';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/constants';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  DecodedToken,
  User,
} from '../types/auth.types';
import type { Utilisateur } from '../types/user.types';

class AuthService {
  async login(email: string, password: string): Promise<DecodedToken> {
    try {
      const loginData: LoginRequest = { email, password };

      const response = await httpClient.post<LoginResponse>(
        API_ENDPOINTS.LOGIN,
        loginData
      );

      const { token } = response.data;

      this.setToken(token);
      const decoded = this.decodeToken(token);
      this.setUser(decoded);

      return decoded;
    } catch (error: any) {
      console.error('Erreur login:', error);
      throw new Error(error.response?.data?.error || 'Erreur de connexion');
    }
  }

  async register(data: RegisterRequest): Promise<Utilisateur> {
    try {
      const response = await httpClient.post<Utilisateur>(
        API_ENDPOINTS.REGISTER,
        data
      );
      return response.data;
    } catch (error: any) {
      console.error("Erreur inscription:", error);
      throw new Error(
        error.response?.data?.error || "Erreur lors de l'inscription"
      );
    }
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  decodeToken(token: string): DecodedToken {
    try {
      const payloadBase64 = token.split('.')[1];
      // petit fix: JWT peut contenir base64url (-, _)
      const normalized = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = atob(normalized);

      return JSON.parse(payloadJson) as DecodedToken;
    } catch (error) {
      console.error('Erreur décodage token:', error);
      throw new Error('Token invalide');
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      const now = Date.now() / 1000; // secondes
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  private setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  private setUser(decoded: DecodedToken): void {
    const user: User = {
      email: decoded.sub,
      sub: decoded.sub,
      roles: decoded.roles,
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    if (!user) return false;
    return user.roles.includes(role);
  }
}

export default new AuthService();
