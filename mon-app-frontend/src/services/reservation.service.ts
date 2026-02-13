//src/services/reservation.service.ts
import httpClient from '../utils/httpClient';
import type { Reservation } from '../types/reservation.types';

const BASE_URL = '/api/reservations';

export const reservationService = {

  async getAll(): Promise<Reservation[]> {
    const response = await httpClient.get<Reservation[]>(BASE_URL);
    return response.data;
  },

  async getByUser(userId: number): Promise<Reservation[]> {
    const response = await httpClient.get<Reservation[]>(`${BASE_URL}/user/${userId}`);
    return response.data;
  },

  async getByEvenement(eventId: number): Promise<Reservation[]> {
    const response = await httpClient.get<Reservation[]>(`${BASE_URL}/evenement/${eventId}`);
    return response.data;
  },

  async create(data: Reservation): Promise<Reservation> {
    const response = await httpClient.post<Reservation>(BASE_URL, data);
    return response.data;
  },

  async confirmer(id: number): Promise<Reservation> {
    const response = await httpClient.patch<Reservation>(`${BASE_URL}/${id}/confirmer`);
    return response.data;
  },

  async annuler(id: number): Promise<Reservation> {
    const response = await httpClient.patch<Reservation>(`${BASE_URL}/${id}/annuler`);
    return response.data;
  },
};