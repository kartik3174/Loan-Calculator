import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md w-full space-y-6 p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-2xl">
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 backdrop-blur-md w-fit mx-auto shadow-[0_0_20px_rgba(244,63,94,0.15)]">
          <AlertCircle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            404 - Page Not Found
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The requested application view or analytical dashboard route does not exist.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg shadow-blue-600/25 transition active:scale-95"
        >
          <Home className="w-4 h-4" />
          Back to Home Dashboard
        </Link>
      </div>
    </div>
  );
};
