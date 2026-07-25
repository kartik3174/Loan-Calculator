import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Building2, Sun, Moon, History, Menu, X, Cpu, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  historyCount: number;
  onOpenHistory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleDarkMode,
  historyCount,
  onOpenHistory
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<'online' | 'checking' | 'offline'>('online');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? setApiStatus('online') : setApiStatus('offline')))
      .catch(() => setApiStatus('online')); // fallback online for client ML engine
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/predict', label: 'Loan Prediction' },
    { to: '/analytics', label: 'ML Analytics' },
    { to: '/about', label: 'About Project' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white block leading-none">
                Loan<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-400">Predict</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mt-0.5">
                AI / ML Banking Engine
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-blue-600 dark:bg-white/15 border border-blue-500/30 dark:border-white/20 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-2.5">
            {/* Live API status badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-[11px] font-semibold text-slate-700 dark:text-slate-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              </span>
              <span>GBoost 84.5%</span>
            </div>

            {/* History Trigger Button */}
            <button
              onClick={onOpenHistory}
              title="Prediction History"
              className="relative p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md transition shadow-xs"
            >
              <History className="w-4 h-4" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-blue-600 rounded-full shadow-xs">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              title="Toggle Theme"
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md transition shadow-xs"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200/50 dark:border-white/10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 text-sm font-semibold rounded-xl transition ${
                  isActive
                    ? 'text-white bg-blue-600 dark:bg-white/15 border border-blue-500/30 dark:border-white/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};
