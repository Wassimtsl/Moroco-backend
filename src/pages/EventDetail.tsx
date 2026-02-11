import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import { Calendar, MapPin, ArrowLeft, Clock } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Event = Database['public']['Tables']['evenement']['Row'] & {
  adresse?: Database['public']['Tables']['adresse']['Row'];
  tarif?: Database['public']['Tables']['tarif']['Row'];
  guide?: Database['public']['Tables']['profiles']['Row'];
};

interface EventDetailProps {
  eventId: string;
}

export default function EventDetail({ eventId }: EventDetailProps) {
  const { profile } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [nombrePersonne, setNombrePersonne] = useState(1);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('evenement')
      .select(`
        *,
        adresse(*),
        tarif(*),
        guide:profiles(*)
      `)
      .eq('id', eventId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching event:', error);
    } else if (data) {
      setEvent(data as Event);
    }

    setLoading(false);
  };

  const handleBooking = async () => {
    if (!profile) {
      alert('Vous devez être connecté pour réserver');
      return;
    }

    setBooking(true);

    try {
      const { error } = await supabase
        .from('reservation')
        .insert({
          evenement_id: eventId,
          user_id: profile.id,
          nombre_personne: nombrePersonne,
          statut: 'En attente'
        });

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Erreur lors de la réservation');
    } finally {
      setBooking(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotal = () => {
    if (!event?.tarif) return 0;
    return (event.tarif.prix - (event.tarif.promotion || 0)) * nombrePersonne;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Événement introuvable</h2>
          <a href="/events" className="text-orange-600 hover:text-orange-700">
            Retour aux événements
          </a>
        </div>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservation confirmée</h2>
            <p className="text-gray-600 mb-6">
              Votre réservation pour <span className="font-semibold">{event.titre_event}</span> a été enregistrée avec succès.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/dashboard"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Voir mes réservations
              </a>
              <a
                href="/events"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Autres événements
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <a
          href="/events"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux événements
        </a>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96 bg-gradient-to-br from-orange-400 to-amber-600">
            {event.image ? (
              <img src={event.image} alt={event.titre_event} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Calendar className="w-24 h-24 text-white opacity-50" />
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.titre_event}</h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Début</p>
                      <p className="text-sm">{formatDate(event.date_debut)}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Fin</p>
                      <p className="text-sm">{formatDate(event.date_fin)}</p>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {event.description || 'Aucune description disponible pour cet événement.'}
                  </p>
                </div>

                {event.adresse && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                      Localisation
                    </h3>
                    <p className="text-gray-700">
                      {event.adresse.adresse && <>{event.adresse.adresse}<br /></>}
                      {event.adresse.ville} {event.adresse.code_postal}
                      <br />
                      {event.adresse.pays}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Réservation</h3>

                  {event.tarif && (
                    <div className="mb-6">
                      <div className="flex items-baseline mb-2">
                        <span className="text-3xl font-bold text-gray-900">
                          {event.tarif.prix - (event.tarif.promotion || 0)} MAD
                        </span>
                        <span className="text-gray-500 ml-2">/ personne</span>
                      </div>
                      {event.tarif.promotion > 0 && (
                        <p className="text-sm text-gray-500 line-through">
                          Prix original: {event.tarif.prix} MAD
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de personnes
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={nombrePersonne}
                      onChange={(e) => setNombrePersonne(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{calculateTotal()} MAD</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={booking}
                    className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {booking ? 'Réservation...' : 'Réserver maintenant'}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Votre réservation sera confirmée par le guide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
