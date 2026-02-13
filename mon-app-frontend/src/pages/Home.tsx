import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Découvrez le Maroc
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explorez les meilleurs événements culturels, festivals et activités
          touristiques à travers tout le Maroc.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/evenements"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Voir les événements
          </Link>
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50"
          >
            S'inscrire
          </Link>
        </div>
      </section>

      {/* Section fonctionnalités */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nos services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Événements"
            description="Parcourez des centaines d'événements culturels et touristiques."
            icon="📅"
          />
          <FeatureCard
            title="Réservation"
            description="Réservez vos places en quelques clics, simplement et rapidement."
            icon="🎫"
          />
          <FeatureCard
            title="Guides"
            description="Trouvez un guide local disponible pour enrichir votre expérience."
            icon="🧭"
          />
        </div>
      </section>
    </div>
  );
}

// Sous-composant réutilisable (dans le même fichier pour simplifier)
function FeatureCard({ title, description, icon }: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}