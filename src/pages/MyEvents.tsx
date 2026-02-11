import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import { Calendar, MapPin, Plus, Trash2, DollarSign } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Event = Database['public']['Tables']['evenement']['Row'] & {
  adresse?: Database['public']['Tables']['adresse']['Row'];
  tarif?: Database['public']['Tables']['tarif']['Row'];
};

export default function MyEvents() {
  const { profile } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    titre_event: '',
    description: '',
    image: '',
    date_debut: '',
    date_fin: '',
    ville: '',
    adresse: '',
    code_postal: '',
    prix: '',
    promotion: ''
  });

  useEffect(() => {
    if (profile) {
      fetchMyEvents();
    }
  }, [profile]);

  const fetchMyEvents = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('evenement')
      .select(`
        *,
        adresse(*),
        tarif(*)
      `)
      .eq('guide_id', profile!.id)
      .order('date_debut', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
    } else if (data) {
      setEvents(data as Event[]);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: adresseData, error: adresseError } = await supabase
        .from('adresse')
        .insert({
          ville: formData.ville,
          adresse: formData.adresse,
          code_postal: formData.code_postal,
          pays: 'Maroc'
        })
        .select()
        .single();

      if (adresseError) throw adresseError;

      const { data: tarifData, error: tarifError } = await supabase
        .from('tarif')
        .insert({
          prix: parseFloat(formData.prix) || 0,
          promotion: parseFloat(formData.promotion) || 0
        })
        .select()
        .single();

      if (tarifError) throw tarifError;

      const { error: eventError } = await supabase
        .from('evenement')
        .insert({
          titre_event: formData.titre_event,
          description: formData.description,
          image: formData.image || null,
          date_debut: formData.date_debut,
          date_fin: formData.date_fin,
          adresse_id: adresseData.id,
          tarif_id: tarifData.id,
          guide_id: profile!.id
        });

      if (eventError) throw eventError;

      setShowModal(false);
      setFormData({
        titre_event: '',
        description: '',
        image: '',
        date_debut: '',
        date_fin: '',
        ville: '',
        adresse: '',
        code_postal: '',
        prix: '',
        promotion: ''
      });
      fetchMyEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Erreur lors de la création de l\'événement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    const { error } = await supabase
      .from('evenement')
      .delete()
      .eq('id', eventId);

    if (error) {
      console.error('Error deleting event:', error);
      alert('Erreur lors de la suppression de l\'événement');
    } else {
      fetchMyEvents();
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Événements</h1>
            <p className="text-gray-600 mt-1">Gérez vos événements et réservations</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Créer un événement
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement créé</h3>
            <p className="text-gray-500 mb-4">Commencez par créer votre premier événement</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Créer un événement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-orange-400 to-amber-600">
                  {event.image ? (
                    <img src={event.image} alt={event.titre_event} className="w-full h-full object-cover" />
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
                    {event.description || 'Aucune description'}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                      {formatDate(event.date_debut)}
                    </div>

                    {event.adresse && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                        {event.adresse.ville}
                      </div>
                    )}

                    {event.tarif && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 text-orange-600" />
                        {event.tarif.prix - (event.tarif.promotion || 0)} MAD
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Créer un événement</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  required
                  value={formData.titre_event}
                  onChange={(e) => setFormData({ ...formData, titre_event: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de l'image
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de début
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date_debut}
                    onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de fin
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date_fin}
                    onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ville}
                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code postal
                  </label>
                  <input
                    type="text"
                    value={formData.code_postal}
                    onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={formData.adresse}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (MAD)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.prix}
                    onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promotion (MAD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.promotion}
                    onChange={(e) => setFormData({ ...formData, promotion: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50"
                >
                  {loading ? 'Création...' : 'Créer l\'événement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
