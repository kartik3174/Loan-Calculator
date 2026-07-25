import React, { useState } from 'react';
import { LoanInput, PredictionResult, HistoryItem } from '../types';
import { SAMPLE_PROFILES, SampleProfile } from '../data/sampleApplications';
import { predictLoanApproval } from '../data/mlEngine';
import { ProbabilityMeter } from '../components/ProbabilityMeter';
import { PdfExportModal } from '../components/PdfExportModal';
import {
  BrainCircuit,
  RotateCcw,
  Sparkles,
  CheckCircle,
  AlertOctagon,
  Download,
  DollarSign,
  User,
  Building,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  FileText
} from 'lucide-react';

interface PredictionPageProps {
  onSavePrediction: (item: HistoryItem) => void;
}

const DEFAULT_INPUT: LoanInput = {
  gender: 'Male',
  married: 'Yes',
  dependents: '1',
  education: 'Graduate',
  self_employed: 'No',
  applicant_income: 5849,
  coapplicant_income: 1508,
  loan_amount: 128,
  loan_amount_term: 360,
  credit_history: 1,
  property_area: 'Semiurban'
};

export const PredictionPage: React.FC<PredictionPageProps> = ({ onSavePrediction }) => {
  const [applicantName, setApplicantName] = useState<string>('David Miller');
  const [formData, setFormData] = useState<LoanInput>(DEFAULT_INPUT);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalStep, setEvalStep] = useState<string>('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoanInput, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLoadSample = (sample: SampleProfile) => {
    setApplicantName(sample.applicantName);
    setFormData(sample.input);
    setResult(null);
    setFormError(null);
  };

  const handleReset = () => {
    setFormData(DEFAULT_INPUT);
    setApplicantName('David Miller');
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic Validation
    if (!applicantName.trim()) {
      setFormError('Please enter the applicant name.');
      return;
    }
    if (formData.applicant_income <= 0) {
      setFormError('Applicant Income must be greater than $0.');
      return;
    }
    if (formData.loan_amount <= 0) {
      setFormError('Loan Amount must be greater than $0.');
      return;
    }

    setIsEvaluating(true);
    setEvalStep('Scaling & One-Hot encoding features...');

    await new Promise((r) => setTimeout(r, 250));
    setEvalStep('Executing Gradient Boosting Classifier...');

    await new Promise((r) => setTimeout(r, 250));
    setEvalStep('Calculating Debt-to-Income (DTI) & decision drivers...');

    await new Promise((r) => setTimeout(r, 200));

    try {
      // Call backend API with client fallback
      let resData: PredictionResult;
      try {
        const res = await fetch('/api/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ applicant_name: applicantName, ...formData })
        });
        if (res.ok) {
          resData = await res.json();
        } else {
          resData = predictLoanApproval(formData, applicantName);
        }
      } catch {
        resData = predictLoanApproval(formData, applicantName);
      }

      setResult(resData);

      // Save to prediction history
      const historyRecord: HistoryItem = {
        ...resData,
        id: `pred_${Date.now()}`,
        applicant_name: applicantName,
        inputs: formData,
        created_at: new Date().toISOString()
      };
      onSavePrediction(historyRecord);

    } catch (err: any) {
      setFormError('Error evaluating loan model. Please check inputs.');
    } finally {
      setIsEvaluating(false);
      setEvalStep('');
    }
  };

  return (
    <div className="space-y-8 py-4">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Loan Evaluation Engine
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Loan Application & Approval Predictor
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fill in applicant financial details or select a quick sample profile to compute ML approval probability.
          </p>
        </div>

        {/* Quick Sample Profile Loaders */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block w-full md:w-auto">
            Preset Profiles:
          </span>
          {SAMPLE_PROFILES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleLoadSample(sample)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white/80 dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/15 backdrop-blur-md transition shadow-xs"
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Loan Application Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-6">
            
            {formError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 backdrop-blur-md">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {formError}
              </div>
            )}

            {/* Applicant Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Applicant Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            {/* Section 1: Demographics */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 pb-1 border-b border-slate-200/80 dark:border-white/10">
                1. Personal & Demographics
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Married */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Marital Status
                  </label>
                  <select
                    value={formData.married}
                    onChange={(e) => handleInputChange('married', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                  >
                    <option value="Yes">Married (Yes)</option>
                    <option value="No">Single (No)</option>
                  </select>
                </div>

                {/* Dependents */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Dependents
                  </label>
                  <select
                    value={formData.dependents}
                    onChange={(e) => handleInputChange('dependents', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                  >
                    <option value="0">0 Dependents</option>
                    <option value="1">1 Dependent</option>
                    <option value="2">2 Dependents</option>
                    <option value="3+">3+ Dependents</option>
                  </select>
                </div>

                {/* Education */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Education
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                  >
                    <option value="Graduate">Graduate</option>
                    <option value="Not Graduate">Not Graduate</option>
                  </select>
                </div>

                {/* Self Employed */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Self Employed
                  </label>
                  <select
                    value={formData.self_employed}
                    onChange={(e) => handleInputChange('self_employed', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                  >
                    <option value="No">No (Salaried)</option>
                    <option value="Yes">Yes (Business)</option>
                  </select>
                </div>

                {/* Property Area */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Property Area
                  </label>
                  <select
                    value={formData.property_area}
                    onChange={(e) => handleInputChange('property_area', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                  >
                    <option value="Semiurban">Semiurban (High Rate)</option>
                    <option value="Urban">Urban</option>
                    <option value="Rural">Rural</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Financial Metrics */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 pb-1 border-b border-slate-200/80 dark:border-white/10">
                2. Financial & Credit Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Applicant Income */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Applicant Monthly Income ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={formData.applicant_income}
                      onChange={(e) => handleInputChange('applicant_income', Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                    />
                  </div>
                </div>

                {/* Coapplicant Income */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Co-Applicant Monthly Income ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={formData.coapplicant_income}
                      onChange={(e) => handleInputChange('coapplicant_income', Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                    />
                  </div>
                </div>

                {/* Loan Amount */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Loan Amount ($ in thousands)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      min="1"
                      step="5"
                      value={formData.loan_amount}
                      onChange={(e) => handleInputChange('loan_amount', Number(e.target.value))}
                      className="w-full pl-8 pr-12 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                    />
                    <span className="absolute right-3 top-2.5 text-[10px] text-slate-400">
                      k (${(formData.loan_amount * 1000).toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Loan Term (Months)
                  </label>
                  <select
                    value={formData.loan_amount_term}
                    onChange={(e) => handleInputChange('loan_amount_term', Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/60 text-slate-900 dark:text-white backdrop-blur-md"
                  >
                    <option value={120}>120 Months (10 Years)</option>
                    <option value={180}>180 Months (15 Years)</option>
                    <option value={240}>240 Months (20 Years)</option>
                    <option value={360}>360 Months (30 Years)</option>
                    <option value={480}>480 Months (40 Years)</option>
                  </select>
                </div>
              </div>

              {/* Credit History Radio Toggle */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Credit History Rating (Bureau Repayment Score)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('credit_history', 1)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition backdrop-blur-md ${
                      formData.credit_history === 1
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                        : 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Good Credit Record (1.0)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('credit_history', 0)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition backdrop-blur-md ${
                      formData.credit_history === 0
                        ? 'bg-rose-500/15 border-rose-500/50 text-rose-600 dark:text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    Poor / No Record (0.0)
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-white/10">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Form
              </button>

              <button
                type="submit"
                disabled={isEvaluating}
                className="flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-2xl shadow-lg shadow-blue-600/25 active:scale-95 transition"
              >
                <BrainCircuit className="w-4 h-4" />
                {isEvaluating ? 'Evaluating Model...' : 'Predict Loan Status'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Prediction Result & Decision Factors */}
        <div className="lg:col-span-5 space-y-6">
          
          {isEvaluating ? (
            <div className="p-12 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 text-center space-y-4 shadow-xl">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin"></div>
                <BrainCircuit className="w-8 h-8 text-blue-600 dark:text-blue-400 absolute inset-0 m-auto" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Machine Learning Evaluation in Progress
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 animate-pulse">
                {evalStep}
              </p>
            </div>
          ) : result ? (
            <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 shadow-xl space-y-6">
              
              {/* Outcome Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                    Prediction Result
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {applicantName}
                  </h3>
                </div>

                <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 backdrop-blur-md ${
                  result.is_approved
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                }`}>
                  {result.is_approved ? <CheckCircle className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
                  {result.prediction.toUpperCase()}
                </div>
              </div>

              {/* Gauge Meter */}
              <ProbabilityMeter probability={result.confidence_score} isApproved={result.is_approved} />

              {/* DTI & EMI Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-2xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Total Income</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">${result.total_income.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Monthly EMI</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">${result.monthly_emi.toFixed(0)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Debt-to-Income</span>
                  <span className={`text-xs font-bold ${result.dti_ratio > 40 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {result.dti_ratio}%
                  </span>
                </div>
              </div>

              {/* Key Decision Factors */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Key Influencing Decision Factors
                </h4>
                <div className="space-y-2">
                  {result.key_factors.map((factor, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/40 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 text-xs backdrop-blur-md"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {factor.factor}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                        factor.impact.includes('Positive')
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}>
                        {factor.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions for Improvement */}
              {result.suggestions.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                    <Lightbulb className="w-4 h-4" />
                    Recommendations to Improve Odds:
                  </div>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pl-5 list-disc text-[11px]">
                    {result.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* PDF Download Trigger */}
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download Formal PDF Report
              </button>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 text-center space-y-3 shadow-xl">
              <BrainCircuit className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Awaiting Loan Application Submission
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Fill out the application form on the left or select a preset profile to view live probability and factor breakdowns.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Export PDF Modal */}
      {result && (
        <PdfExportModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          result={result}
          input={formData}
          applicantName={applicantName}
        />
      )}

    </div>
  );
};
