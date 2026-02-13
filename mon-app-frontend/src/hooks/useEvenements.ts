// src/hooks/useEvenements.ts
import { useState, useEffect, useCallback } from 'react';
import { evenementService } from '../services/evenement.service';
import type { Evenement } from '../types/evenement.types';

export function useEvenements() {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger tous les événements
  const loadEvenements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await evenementService.getAll();
      setEvenements(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Supprimer un événement
  const deleteEvenement = useCallback(async (id: number) => {
    try {
      await evenementService.delete(id);
      setEvenements(prev => prev.filter(e => e.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de suppression');
    }
  }, []);

  // Créer un événement
  const createEvenement = useCallback(async (data: Evenement) => {
    try {
      const created = await evenementService.create(data);
      setEvenements(prev => [...prev, created]);
      return created;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de création');
      throw e;
    }
  }, []);

  // Modifier un événement
  const updateEvenement = useCallback(async (id: number, data: Evenement) => {
    try {
      const updated = await evenementService.update(id, data);
      setEvenements(prev => prev.map(e => e.id === id ? updated : e));
      return updated;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de modification');
      throw e;
    }
  }, []);

  // Charger au montage du composant
  useEffect(() => {
    loadEvenements();
  }, [loadEvenements]);

  return {
    evenements,
    isLoading,
    error,
    loadEvenements,
    deleteEvenement,
    createEvenement,
    updateEvenement,
  };
}