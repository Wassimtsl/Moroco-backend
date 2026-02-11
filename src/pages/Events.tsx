import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import { Calendar, MapPin, DollarSign, Search } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Event = Database['public']['Tables']['evenement']['Row'] & {
  adresse?: Database['public']['Tables']['adresse']['Row'];
  tarif?: Database['public']['Tables']['tarif']['Row'];
  guide?: Database['public']['Tables']['profiles']['Row'];
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('evenement')
      .select(`
        *,
        adresse(*),
        tarif(*),
        guide:profiles(*)
      `)
      .gte('date_debut', new Date().toISOString())
      .order('date_debut', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
    } else if (data) {
      setEvents(data as Event[]);
    }
    setLoading(false);
  };

  const filteredEvents = events.filter((event) =>
    event.titre_event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculatePrice = (tarif: any) => {
    if (!tarif) return 'Prix non défini';
    const finalPrice = tarif.prix - (tarif.promotion || 0);
    return `${finalPrice} MAD`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Événements</h1>
            <p className="text-gray-600 mt-1">Découvrez nos expériences au Maroc</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group"
              >
                <div className="relative h-48 bg-gradient-to-br from-orange-400 to-amber-600 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.titre_event}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {event.titre_event}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description || 'Aucune description disponible'}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                      {formatDate(event.date_debut)}
                    </div>

                    {event.adresse && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                        {event.adresse.ville}, {event.adresse.pays}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                      <span className="text-lg font-bold text-gray-900">
                        {calculatePrice(event.tarif)}
                      </span>
                    </div>
                    <a
                      href={`/event/${event.id}`}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
                    >
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
