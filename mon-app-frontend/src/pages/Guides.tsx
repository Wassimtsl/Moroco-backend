// src/pages/Guides.tsx
import { useState, useEffect } from 'react';
import { guideService } from '../services/guide.service';
import type { Utilisateur } from '../types/user.types';

export default function Guides() {
  const [guides, setGuides] = useState<Utilisateur[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    guideService.getGuidesDisponibles()
      .then(setGuides)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p className="text-center py-12">Chargement...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Guides disponibles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div key={guide.id} className="bg-white rounded-xl shadow-md p-5">
            <h3 className="text-lg font-semibold">{guide.nom} {guide.prenom}</h3>
            <p className="text-gray-500 text-sm">{guide.email}</p>
          </div>
        ))}
      </div>

      {guides.length === 0 && (
        <p className="text-gray-500 text-center py-12">Aucun guide disponible.</p>
      )}
    </div>
  );
}