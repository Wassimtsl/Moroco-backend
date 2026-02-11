import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import MyEvents from './pages/MyEvents';

function Router() {
  const { user, loading } = useAuth();
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="/"]');

    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href) {
        window.history.pushState({}, '', href);
        setPath(href);
      }
    };

    links.forEach(link => {
      link.addEventListener('click', handleClick);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleClick);
      });
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user && path !== '/register') {
    return <Login />;
  }

  if (!user && path === '/register') {
    return <Register />;
  }

  if (path === '/login' && user) {
    window.history.pushState({}, '', '/dashboard');
    setPath('/dashboard');
  }

  if (path === '/register' && user) {
    window.history.pushState({}, '', '/dashboard');
    setPath('/dashboard');
  }

  if (path === '/' || path === '/login') {
    return <Dashboard />;
  }

  if (path === '/register') {
    return <Register />;
  }

  if (path === '/dashboard') {
    return <Dashboard />;
  }

  if (path === '/events') {
    return <Events />;
  }

  if (path === '/my-events') {
    return <MyEvents />;
  }

  if (path.startsWith('/event/')) {
    const eventId = path.split('/event/')[1];
    return <EventDetail eventId={eventId} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page non trouvée</h1>
        <a href="/dashboard" className="text-orange-600 hover:text-orange-700">
          Retour au dashboard
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
