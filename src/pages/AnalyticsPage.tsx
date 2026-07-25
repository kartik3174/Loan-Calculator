import React, { useState } from 'react';
import {
  BENCHMARK_MODELS,
  FEATURE_IMPORTANCES,
  DATASET_SUMMARY
} from '../data/mlEngine';
import { ConfusionMatrixView } from '../components/ConfusionMatrixView';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  BrainCircuit,
  Layers,
  Award,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'f1_score' | 'cv_score' | 'roc_auc'>('accuracy');

  const pieData = [
    { name: 'Approved Loans (Y)', value: DATASET_SUMMARY.approved_count, color: '#10b981' },
    { name: 'Rejected Loans (N)', value: DATASET_SUMMARY.rejected_count, color: '#f43f5e' }
  ];

  const creditHistoryData = [
    { category: 'Good Credit (1.0)', rate: DATASET_SUMMARY.credit_history_approval_rate, color: '#10b981' },
    { category: 'Poor Credit (0.0)', rate: DATASET_SUMMARY.no_credit_history_approval_rate, color: '#f43f5e' }
  ];

  const propertyAreaChartData = [
    { area: 'Semiurban', approvalRate: DATASET_SUMMARY.semiurban_approval_rate },
    { area: 'Urban', approvalRate: DATASET_SUMMARY.urban_approval_rate },
    { area: 'Rural', approvalRate: DATASET_SUMMARY.rural_approval_rate }
  ];

  const sortedModels = [...BENCHMARK_MODELS].sort((a, b) => b[selectedMetric] - a[selectedMetric]);
  const bestModel = BENCHMARK_MODELS.find((m) => m.is_best) || BENCHMARK_MODELS[0];

  return (
    <div className="space-y-10 py-4">
      
      {/* Page Header */}
      <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Exploratory Data Analysis & Model Evaluation
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Dataset Analytics & Algorithm Benchmarks
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Evaluation metrics across 7 machine learning algorithms trained on the 614-row Loan Prediction Dataset.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold backdrop-blur-md">
          <Award className="w-4 h-4" />
          Best Model: {bestModel.name} ({bestModel.accuracy}%)
        </div>
      </div>

      {/* Dataset Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Total Records</span>
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
            {DATASET_SUMMARY.total_records}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Standard Loan Dataset</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Overall Approval Rate</span>
          <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {DATASET_SUMMARY.approval_rate}%
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">{DATASET_SUMMARY.approved_count} Approved / {DATASET_SUMMARY.rejected_count} Rejected</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Avg Household Income</span>
          <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 block">
            ${(DATASET_SUMMARY.avg_applicant_income + DATASET_SUMMARY.avg_coapplicant_income).toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">Applicant + Co-applicant</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Avg Loan Requested</span>
          <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">
            ${DATASET_SUMMARY.avg_loan_amount_k}k
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">${(DATASET_SUMMARY.avg_loan_amount_k * 1000).toLocaleString()}</span>
        </div>
      </div>

      {/* Row 1 Charts: Model Comparison & Loan Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: All 7 Algorithms Comparison */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                7 ML Algorithm Benchmark Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evaluation metrics on test split (80% train / 20% test, Random State = 42)
              </p>
            </div>

            {/* Metric Selector Pills */}
            <div className="flex items-center gap-1 bg-white/50 dark:bg-white/10 p-1 rounded-2xl backdrop-blur-md">
              {[
                { key: 'accuracy', label: 'Accuracy' },
                { key: 'f1_score', label: 'F1 Score' },
                { key: 'cv_score', label: 'Cross-Val' },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setSelectedMetric(m.key as any)}
                  className={`px-3 py-1 text-xs font-bold rounded-xl transition ${
                    selectedMetric === m.key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={sortedModels} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" domain={[60, 100]} unit="%" />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, selectedMetric.toUpperCase()]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey={selectedMetric} radius={[0, 6, 6, 0]}>
                  {sortedModels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.is_best ? '#2563eb' : '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 4 Cols: Loan Status Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Dataset Loan Status
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribution of Approved vs Rejected Applications
            </p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', fontSize: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Feature Importance & Credit History Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Feature Importance Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Feature Importance Ranking
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Relative predictive weight assigned by Gradient Boosting Classifier
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FEATURE_IMPORTANCES} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="feature" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
                <YAxis unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Importance Weight']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', fontSize: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar dataKey="percentage" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confusion Matrix & Credit History Impact */}
        <div className="lg:col-span-5 space-y-6">
          <ConfusionMatrixView data={bestModel.confusion_matrix} modelName={bestModel.name} />
        </div>
      </div>

      {/* Row 3: Demographic Approval Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Credit History Approval Rate */}
        <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Credit History vs Approval Rate
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Credit History (1.0 vs 0.0) is the #1 strongest single predictor
            </p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creditHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Approval Rate']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', fontSize: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                  {creditHistoryData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Area Approval Rates */}
        <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Approval Rate by Property Area
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Semiurban areas show significantly higher approval percentages
            </p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyAreaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="area" tick={{ fontSize: 11 }} />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Approval Rate']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', fontSize: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar dataKey="approvalRate" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
