# TPs React/TypeScript — Application Morocco Events

## Architecture du projet

```
mon-app-frontend/
├── src/
│   ├── components/     ← Composants réutilisables (Navbar, ProtectedRoute, Cards...)
│   ├── pages/          ← Pages complètes (Home, Login, Register, Dashboard...)
│   ├── hooks/          ← Hooks personnalisés (useAuth, useEvenements...)
│   ├── services/       ← Appels API (auth.service, evenement.service...)
│   ├── types/          ← Interfaces TypeScript
│   ├── config/         ← Constantes et configuration
│   ├── utils/          ← Utilitaires (httpClient axios)
│   ├── App.tsx         ← Routes principales
│   └── main.tsx        ← Point d'entrée
```

## Endpoints Backend disponibles

| Méthode | URL | Accès | Description |
|---------|-----|-------|-------------|
| POST | `/auth/login` | Public | Connexion |
| POST | `/auth/register` | Public | Inscription |
| GET | `/api/users` | Authentifié | Liste des utilisateurs |
| GET | `/api/users/{id}` | Authentifié | Détail utilisateur |
| GET | `/api/users/me` | Authentifié | Utilisateur connecté |
| GET | `/api/users/guides` | Authentifié | Liste des guides |
| GET | `/api/users/guides/disponibles` | Authentifié | Guides disponibles |
| GET | `/api/evenements` | Authentifié | Liste événements |
| GET | `/api/evenements/{id}` | Authentifié | Détail événement |
| POST | `/api/evenements` | Authentifié | Créer événement |
| PUT | `/api/evenements/{id}` | Authentifié | Modifier événement |
| DELETE | `/api/evenements/{id}` | Authentifié | Supprimer événement |
| GET | `/api/evenements/entre-dates` | Public | Événements entre 2 dates |
| GET | `/api/reservations` | Authentifié | Liste réservations |
| POST | `/api/reservations` | TOURISTE/ADMIN | Créer réservation |
| GET | `/api/reservations/user/{userId}` | Authentifié | Réservations d'un user |
| GET | `/api/reservations/evenement/{id}` | Authentifié | Réservations d'un event |
| PATCH | `/api/reservations/{id}/confirmer` | Authentifié | Confirmer réservation |
| PATCH | `/api/reservations/{id}/annuler` | Authentifié | Annuler réservation |

## Rôles existants

| ID | Nom | Description |
|----|-----|-------------|
| 1 | ADMIN | Administrateur — gère tout |
| 2 | GUIDE | Guide touristique |
| 3 | TOURISTE | Utilisateur standard (par défaut à l'inscription) |

---

# TP1 — Page d'accueil et Navigation

## Objectif
Créer une page d'accueil publique avec une barre de navigation (Navbar) et configurer le routing React.

## Définitions

- **Composant React** : Fonction qui retourne du JSX (HTML dans JavaScript). C'est la brique de base de React.
- **Props** : Paramètres passés à un composant par son parent (lecture seule).
- **React Router** : Bibliothèque qui gère la navigation entre pages sans recharger le navigateur (SPA).
- **`<Link>`** : Composant React Router qui remplace `<a href>` pour naviguer sans rechargement.
- **`<Outlet>`** : Composant qui affiche le contenu de la route enfant active.

## Étape 1 — Créer le composant Navbar

Créer le fichier `src/components/Navbar.tsx` :

```tsx
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
```

### Explication
- On importe `useAuth` pour savoir si l'utilisateur est connecté
- `hasRole('ROLE_ADMIN')` affiche le lien Admin uniquement pour les administrateurs
- `isAuthenticated` contrôle l'affichage connexion/déconnexion

## Étape 2 — Créer la page Home

Créer le fichier `src/pages/Home.tsx` :

```tsx
// src/pages/Home.tsx
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
```

## Étape 3 — Créer un Layout avec Navbar

Créer le fichier `src/components/Layout.tsx` :

```tsx
// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

### Définition : Outlet
`<Outlet />` est un composant de React Router. Il affiche automatiquement le contenu
de la route enfant active. C'est comme un "trou" dans le layout où le contenu change
selon l'URL.

## Étape 4 — Mettre à jour App.tsx avec le Layout

Modifier `src/App.tsx` :

```tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout englobant avec Navbar */}
        <Route element={<Layout />}>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes protégées */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Ce qui a changé
