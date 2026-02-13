// src/services/guide.service.ts
import httpClient from '../utils/httpClient';
import type { Utilisateur } from '../types/user.types';

const BASE_URL = '/api/users';

export const guideService = {

  async getAllGuides(): Promise<Utilisateur[]> {
    const response = await httpClient.get<Utilisateur[]>(`${BASE_URL}/guides`);
    return response.data;
  },

  async getGuidesDisponibles(): Promise<Utilisateur[]> {
    const response = await httpClient.get<Utilisateur[]>(`${BASE_URL}/guides/disponibles`);
    return response.data;
  },

  async updateDisponibilite(id: number, disponibilite: boolean): Promise<Utilisateur> {
    const response = await httpClient.patch<Utilisateur>(
      `${BASE_URL}/${id}/disponibilite?disponibilite=${disponibilite}`
    );
    return response.data;
  },

  async updateTarif(id: number, tarif: number): Promise<Utilisateur> {
    const response = await httpClient.patch<Utilisateur>(
      `${BASE_URL}/${id}/tarif?tarif=${tarif}`
    );
    return response.data;
  },
};