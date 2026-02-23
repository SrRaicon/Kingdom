import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Coins, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/salon-fama', label: 'Salón de la Fama' },
    { path: '/clasificacion', label: 'Clasificación' },
    { path: '/tienda', label: 'Tienda' },
    { path: '/wiki', label: 'Wiki' },
    { path: '/noticias', label: 'Noticias' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-900 selection:text-amber-50">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Shield className="w-8 h-8 text-amber-500 group-hover:text-amber-400 transition-colors" />
            <h1 className="font-medieval text-2xl tracking-widest text-amber-50 uppercase hidden sm:block">
              Reino <span className="text-amber-500">Eterno</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wider uppercase">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  location.pathname === item.path
                    ? 'text-amber-400 border-b-2 border-amber-400 pb-1'
                    : 'text-zinc-400 hover:text-amber-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Status (Coins) */}
          <div className="hidden md:flex items-center gap-4 border border-zinc-800 bg-zinc-900/50 px-4 py-2 rounded-sm">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-amber-50 font-medium">1,250</span>
            </div>
            <div className="w-px h-4 bg-zinc-700"></div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider">Nivel 12</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-zinc-400 hover:text-amber-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-zinc-950 border-b border-zinc-800/50 py-4 px-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium tracking-wider uppercase py-2 ${
                  location.pathname === item.path
                    ? 'text-amber-400'
                    : 'text-zinc-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-800">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-amber-50 font-medium">1,250 Monedas</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 bg-zinc-950 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Shield className="w-8 h-8 text-zinc-700 mx-auto mb-6" />
          <p className="text-zinc-500 text-sm font-light">
            © {new Date().getFullYear()} Reino Eterno. Todos los derechos reservados.
          </p>
          <p className="text-zinc-600 text-xs mt-2 uppercase tracking-widest">
            Forjado en los fuegos del desarrollo web
          </p>
        </div>
      </footer>
    </div>
  );
}
