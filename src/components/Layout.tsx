import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, LogOut, Menu, User, Settings, Home } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, profile, role, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user || !profile || !role) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const navigation = [
    { name: 'Accueil', href: '/dashboard', icon: Home },
    { name: 'Événements', href: '/events', icon: Calendar },
  ];

  if (role.libelle_role === 'Organisateur' || role.libelle_role === 'Admin') {
    navigation.push({ name: 'Mes Événements', href: '/my-events', icon: Settings });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">Morocco Guide</h1>

              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-orange-600 transition"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {profile.prenom} {profile.nom}
                    </p>
                    <p className="text-xs text-gray-500">{role.libelle_role}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 mb-3">
                <User className="w-8 h-8 text-gray-400" />
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-800">
                    {profile.prenom} {profile.nom}
                  </p>
                  <p className="text-sm text-gray-500">{role.libelle_role}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
