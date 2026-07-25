import React from 'react';
import {
  BrainCircuit,
  FileSpreadsheet,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Github,
  Server,
  Code2,
  BookOpen
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const algorithmsList = [
    {
      name: 'Gradient Boosting Classifier',
      accuracy: '84.55%',
      f1: '89.11%',
      desc: 'Builds sequential decision trees sequentially to minimize residual errors. Auto-selected as the top model.'
    },
    {
      name: 'Random Forest Classifier',
      accuracy: '83.74%',
      f1: '88.42%',
      desc: 'Ensemble of randomized decision trees using bagging to reduce variance and handle non-linear features.'
    },
    {
      name: 'Logistic Regression',
      accuracy: '82.93%',
      f1: '88.33%',
      desc: 'Linear baseline classification model applying a sigmoid function to evaluate log-odds probability.'
    },
    {
      name: 'XGBoost (Extreme Gradient Boosting)',
      accuracy: '82.11%',
      f1: '87.04%',
      desc: 'Optimized distributed gradient boosting framework designed for computational efficiency and regularization.'
    },
    {
      name: 'Support Vector Machine (SVM)',
      accuracy: '81.30%',
      f1: '87.14%',
      desc: 'Finds the optimal hyper-plane maximizing the margin between approved and rejected application vectors.'
    },
    {
      name: 'K-Nearest Neighbors (KNN)',
      accuracy: '74.80%',
      f1: '82.22%',
      desc: 'Non-parametric instance-based algorithm classifying loans based on feature space proximity.'
    },
    {
      name: 'Decision Tree Classifier',
      accuracy: '71.54%',
      f1: '79.55%',
      desc: 'Hierarchical rule-based tree splitting applicants based on Information Gain and Gini Impurity.'
    }
  ];

  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      
      {/* Page Title */}
      <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <BookOpen className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Project Specs & Documentation
          </span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          About Loan Approval Predictor
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Comprehensive documentation for college final year machine learning mini project.
        </p>
      </div>

      {/* Project Overview Card */}
      <section className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Project Objective & Overview
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>Loan Approval Predictor</strong> is an end-to-end intelligent machine learning web application that automates financial loan underwriting decisions. Banks and credit institutions evaluate thousands of loan applications daily. Manual credit evaluation can be slow, prone to human bias, and inconsistent. By deploying benchmarked machine learning models, this system provides sub-second predictions, confidence probabilities, and transparent decision factors.
        </p>
      </section>

      {/* Dataset Description */}
      <section className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Dataset Architecture (Loan Prediction Dataset)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The model is trained on the standard 614-row Kaggle Loan Prediction Dataset containing 13 primary attributes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            <span className="font-bold text-slate-900 dark:text-white block">Loan_ID</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Unique Loan Identification Key</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            <span className="font-bold text-slate-900 dark:text-white block">Gender & Married</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Demographic & Marital status</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            <span className="font-bold text-slate-900 dark:text-white block">Dependents & Education</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Family size & Qualification</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            <span className="font-bold text-slate-900 dark:text-white block">Applicant & Coapplicant Income</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Monthly income in USD ($)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            <span className="font-bold text-slate-900 dark:text-white block">LoanAmount & Term</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Requested amount ($k) & Months</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            <span className="font-bold text-slate-900 dark:text-white block">Credit_History & Target</span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Bureau rating (1/0) & Target (Y/N)</span>
          </div>
        </div>
      </section>

      {/* ML Algorithms Table */}
      <section className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Evaluated Machine Learning Algorithms
        </h2>

        <div className="space-y-3">
          {algorithmsList.map((algo, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {algo.name}
                  </span>
                  {idx === 0 && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                      Best Model (84.55%)
                    </span>
                  )}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  {algo.desc}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] block">Accuracy</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{algo.accuracy}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] block">F1 Score</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{algo.f1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Summary */}
      <section className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Full-Stack Technology Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white">Frontend UI</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              React 19, Vite, TypeScript, Tailwind CSS v4, Recharts for analytics, Lucide React icons, and jsPDF report generation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white">Backend REST API</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Express.js full-stack container on Port 3000 + Python Flask API (`backend/app.py`) for Render deployment.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 backdrop-blur-md space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white">Machine Learning Pipeline</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Python 3.10, Scikit-Learn, Pandas, NumPy, Joblib, Matplotlib, Seaborn, and XGBoost.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
