// URL de base de votre API backend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Endpoints de l'API
export const API_ENDPOINTS = {
  // Authentification
  LOGIN: '/auth/login',
  USERS: '/api/users',

  // Utilisateurs  config.setAllowedOrigins(Collections.singletonList("http://localhost:5173")); // ← Vite, pas 4200
  USER_BY_ID: (id: number) => `/api/utilisateur/${id}`,
} as const;

// Clés du localStorage
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
} as const;

// Configuration JWT
export const JWT_CONFIG = {
  HEADER_NAME: 'Authorization',
  TOKEN_PREFIX: 'Bearer ',
} as const;

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  INVALID_CREDENTIALS: 'Identifiants incorrects',
  UNAUTHORIZED: 'Accès non autorisé',
  SERVER_ERROR: 'Erreur serveur',
  TOKEN_EXPIRED: 'Session expirée, veuillez vous reconnecter',

  // Messages personnalisés
  EMAIL_EXISTS: 'Cet email est déjà utilisé',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères',
} as const;

