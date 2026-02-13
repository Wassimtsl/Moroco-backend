// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import apiService from '../services/api';
import type { Utilisateur } from '../types/user.types';
export default function Dashboard() {
// États
const [users, setUsers] = useState<Utilisateur[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const { user, logout } = useAuth();
// Charger les utilisateurs au montage
useEffect(() => {
loadUsers();
}, []);
/**
   * Charger la liste des utilisateurs
   */
const loadUsers = async () => {
try {
setLoading(true);
setError('');
const data = await apiService.getAllUtilisateurs();
setUsers(data);
} catch (err: any) {
setError(err.message || 'Erreur lors du chargement des utilisateurs');
} finally {
setLoading(false);
}
};
/**
   * Supprimer un utilisateur
   */
const handleDelete = async (id: number) => {
if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
return;
}
try {
await apiService.deleteUtilisateur(id);
// Recharger la liste après suppression
loadUsers();
} catch (err: any) {
setError(err.message || 'Erreur lors de la suppression');
}
};
return (
<div className="min-h-screen bg-gray-100">
{/* Navigation */}
<nav className="bg-white shadow-sm">
<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
  <div>
  <h1 className="text-xl font-bold">Dashboard</h1>
  <p className="text-sm text-gray-600">
  Bienvenue, {user?.email} ({user?.roles?.join(', ')})
  </p>
  </div>
<button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
Déconnexion
</button>
</div>
</nav>
{/* Contenu principal */}
<main className="max-w-7xl mx-auto px-4 py-8">


{/* En-tête avec bouton */}
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold">Liste des utilisateurs</h2>
<button
            onClick={loadUsers}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
🔄
Actualiser
</button>
</div>
{/* Affichage des erreurs */}
{error && (
<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
{error}
</div>
)}
        
        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          /* Tableau des utilisateurs */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prénom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Aucun utilisateur trouvé
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {u.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {u.nom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {u.prenom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {u.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {u.role.nom}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}