import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  BrainCircuit,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Zap,
  FileSpreadsheet,
  PieChart,
  Cpu,
  Sparkles,
  Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Data Collection & EDA',
      desc: 'Standard 614-row Loan Prediction dataset analysis covering missing value handling and statistical distributions.',
      icon: FileSpreadsheet,
    },
    {
      step: '02',
      title: 'Preprocessing & Encoding',
      desc: 'One-Hot encoding for categorical variables, feature scaling, and Income-to-EMI feature engineering.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'Model Benchmarking',
      desc: 'Training & cross-evaluating 7 ML algorithms: Gradient Boosting, Random Forest, Logistic Regression, XGBoost, SVM, KNN, Decision Tree.',
      icon: BrainCircuit,
    },
    {
      step: '04',
      title: 'Evaluation & Selection',
      desc: 'Performance evaluation using Accuracy, Precision, Recall, F1 Score, ROC AUC, and Confusion Matrix to auto-select best model.',
      icon: BarChart3,
    },
    {
      step: '05',
      title: 'Real-time Inference API',
      desc: 'Sub-second REST API returning loan approval probability, key decision factors, and improvement suggestions.',
      icon: Zap,
    },
  ];

  const statCards = [
    { label: 'Dataset Records', value: '614', sub: 'Standard Loan Dataset' },
    { label: 'ML Algorithms Benchmarked', value: '7', sub: 'Multi-model Comparison' },
    { label: 'Best Model Accuracy', value: '84.55%', sub: 'Gradient Boosting Classifier' },
    { label: 'Inference Latency', value: '< 15 ms', sub: 'Sub-second REST Response' },
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-2xl text-slate-900 dark:text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-200/50 dark:border-white/15">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-white/10 border border-blue-400/30 dark:border-white/20 text-xs font-semibold text-blue-600 dark:text-blue-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            <span>Machine Learning Mini Project • College Final Year</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-slate-300">
            Intelligent Loan Approval Predictor
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Predict customer loan approval outcomes instantly using benchmarked Machine Learning models. Evaluate risk probability, debt-to-income metrics, key decision drivers, and tailored improvement recommendations.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              to="/predict"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition"
            >
              Start Loan Evaluation
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/analytics"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-800 dark:text-white bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-slate-200/80 dark:border-white/15 rounded-2xl backdrop-blur-md transition shadow-xs"
            >
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              View ML Model Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* Live Statistics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl hover:border-blue-500/40 transition"
          >
            <span className="text-2xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 block tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block mt-1">
              {stat.label}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
              {stat.sub}
            </span>
          </div>
        ))}
      </section>

      {/* Machine Learning Pipeline Architecture */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            End-to-End Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Machine Learning Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            From raw loan application dataset to real-time risk prediction REST API
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((ws) => {
            const Icon = ws.icon;
            return (
              <div
                key={ws.step}
                className="relative p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-lg hover:border-blue-500/30 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black text-slate-400 dark:text-slate-500">
                    {ws.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {ws.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {ws.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Key Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Project Highlights & Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              7 Benchmark ML Algorithms
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Trains and benchmarks Gradient Boosting, Random Forest, Logistic Regression, XGBoost, Support Vector Machine, KNN, and Decision Trees.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Explainable AI Decisions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Provides granular breakdown of key positive and negative risk factors (Credit History, Debt-to-Income EMI Ratio, Total Household Income).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Export PDF Reports & History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate formal 1-click PDF evaluation reports, save evaluation logs locally, and re-examine historical predictions anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-600/30 to-emerald-600/20 backdrop-blur-xl border border-blue-500/30 p-8 text-center space-y-4 text-slate-900 dark:text-white shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          Ready to Test a Loan Application?
        </h2>
        <p className="text-sm text-slate-600 dark:text-blue-200 max-w-xl mx-auto">
          Test with live inputs or load 1-click sample profiles for high-approval, high-risk, or self-employed applicants.
        </p>
        <Link
          to="/predict"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg shadow-blue-600/30 transition active:scale-95"
        >
          Open Loan Prediction Form
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
};
