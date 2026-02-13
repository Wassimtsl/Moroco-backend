// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo / Nom du site */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Morocco Events
        </Link>

        {/* Liens de navigation */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Accueil
          </Link>
          <Link to="/evenements" className="text-gray-700 hover:text-blue-600">
            Événements
          </Link>

          {/* Si connecté */}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Tableau de bord
              </Link>

              {/* Lien Admin visible uniquement pour les ADMIN */}
              {hasRole('ROLE_ADMIN') && (
                <Link to="/admin" className="text-red-600 hover:text-red-800 font-semibold">
                  Admin
                </Link>
              )}

              <Link to="/mes-reservations" className="text-gray-700 hover:text-blue-600">
                Mes réservations
              </Link>

              <span className="text-sm text-gray-500">
                {user?.sub}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Connexion
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}