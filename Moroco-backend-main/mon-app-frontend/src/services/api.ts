// src/services/api.ts
import httpClient from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/constants';

import type {
  Utilisateur,
  CreateUtilisateurDTO,
  UpdateUtilisateurDTO,
} from '../types/user.types';

class ApiService {
  async getAllUtilisateurs(): Promise<Utilisateur[]> {
    const response = await httpClient.get<Utilisateur[]>(API_ENDPOINTS.USERS);
    return response.data;
  }

  async getUtilisateurById(id: number): Promise<Utilisateur> {
    const response = await httpClient.get<Utilisateur>(
      API_ENDPOINTS.USER_BY_ID(id)
    );
    return response.data;
  }

  async createUtilisateur(data: CreateUtilisateurDTO): Promise<Utilisateur> {
    const response = await httpClient.post<Utilisateur>(
      API_ENDPOINTS.USERS,
      data
    );
    return response.data;
  }

  async updateUtilisateur(
    id: number,
    data: UpdateUtilisateurDTO
  ): Promise<Utilisateur> {
    const response = await httpClient.put<Utilisateur>(
      API_ENDPOINTS.USER_BY_ID(id),
      data
    );
    return response.data;
  }

  async deleteUtilisateur(id: number): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.USER_BY_ID(id));
  }
}

export default new ApiService();
