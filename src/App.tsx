import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PredictionPage } from './pages/PredictionPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PredictionHistoryModal } from './components/PredictionHistoryModal';
import { HistoryItem } from './types';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('loan_theme');
    return saved ? saved === 'dark' : true; // Default dark theme
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('loan_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('loan_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('loan_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('loan_history', JSON.stringify(history));
  }, [history]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSavePrediction = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev.filter((h) => h.id !== item.id)].slice(0, 50));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('loan_history');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-900 dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
        
        {/* Background Mesh Gradients for Frosted Glass Theme */}
        <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/25 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-emerald-500/15 dark:bg-emerald-600/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="fixed top-[35%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none z-0"></div>

        {/* Navigation Bar */}
        <Navbar
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          historyCount={history.length}
          onOpenHistory={() => setIsHistoryOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/predict"
              element={<PredictionPage onSavePrediction={handleSavePrediction} />}
            />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* History Modal */}
        <PredictionHistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onClearHistory={handleClearHistory}
          onSelectHistoryItem={() => {}}
        />

      </div>
    </Router>
  );
}
