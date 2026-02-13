// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import MesReservations from './pages/MesReservations';
import Guides from './pages/Guides';
import { ProtectedRoute } from './components/ProtectedRoute';
import Evenements from './pages/Evenements';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout englobant avec Navbar */}
        <Route element={<Layout />}>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/evenements" element={<Evenements />} />

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
          <Route
            path="/mes-reservations"
            element={
              <ProtectedRoute>
                <MesReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides"
            element={
              <ProtectedRoute>
                <Guides />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}