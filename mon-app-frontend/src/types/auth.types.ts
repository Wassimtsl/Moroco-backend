// src/types/auth.types.ts
// Requête de login (ce qu'on envoie au backend)
export interface LoginRequest {
  email: string;
  password: string;
}
// Réponse du backend après login réussi
export interface LoginResponse {
  token: string;
}
// Requête d'inscription
export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  numTel?: string;
}
// Données décodées du JWT token
export interface DecodedToken {
  sub: string;
  roles: string[];
  exp: number;
}

// Utilisateur stocké côté client (exposé par useAuth)
export interface User {
  
  email: string;
  sub: string;
  roles: string[];
}
