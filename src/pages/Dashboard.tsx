import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import { Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Reservation = Database['public']['Tables']['reservation']['Row'] & {
  evenement?: Database['public']['Tables']['evenement']['Row'] & {
    adresse?: Database['public']['Tables']['adresse']['Row'];
    tarif?: Database['public']['Tables']['tarif']['Row'];
  };
};

export default function Dashboard() {
  const { profile } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchReservations();
    }
  }, [profile]);

  const fetchReservations = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('reservation')
      .select(`
        *,
        evenement:evenement_id(
          *,
          adresse(*),
          tarif(*)
        )
      `)
      .eq('user_id', profile!.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reservations:', error);
    } else if (data) {
      setReservations(data as Reservation[]);

      const confirmed = data.filter((r) => r.statut === 'Confirmé').length;
      const pending = data.filter((r) => r.statut === 'En attente').length;

      setStats({
        total: data.length,
        confirmed,
        pending
      });
    }

    setLoading(false);
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Confirmé':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Annulé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {profile?.prenom} {profile?.nom}
          </h1>
          <p className="text-gray-600 mt-1">Gérez vos réservations et découvrez de nouveaux événements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total réservations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmées</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.confirmed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Mes réservations</h2>
          </div>

          {reservations.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation</h3>
              <p className="text-gray-500 mb-4">Commencez à explorer nos événements</p>
              <a
                href="/events"
                className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Découvrir les événements
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {reservation.evenement?.titre_event}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(reservation.statut)}`}>
                          {reservation.statut}
                        </span>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        {reservation.evenement && (
                          <>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                              {formatDate(reservation.evenement.date_debut)}
                            </div>
                            {reservation.evenement.adresse && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                                {reservation.evenement.adresse.ville}, {reservation.evenement.adresse.pays}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      {reservation.evenement?.tarif && (
                        <p className="text-2xl font-bold text-gray-900">
                          {(reservation.evenement.tarif.prix - (reservation.evenement.tarif.promotion || 0)) * reservation.nombre_personne} MAD
                        </p>
                      )}
                      <a
                        href={`/event/${reservation.evenement_id}`}
                        className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
                      >
                        Voir les détails
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
