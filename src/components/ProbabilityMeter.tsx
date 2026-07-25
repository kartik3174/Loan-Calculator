import React from 'react';

interface ProbabilityMeterProps {
  probability: number; // 0 to 100
  isApproved: boolean;
}

export const ProbabilityMeter: React.FC<ProbabilityMeterProps> = ({ probability, isApproved }) => {
  const percentage = Math.min(100, Math.max(0, probability));
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let colorClass = "stroke-emerald-500 text-emerald-600 dark:text-emerald-400";
  let bgGlow = "shadow-emerald-500/20";
  let statusText = "High Probability";

  if (!isApproved) {
    colorClass = "stroke-rose-500 text-rose-600 dark:text-rose-400";
    bgGlow = "shadow-rose-500/20";
    statusText = "High Rejection Risk";
  } else if (percentage < 65) {
    colorClass = "stroke-amber-500 text-amber-600 dark:text-amber-400";
    bgGlow = "shadow-amber-500/20";
    statusText = "Moderate / Borderline";
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`relative flex items-center justify-center w-48 h-48 rounded-full bg-white/40 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-2xl ${bgGlow}`}>
        <svg className="w-44 h-44 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            className="stroke-slate-200/80 dark:stroke-white/10"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Animated Progress circle */}
          <circle
            cx="88"
            cy="88"
            r={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {percentage}%
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
            Approval Odds
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${isApproved ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'}`}>
          {statusText}
        </span>
      </div>
    </div>
  );
};
