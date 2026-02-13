// src/hooks/useReservations.ts
import { useState, useEffect, useCallback } from 'react';
import { reservationService } from '../services/reservation.service';
import type { Reservation } from '../types/reservation.types';

export function useReservations(userId?: number) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = userId
        ? await reservationService.getByUser(userId)
        : await reservationService.getAll();
      setReservations(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const createReservation = useCallback(async (data: Reservation) => {
    const created = await reservationService.create(data);
    setReservations(prev => [...prev, created]);
    return created;
  }, []);

  const annulerReservation = useCallback(async (id: number) => {
    const updated = await reservationService.annuler(id);
    setReservations(prev => prev.map(r => r.id === id ? updated : r));
    return updated;
  }, []);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  return {
    reservations,
    isLoading,
    error,
    loadReservations,
    createReservation,
    annulerReservation,
  };
}