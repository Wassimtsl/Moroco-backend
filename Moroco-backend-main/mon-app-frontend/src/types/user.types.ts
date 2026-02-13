// src/types/user.types.ts
// Type Role (correspond à Role.java)
export interface Role {
  id: number;
  nom: string;
}
// Type Utilisateur (correspond à User.java)
export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  numTel?: string;
  verifMail?: boolean;
  role: Role;
  adresse?: {
    id: number;
    adresse: string;
    ville: string;
    pays: string;
  } | null;
}
// DTO pour créer un utilisateur (sans id)
export interface CreateUtilisateurDTO {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  numTel?: string;
  role?: {
    id: number;
  };
}
// DTO pour mettre à jour un utilisateur
export interface UpdateUtilisateurDTO {
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  numTel?: string;
  role?: {
    id: number;
  };
}