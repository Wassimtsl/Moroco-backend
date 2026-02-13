// src/components/EventCard.tsx

import type { Evenement } from '../types/evenement.types';

interface EventCardProps {
  evenement: Evenement;
  onDelete?: (id: number) => void;  // Optionnel : bouton supprimer
  onReserve?: (id: number) => void;  // NOUVEAU
  showActions?: boolean;             // Afficher les actions admin ?
}

export default function EventCard({ evenement, onDelete, onReserve, showActions = false }: EventCardProps) {

  // Formater la date pour l'affichage
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      {evenement.image && (
        <img
          src={evenement.image}
          alt={evenement.titreEvent}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {evenement.titreEvent}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {evenement.description}
        </p>

        {/* Dates */}
        <div className="text-sm text-gray-500 space-y-1 mb-4">
          <p>📅 Début : {formatDate(evenement.dateDebut)}</p>
          <p>📅 Fin : {formatDate(evenement.dateFin)}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {onReserve && evenement.id && (
            <button
              onClick={() => onReserve(evenement.id!)}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Réserver
            </button>
          )}
          {showActions && onDelete && evenement.id && (
            <button
              onClick={() => onDelete(evenement.id!)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}