// src/types/evenement.types.ts

export interface Evenement {
  id?: number;
  titreEvent: string;
  description: string;
  image: string;
  dateDebut: string;     // ISO 8601 : "2025-06-15T10:00:00"
  dateFin: string;
  typeEvenementId?: number;
  tarifId?: number;
  adresseId?: number;
  userId?: number;
}