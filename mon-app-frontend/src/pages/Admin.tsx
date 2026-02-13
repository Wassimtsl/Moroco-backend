// src/pages/Admin.tsx
import { useState } from 'react';
import { useEvenements } from '../hooks/useEvenements';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import type { Evenement } from '../types/evenement.types';

export default function Admin() {
  const { evenements, isLoading, error, createEvenement, deleteEvenement } = useEvenements();
  const [showForm, setShowForm] = useState(false);

  // Créer un événement
  const handleCreate = async (data: Evenement) => {
    await createEvenement(data);
    setShowForm(false); // Fermer la modale
  };

  // Supprimer avec confirmation
  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      await deleteEvenement(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administration</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Nouvel événement
        </button>
      </div>

      {/* Erreur */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>
      )}

      {/* Chargement */}
      {isLoading ? (
        <p className="text-gray-500 text-center py-12">Chargement...</p>
      ) : evenements.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Aucun événement. Créez-en un !</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evenements.map((evt) => (
            <EventCard
              key={evt.id}
              evenement={evt}
              showActions={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modale de création */}
      {showForm && (
        <EventForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}