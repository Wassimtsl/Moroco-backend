// src/services/evenement.service.ts
import httpClient from '../utils/httpClient';
import type { Evenement } from '../types/evenement.types';

const BASE_URL = '/api/evenements';

export const evenementService = {

  // GET /api/evenements — Liste tous les événements
  async getAll(): Promise<Evenement[]> {
    const response = await httpClient.get<Evenement[]>(BASE_URL);
    return response.data;
  },

  // GET /api/evenements/:id — Détail d'un événement
  async getById(id: number): Promise<Evenement> {
    const response = await httpClient.get<Evenement>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // POST /api/evenements — Créer un événement
  async create(data: Evenement): Promise<Evenement> {
    const response = await httpClient.post<Evenement>(BASE_URL, data);
    return response.data;
  },

  // PUT /api/evenements/:id — Modifier un événement
  async update(id: number, data: Evenement): Promise<Evenement> {
    const response = await httpClient.put<Evenement>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // DELETE /api/evenements/:id — Supprimer un événement
  async delete(id: number): Promise<void> {
    await httpClient.delete(`${BASE_URL}/${id}`);
  },

  // GET /api/evenements/entre-dates?debut=...&fin=... — Filtrer par dates
  async getEntreDates(debut: string, fin: string): Promise<Evenement[]> {
    const response = await httpClient.get<Evenement[]>(`${BASE_URL}/entre-dates`, {
      params: { debut, fin }
    });
    return response.data;
  },
};