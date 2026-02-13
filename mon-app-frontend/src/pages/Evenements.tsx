// src/pages/Evenements.tsx
import { useEvenements } from '../hooks/useEvenements';
import EventCard from '../components/EventCard';

export default function Evenements() {
  const { evenements, isLoading, error } = useEvenements();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg text-gray-500">Chargement des événements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Événements</h1>

      {evenements.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Aucun événement disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evenements.map((evt) => (
            <EventCard key={evt.id} evenement={evt} />
          ))}
        </div>
      )}
    </div>
  );
}