import { LoanInput } from '../types';

export interface SampleProfile {
  id: string;
  name: string;
  applicantName: string;
  badge: string;
  badgeColor: string;
  description: string;
  input: LoanInput;
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'sample-high-prob',
    name: 'High Approval Profile',
    applicantName: 'David Miller',
    badge: 'Strong Approval Odds',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    description: 'High household income, flawless credit history, moderate loan size in Semiurban area.',
    input: {
      gender: 'Male',
      married: 'Yes',
      dependents: '1',
      education: 'Graduate',
      self_employed: 'No',
      applicant_income: 6800,
      coapplicant_income: 3200,
      loan_amount: 140,
      loan_amount_term: 360,
      credit_history: 1,
      property_area: 'Semiurban'
    }
  },
  {
    id: 'sample-high-risk',
    name: 'High Risk / Rejected Profile',
    applicantName: 'Alex Mercer',
    badge: 'High Rejection Risk',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    description: 'Zero credit history, high loan amount relative to low single income, 3+ dependents.',
    input: {
      gender: 'Male',
      married: 'No',
      dependents: '3+',
      education: 'Not Graduate',
      self_employed: 'No',
      applicant_income: 2400,
      coapplicant_income: 0,
      loan_amount: 280,
      loan_amount_term: 360,
      credit_history: 0,
      property_area: 'Rural'
    }
  },
  {
    id: 'sample-borderline',
    name: 'Borderline Profile',
    applicantName: 'Sophia Chen',
    badge: 'Borderline Risk',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    description: 'Good credit history, moderate income, but requesting a high loan amount.',
    input: {
      gender: 'Female',
      married: 'Yes',
      dependents: '2',
      education: 'Graduate',
      self_employed: 'Yes',
      applicant_income: 4500,
      coapplicant_income: 1200,
      loan_amount: 210,
      loan_amount_term: 360,
      credit_history: 1,
      property_area: 'Urban'
    }
  }
];
