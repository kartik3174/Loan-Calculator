import React from 'react';
import { HistoryItem } from '../types';
import { History, X, Trash2, CheckCircle, AlertOctagon, ArrowUpRight } from 'lucide-react';

interface PredictionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
}

export const PredictionHistoryModal: React.FC<PredictionHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectHistoryItem
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Prediction History ({history.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Saved local evaluations and model inference logs
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                No past prediction logs found.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Evaluations submitted on the Prediction page will be saved here automatically.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistoryItem(item);
                  onClose();
                }}
                className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${item.is_approved ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                    {item.is_approved ? <CheckCircle className="w-5 h-5" /> : <AlertOctagon className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">
                        {item.applicant_name}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.is_approved ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                        {item.prediction} ({item.confidence_score}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Loan: ${item.inputs.loan_amount}k | Income: ${(item.inputs.applicant_income + item.inputs.coapplicant_income).toLocaleString()} | Credit: {item.inputs.credit_history === 1 ? 'Good (1.0)' : 'Poor (0.0)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