- Toutes les routes sont **enfants** de `<Route element={<Layout />}>` → la Navbar s'affiche sur toutes les pages
- `<Outlet />` dans Layout affiche le contenu de la route active

## Résultat attendu TP1
- Page d'accueil avec hero section et cartes de fonctionnalités
- Navbar visible sur toutes les pages
- Liens de navigation fonctionnels
- Affichage conditionnel (connecté / non connecté / admin)

---

# TP2 — Authentification (Login / Register)

## Objectif
Comprendre les hooks personnalisés et intégrer les pages Login et Register existantes.

## Définitions

- **Hook** : Fonction React commençant par `use` qui permet d'ajouter de la logique (état, effets, etc.) à un composant.
- **useState** : Hook qui crée une variable d'état. Quand elle change, le composant se re-rend.
- **useCallback** : Hook qui mémorise une fonction pour éviter de la recréer à chaque rendu.
- **useEffect** : Hook qui exécute du code après le rendu (appels API, timers, etc.).
- **Hook personnalisé** : Fonction `use___()` que VOUS créez pour regrouper de la logique réutilisable.
- **JWT (JSON Web Token)** : Jeton d'authentification envoyé par le backend après login. Contient l'email et les rôles de l'utilisateur.

## Étape 1 — Comprendre le hook useAuth

Le fichier `src/hooks/useAuth.ts` est un **hook personnalisé**. Voici comment il fonctionne :

```
useAuth()
  ├── État : user, isAuthenticated, isLoading, error
  ├── login(email, password)    → appelle authService.login() → stocke le JWT
  ├── register(data)            → appelle authService.register() → auto-login
  ├── logout()                  → supprime le JWT du localStorage
  ├── hasRole(role)             → vérifie si l'utilisateur a un rôle
  └── clearError()              → efface les erreurs
```

### Comment ça marche ?
1. Au chargement, `useAuth` vérifie si un token JWT existe dans `localStorage`
2. Si oui, il décode le token pour extraire `sub` (email) et `roles`
3. Si le token est expiré, il déconnecte l'utilisateur
4. Les composants appellent `login()`, `register()`, `logout()` selon les besoins

## Étape 2 — Comprendre le flux Login

```
Utilisateur tape email + mot de passe
        ↓
Login.tsx appelle useAuth().login(email, password)
        ↓
useAuth appelle authService.login(email, password)
        ↓
authService envoie POST /auth/login au backend via httpClient (axios)
        ↓
Backend vérifie les identifiants, génère un JWT
        ↓
authService stocke le JWT dans localStorage
        ↓
useAuth met à jour l'état (user, isAuthenticated = true)
        ↓
Login.tsx redirige vers /dashboard
```

## Étape 3 — Comprendre le flux Register

```
Utilisateur remplit le formulaire
        ↓
Register.tsx appelle useAuth().register({ nom, prenom, email, password })
        ↓
useAuth appelle authService.register(data)
        ↓
authService envoie POST /auth/register (le backend assigne le rôle TOURISTE)
        ↓
useAuth appelle automatiquement login(email, password)
        ↓
L'utilisateur est connecté et redirigé vers /dashboard
```

## Étape 4 — Exercice : Ajouter un message de bienvenue après login

Dans `src/pages/Dashboard.tsx`, ajouter l'affichage du nom de l'utilisateur connecté.

