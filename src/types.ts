export interface LoanInput {
  gender: 'Male' | 'Female';
  married: 'Yes' | 'No';
  dependents: '0' | '1' | '2' | '3+';
  education: 'Graduate' | 'Not Graduate';
  self_employed: 'Yes' | 'No';
  applicant_income: number;
  coapplicant_income: number;
  loan_amount: number; // in thousands (e.g. 128 = $128,000)
  loan_amount_term: number; // in months (e.g. 360)
  credit_history: number; // 1 for good, 0 for poor
  property_area: 'Urban' | 'Semiurban' | 'Rural';
}

export interface KeyFactor {
  factor: string;
  impact: 'High Positive' | 'Positive' | 'Negative' | 'Critical Negative';
  score: string;
}

export interface PredictionResult {
  prediction: 'Approved' | 'Rejected';
  is_approved: boolean;
  confidence_score: number; // percentage (0-100)
  approval_probability: number;
  rejection_probability: number;
  prediction_time_ms: number;
  dti_ratio: number;
  monthly_emi: number;
  total_income: number;
  key_factors: KeyFactor[];
  suggestions: string[];
  timestamp?: string;
  applicant_name?: string;
}

export interface ModelComparisonItem {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  cv_score: number;
  confusion_matrix: {
    tp: number;
    fp: number;
    tn: number;
    fn: number;
  };
  is_best: boolean;
}

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
  percentage: number;
  description?: string;
}

export interface DatasetSummary {
  total_records: number;
  approved_count: number;
  rejected_count: number;
  approval_rate: number;
  avg_applicant_income: number;
  avg_coapplicant_income: number;
  avg_loan_amount_k: number;
  credit_history_approval_rate: number;
  no_credit_history_approval_rate: number;
  semiurban_approval_rate: number;
  urban_approval_rate: number;
  rural_approval_rate: number;
}

export interface HistoryItem extends PredictionResult {
  id: string;
  applicant_name: string;
  inputs: LoanInput;
  created_at: string;
}
