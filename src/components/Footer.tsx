import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Github, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                Loan<span className="text-blue-600 dark:text-blue-400">Predictor</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              An end-to-end Machine Learning web application predicting loan approval outcomes with explainable AI factor breakdowns and probability metrics.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-900 text-[11px] font-medium text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              College ML Project Ready
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/predict" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Loan Prediction Form
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  ML Analytics & Charts
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  About ML Pipeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['React 19', 'TypeScript', 'Tailwind CSS', 'Express', 'Flask', 'Scikit-Learn', 'Gradient Boosting', 'Recharts'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[11px] font-medium rounded-md bg-slate-200/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Project Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              ML Model Specs
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>Dataset: Loan Prediction (614 rows)</li>
              <li>Target: Loan_Status (Y/N)</li>
              <li>Best Model: Gradient Boosting</li>
              <li>Accuracy: 84.55% | ROC AUC: 0.812</li>
              <li>Random State: 42</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© 2026 Loan Approval Predictor | Final Year College Machine Learning Mini Project</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
              <Cpu className="w-3.5 h-3.5" />
              v1.0.0 Stable
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
