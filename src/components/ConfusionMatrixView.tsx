import React from 'react';

interface MatrixData {
  tp: number;
  fp: number;
  tn: number;
  fn: number;
}

interface ConfusionMatrixViewProps {
  data: MatrixData;
  modelName: string;
}

export const ConfusionMatrixView: React.FC<ConfusionMatrixViewProps> = ({ data, modelName }) => {
  const total = data.tp + data.fp + data.tn + data.fn;
  const accuracy = (((data.tp + data.tn) / total) * 100).toFixed(2);
  const precision = (((data.tp) / (data.tp + data.fp)) * 100).toFixed(2);
  const recall = (((data.tp) / (data.tp + data.fn)) * 100).toFixed(2);

  return (
    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/60 dark:border-white/10 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Confusion Matrix ({modelName})
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Out-of-fold test set classification matrix
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-md">
          N = {total} Test Cases
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* True Positive */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center backdrop-blur-md shadow-[0_0_15px_rgba(52,211,153,0.15)]">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
            True Positive (Approved)
          </span>
          <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
            {data.tp}
          </span>
          <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 block mt-0.5">
            Correctly Approved
          </span>
        </div>

        {/* False Positive */}
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-center backdrop-blur-md shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
            False Positive (Type I Error)
          </span>
          <span className="text-2xl font-black text-rose-700 dark:text-rose-300">
            {data.fp}
          </span>
          <span className="text-[10px] text-rose-600/80 dark:text-rose-400/80 block mt-0.5">
            Incorrectly Approved
          </span>
        </div>

        {/* False Negative */}
        <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-center backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
            False Negative (Type II Error)
          </span>
          <span className="text-2xl font-black text-amber-700 dark:text-amber-300">
            {data.fn}
          </span>
          <span className="text-[10px] text-amber-600/80 dark:text-amber-400/80 block mt-0.5">
            Incorrectly Rejected
          </span>
        </div>

        {/* True Negative */}
        <div className="p-3.5 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-center backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            True Negative (Rejected)
          </span>
          <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
            {data.tn}
          </span>
          <span className="text-[10px] text-indigo-600/80 dark:text-indigo-400/80 block mt-0.5">
            Correctly Rejected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-slate-200/80 dark:border-white/10">
        <div>
          <span className="text-slate-500 dark:text-slate-400 block">Accuracy</span>
          <span className="font-extrabold text-slate-900 dark:text-white">{accuracy}%</span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400 block">Precision</span>
          <span className="font-extrabold text-slate-900 dark:text-white">{precision}%</span>
        </div>
        <div>
          <span className="text-slate-500 dark:text-slate-400 block">Recall</span>
          <span className="font-extrabold text-slate-900 dark:text-white">{recall}%</span>
        </div>
      </div>
    </div>
  );
};
