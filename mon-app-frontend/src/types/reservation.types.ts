// src/types/reservation.types.ts

export interface Reservation {
  id?: number;
  eventId: number;
  userId: number;
  statutId: number;
  nombrePersonne: number;
  dateReservation?: string;
  dateAnnulation?: string;
  // Champs enrichis (lecture seule)
  evenementTitre?: string;
  statutLibelle?: string;
  statutCode?: string;
  nomTouriste?: string;
}