// src/types/user.types.ts
// Type Role (correspond à Role.java)
export interface Role {
  id: number;
  nom: string;
}
// Type Utilisateur (correspond à Utilisateur.java)
export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  email: string;
  motDePasse?: string;
  role: Role;
  entreprise?: {
    id: number;
    nom: string;
} | null;
}
// DTO pour créer un utilisateur (sans id)
export interface CreateUtilisateurDTO {
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  email: string;
  motDePasse: string;
  role: {
    id: number;
};
  entreprise?: {
    id: number;
} | null;
}
// DTO pour mettre à jour un utilisateur
export interface UpdateUtilisateurDTO {
  nom?: string;
  prenom?: string;
  dateDeNaissance?: string;
  email?: string;
  motDePasse?: string;
  role?: {
    id: number;
};
  entreprise?: {
    id: number;
} | null;
}