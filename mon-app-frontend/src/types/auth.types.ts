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
  dateDeNaissance?: string;  // ← Optionnel si backend ne le demande pas
  email: string;
  password: string;  // ← Changé de 'motDePasse' à 'password'
  role?: {  // ← Optionnel
    id: number;
  } | null;
  entreprise?: {
    id: number;
  } | null;
}
// Données décodées du JWT token
export interface DecodedToken {
  sub: string;
  roles: string[];
  exp: number;
}
