// src/pages/MesReservations.tsx
import { useReservations } from '../hooks/useReservations';
import { useAuth } from '../hooks/useAuth';

export default function MesReservations() {
  const { user } = useAuth();
  const { reservations, isLoading, error, annulerReservation } = useReservations();

  const handleAnnuler = async (id: number) => {
    if (window.confirm('Annuler cette réservation ?')) {
      await annulerReservation(id);
    }
  };

  if (isLoading) return <p className="text-center py-12">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes réservations</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

      {reservations.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Aucune réservation.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{res.evenementTitre || `Événement #${res.eventId}`}</h3>
                <p className="text-sm text-gray-500">
                  {res.nombrePersonne} personne(s) — Statut : {res.statutLibelle || 'En attente'}
                </p>
                {res.dateReservation && (
                  <p className="text-xs text-gray-400">
                    Réservé le {new Date(res.dateReservation).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
              {res.statutCode !== 'ANNULEE' && (
                <button
                  onClick={() => handleAnnuler(res.id!)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Annuler
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}