**Indice** : Utiliser le hook `useAuth()` pour récupérer `user.sub` (l'email).

```tsx
const { user } = useAuth();

// Dans le JSX :
<h1>Bienvenue, {user?.sub}</h1>
```

## Résultat attendu TP2
- Comprendre le flux complet d'authentification
- Savoir lire et utiliser un hook personnalisé
- Login → redirection vers Dashboard
- Register → auto-login → Dashboard
- Navbar affiche le bon état (connecté/déconnecté)

---

# TP3 — Liste des événements publics

## Objectif
Créer un hook personnalisé `useEvenements`, un service API, et une page qui affiche les événements.

## Définitions

- **Service API** : Classe/objet qui regroupe tous les appels HTTP vers un endpoint du backend.
- **useEffect** : Exécute du code après le rendu. Utilisé ici pour charger les données au montage du composant.
- **Dépendances de useEffect** : Le tableau `[]` à la fin. Si vide = exécuté une seule fois au montage.
- **État de chargement** : Pattern `{ data, isLoading, error }` pour gérer les 3 états d'un appel API.

## Étape 1 — Créer le type TypeScript

Créer `src/types/evenement.types.ts` :

```ts
// src/types/evenement.types.ts

export interface Evenement {
  id?: number;
  titreEvent: string;
  description: string;
  image: string;
  dateDebut: string;     // ISO 8601 : "2025-06-15T10:00:00"
  dateFin: string;
  typeEvenementId?: number;
  tarifId?: number;
  adresseId?: number;
  userId?: number;
}
```

### Pourquoi des types ?
TypeScript vérifie à la compilation que vos données ont la bonne forme.
Si le backend renvoie un champ `titreEvent` et que vous tapez `titre`, TypeScript vous prévient immédiatement.

## Étape 2 — Créer le service API

Créer `src/services/evenement.service.ts` :

```ts
// src/services/evenement.service.ts
import httpClient from '../utils/httpClient';
import type { Evenement } from '../types/evenement.types';

const BASE_URL = '/api/evenements';

export const evenementService = {

  // GET /api/evenements — Liste tous les événements
  async getAll(): Promise<Evenement[]> {
    const response = await httpClient.get<Evenement[]>(BASE_URL);
    return response.data;
  },

  // GET /api/evenements/:id — Détail d'un événement
  async getById(id: number): Promise<Evenement> {
    const response = await httpClient.get<Evenement>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // POST /api/evenements — Créer un événement
  async create(data: Evenement): Promise<Evenement> {
    const response = await httpClient.post<Evenement>(BASE_URL, data);
    return response.data;
  },

  // PUT /api/evenements/:id — Modifier un événement
  async update(id: number, data: Evenement): Promise<Evenement> {
    const response = await httpClient.put<Evenement>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // DELETE /api/evenements/:id — Supprimer un événement
  async delete(id: number): Promise<void> {
    await httpClient.delete(`${BASE_URL}/${id}`);
  },

  // GET /api/evenements/entre-dates?debut=...&fin=... — Filtrer par dates
  async getEntreDates(debut: string, fin: string): Promise<Evenement[]> {
    const response = await httpClient.get<Evenement[]>(`${BASE_URL}/entre-dates`, {
      params: { debut, fin }
    });
    return response.data;
  },
};
```

## Étape 3 — Créer le hook personnalisé useEvenements

Créer `src/hooks/useEvenements.ts` :

```ts
// src/hooks/useEvenements.ts
import { useState, useEffect, useCallback } from 'react';
import { evenementService } from '../services/evenement.service';
import type { Evenement } from '../types/evenement.types';

export function useEvenements() {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger tous les événements
  const loadEvenements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await evenementService.getAll();
      setEvenements(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Supprimer un événement
  const deleteEvenement = useCallback(async (id: number) => {
    try {
      await evenementService.delete(id);
      setEvenements(prev => prev.filter(e => e.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de suppression');
    }
  }, []);

  // Créer un événement
  const createEvenement = useCallback(async (data: Evenement) => {
    try {
      const created = await evenementService.create(data);
      setEvenements(prev => [...prev, created]);
      return created;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de création');
      throw e;
    }
  }, []);

  // Modifier un événement
  const updateEvenement = useCallback(async (id: number, data: Evenement) => {
    try {
      const updated = await evenementService.update(id, data);
      setEvenements(prev => prev.map(e => e.id === id ? updated : e));
      return updated;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de modification');
      throw e;
    }
  }, []);

  // Charger au montage du composant
  useEffect(() => {
    loadEvenements();
  }, [loadEvenements]);

  return {
    evenements,
    isLoading,
    error,
    loadEvenements,
    deleteEvenement,
    createEvenement,
    updateEvenement,
  };
}
```

### Anatomie du hook personnalisé
```
useEvenements()
  ├── État interne : evenements[], isLoading, error
  ├── loadEvenements()    → GET /api/evenements
  ├── createEvenement()   → POST /api/evenements
  ├── updateEvenement()   → PUT /api/evenements/:id
  ├── deleteEvenement()   → DELETE /api/evenements/:id
  └── useEffect           → appelle loadEvenements() au montage
```

## Étape 4 — Créer le composant EventCard

Créer `src/components/EventCard.tsx` :

```tsx
// src/components/EventCard.tsx

import type { Evenement } from '../types/evenement.types';

interface EventCardProps {
  evenement: Evenement;
  onDelete?: (id: number) => void;  // Optionnel : bouton supprimer
  showActions?: boolean;             // Afficher les actions admin ?
}

export default function EventCard({ evenement, onDelete, showActions = false }: EventCardProps) {

  // Formater la date pour l'affichage
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      {evenement.image && (
        <img
          src={evenement.image}
          alt={evenement.titreEvent}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {evenement.titreEvent}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {evenement.description}
        </p>

        {/* Dates */}
        <div className="text-sm text-gray-500 space-y-1 mb-4">
          <p>📅 Début : {formatDate(evenement.dateDebut)}</p>
          <p>📅 Fin : {formatDate(evenement.dateFin)}</p>
        </div>

        {/* Actions admin */}
        {showActions && onDelete && evenement.id && (
          <div className="flex gap-2">
            <button
              onClick={() => onDelete(evenement.id!)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Étape 5 — Créer la page Événements

Créer `src/pages/Evenements.tsx` :

```tsx
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
```

## Étape 6 — Ajouter la route dans App.tsx

Ajouter dans `App.tsx` :

```tsx
import Evenements from './pages/Evenements';

// Dans les Routes, à l'intérieur du Layout :
<Route path="/evenements" element={<Evenements />} />
```

## Résultat attendu TP3
- Page `/evenements` affichant les événements en grille
- Gestion des états : chargement, erreur, liste vide
- Composant `EventCard` réutilisable
- Hook `useEvenements` réutilisable dans d'autres pages

---

# TP4 — Dashboard Admin (CRUD Événements)

## Objectif
Créer un tableau de bord administrateur pour créer, voir et supprimer des événements.

## Définitions

- **CRUD** : Create, Read, Update, Delete — les 4 opérations de base sur des données.
- **Formulaire contrôlé** : Formulaire React où chaque champ est lié à un `useState`. React contrôle la valeur.
- **Modale** : Fenêtre qui s'affiche par-dessus la page (pour un formulaire de création par exemple).
- **Confirmation** : Toujours demander confirmation avant une suppression.

## Étape 1 — Créer le formulaire de création d'événement

Créer `src/components/EventForm.tsx` :

```tsx
// src/components/EventForm.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Evenement } from '../types/evenement.types';

interface EventFormProps {
  onSubmit: (data: Evenement) => Promise<void>;
  onCancel: () => void;
  initialData?: Evenement;  // Pour la modification (optionnel)
}

export default function EventForm({ onSubmit, onCancel, initialData }: EventFormProps) {
  const [titreEvent, setTitreEvent] = useState(initialData?.titreEvent || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [dateDebut, setDateDebut] = useState(initialData?.dateDebut || '');
  const [dateFin, setDateFin] = useState(initialData?.dateFin || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!titreEvent.trim() || !description.trim() || !dateDebut || !dateFin) {
      setError('Tous les champs obligatoires doivent être remplis');
      return;
    }

    if (new Date(dateFin) <= new Date(dateDebut)) {
      setError('La date de fin doit être après la date de début');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ titreEvent, description, image, dateDebut, dateFin });
    } catch {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? 'Modifier' : 'Créer'} un événement
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre *
            </label>
            <input
              type="text"
              value={titreEvent}
              onChange={(e) => setTitreEvent(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Nom de l'événement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Description de l'événement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL de l'image
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date début *
              </label>
              <input
                type="datetime-local"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date fin *
              </label>
              <input
                type="datetime-local"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

## Étape 2 — Créer la page Admin complète

Remplacer `src/pages/Admin.tsx` :

```tsx
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
```

## Étape 3 — Rendre la liste des événements publique

Modifier `SecurityConfig.java` côté backend pour permettre le GET public :

Le GET `/api/evenements` doit être accessible publiquement pour la page d'accueil.
Ajouter dans `SecurityConfig.java` :

```java
.requestMatchers(HttpMethod.GET, "/api/evenements").permitAll()
.requestMatchers(HttpMethod.GET, "/api/evenements/{id}").permitAll()
```

## Résultat attendu TP4
- Page Admin avec liste des événements + bouton "Nouvel événement"
- Modale de création avec formulaire validé
- Suppression avec confirmation
- Composants réutilisables (EventCard, EventForm)

---

# TP5 — Système de réservations (Touriste)

## Objectif
Permettre aux touristes de réserver des places pour un événement, voir leurs réservations et les annuler.

## Définitions

- **Réservation** : Lien entre un utilisateur et un événement, avec un nombre de personnes et un statut.
- **Statut de réservation** : EN_ATTENTE → CONFIRMEE ou ANNULEE.
- **PATCH** : Méthode HTTP pour une modification partielle (ex: changer uniquement le statut).

## Étape 1 — Créer le type TypeScript

Créer `src/types/reservation.types.ts` :

```ts
// src/types/reservation.types.ts

export interface Reservation {
  id?: number;
  eventId: number;
  userId: number;
  statutId: number;
  nombrePersonne: number;
  dateReservation?: string;
  dateAnnulation?: string;
  // Champs enrichis (lecture seule)
  evenementTitre?: string;
  statutLibelle?: string;
  statutCode?: string;
  nomTouriste?: string;
}
```

## Étape 2 — Créer le service API

Créer `src/services/reservation.service.ts` :

```ts
// src/services/reservation.service.ts
import httpClient from '../utils/httpClient';
import type { Reservation } from '../types/reservation.types';

const BASE_URL = '/api/reservations';

export const reservationService = {

  async getAll(): Promise<Reservation[]> {
    const response = await httpClient.get<Reservation[]>(BASE_URL);
    return response.data;
  },

  async getByUser(userId: number): Promise<Reservation[]> {
    const response = await httpClient.get<Reservation[]>(`${BASE_URL}/user/${userId}`);
    return response.data;
  },

  async getByEvenement(eventId: number): Promise<Reservation[]> {
    const response = await httpClient.get<Reservation[]>(`${BASE_URL}/evenement/${eventId}`);
    return response.data;
  },

  async create(data: Reservation): Promise<Reservation> {
    const response = await httpClient.post<Reservation>(BASE_URL, data);
    return response.data;
  },

  async confirmer(id: number): Promise<Reservation> {
    const response = await httpClient.patch<Reservation>(`${BASE_URL}/${id}/confirmer`);
    return response.data;
  },

  async annuler(id: number): Promise<Reservation> {
    const response = await httpClient.patch<Reservation>(`${BASE_URL}/${id}/annuler`);
    return response.data;
  },
};
```

## Étape 3 — Créer le hook useReservations

Créer `src/hooks/useReservations.ts` :

```ts
// src/hooks/useReservations.ts
import { useState, useEffect, useCallback } from 'react';
import { reservationService } from '../services/reservation.service';
import type { Reservation } from '../types/reservation.types';

export function useReservations(userId?: number) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = userId
        ? await reservationService.getByUser(userId)
        : await reservationService.getAll();
      setReservations(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const createReservation = useCallback(async (data: Reservation) => {
    const created = await reservationService.create(data);
    setReservations(prev => [...prev, created]);
    return created;
  }, []);

  const annulerReservation = useCallback(async (id: number) => {
    const updated = await reservationService.annuler(id);
    setReservations(prev => prev.map(r => r.id === id ? updated : r));
    return updated;
  }, []);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  return {
    reservations,
    isLoading,
    error,
    loadReservations,
    createReservation,
    annulerReservation,
  };
}
```

## Étape 4 — Ajouter un bouton "Réserver" sur EventCard

Modifier `src/components/EventCard.tsx` pour ajouter un bouton de réservation :

```tsx
// Ajouter dans les props :
interface EventCardProps {
  evenement: Evenement;
  onDelete?: (id: number) => void;
  onReserve?: (id: number) => void;  // NOUVEAU
  showActions?: boolean;
}

// Dans le JSX, ajouter :
{onReserve && evenement.id && (
  <button
    onClick={() => onReserve(evenement.id!)}
    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
  >
    Réserver
  </button>
)}
```

## Étape 5 — Créer la page Mes Réservations

Créer `src/pages/MesReservations.tsx` :

```tsx
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
```

## Étape 6 — Ajouter les routes

Dans `App.tsx`, ajouter :

```tsx
import MesReservations from './pages/MesReservations';

// Route protégée :
<Route
  path="/mes-reservations"
  element={
    <ProtectedRoute>
      <MesReservations />
    </ProtectedRoute>
  }
/>
```

Et dans la Navbar, ajouter le lien (dans la section `isAuthenticated`) :

```tsx
<Link to="/mes-reservations" className="text-gray-700 hover:text-blue-600">
  Mes réservations
</Link>
```

## Résultat attendu TP5
- Bouton "Réserver" sur chaque événement
- Page "Mes réservations" avec liste et bouton annuler
- Hook `useReservations` réutilisable
- Service `reservationService` complet

---

# TP6 — Gestion des guides

## Objectif
Afficher la liste des guides disponibles et permettre à l'admin de gérer leur disponibilité et tarif.

## Définitions

- **PATCH** : Modification partielle d'une ressource (ex: changer uniquement la disponibilité).
- **Filtrage côté client** : Filtrer les données déjà chargées en mémoire (sans appel API).

## Étape 1 — Créer le service API

Créer `src/services/guide.service.ts` :

```ts
// src/services/guide.service.ts
import httpClient from '../utils/httpClient';
import type { Utilisateur } from '../types/user.types';

const BASE_URL = '/api/users';

export const guideService = {

  async getAllGuides(): Promise<Utilisateur[]> {
    const response = await httpClient.get<Utilisateur[]>(`${BASE_URL}/guides`);
    return response.data;
  },

  async getGuidesDisponibles(): Promise<Utilisateur[]> {
    const response = await httpClient.get<Utilisateur[]>(`${BASE_URL}/guides/disponibles`);
    return response.data;
  },

  async updateDisponibilite(id: number, disponibilite: boolean): Promise<Utilisateur> {
    const response = await httpClient.patch<Utilisateur>(
      `${BASE_URL}/${id}/disponibilite?disponibilite=${disponibilite}`
    );
    return response.data;
  },

  async updateTarif(id: number, tarif: number): Promise<Utilisateur> {
    const response = await httpClient.patch<Utilisateur>(
      `${BASE_URL}/${id}/tarif?tarif=${tarif}`
    );
    return response.data;
  },
};
```

## Étape 2 — Créer la page Guides

Créer `src/pages/Guides.tsx` :

```tsx
// src/pages/Guides.tsx
import { useState, useEffect } from 'react';
import { guideService } from '../services/guide.service';
import type { Utilisateur } from '../types/user.types';

export default function Guides() {
  const [guides, setGuides] = useState<Utilisateur[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    guideService.getGuidesDisponibles()
      .then(setGuides)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p className="text-center py-12">Chargement...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Guides disponibles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div key={guide.id} className="bg-white rounded-xl shadow-md p-5">
            <h3 className="text-lg font-semibold">{guide.nom} {guide.prenom}</h3>
            <p className="text-gray-500 text-sm">{guide.email}</p>
          </div>
        ))}
      </div>

      {guides.length === 0 && (
        <p className="text-gray-500 text-center py-12">Aucun guide disponible.</p>
      )}
    </div>
  );
}
```

## Étape 3 — Ajouter la route

```tsx
import Guides from './pages/Guides';

// Route protégée :
<Route
  path="/guides"
  element={
    <ProtectedRoute>
      <Guides />
    </ProtectedRoute>
  }
/>
```

## Résultat attendu TP6
- Page listant les guides disponibles
- Service API pour les opérations sur les guides
- Compréhension des endpoints PATCH

---

# Récapitulatif des fonctionnalités

| Fonctionnalité | TP | Rôle | Endpoint backend |
|---|---|---|---|
| Page d'accueil | TP1 | Public | — |
| Navbar conditionnelle | TP1 | Tous | — |
| Login | TP2 | Public | POST `/auth/login` |
| Register | TP2 | Public | POST `/auth/register` |
| Liste événements | TP3 | Authentifié | GET `/api/evenements` |
| Créer événement | TP4 | Admin | POST `/api/evenements` |
| Supprimer événement | TP4 | Admin | DELETE `/api/evenements/{id}` |
| Réserver | TP5 | Touriste | POST `/api/reservations` |
| Mes réservations | TP5 | Touriste | GET `/api/reservations/user/{id}` |
| Annuler réservation | TP5 | Touriste | PATCH `/api/reservations/{id}/annuler` |
| Liste guides | TP6 | Authentifié | GET `/api/users/guides/disponibles` |

## Pattern récurrent dans chaque TP

```
1. Créer le TYPE TypeScript        → src/types/xxx.types.ts
2. Créer le SERVICE API            → src/services/xxx.service.ts
3. Créer le HOOK personnalisé      → src/hooks/useXxx.ts
4. Créer le(s) COMPOSANT(S)        → src/components/XxxCard.tsx
5. Créer la PAGE                   → src/pages/Xxx.tsx
6. Ajouter la ROUTE dans App.tsx
7. Ajouter le LIEN dans Navbar
```

Ce pattern est le même pour chaque fonctionnalité. Une fois maîtrisé, vous pouvez l'appliquer à n'importe quelle nouvelle fonctionnalité.
