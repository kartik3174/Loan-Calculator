# 🏦 Loan Approval Predictor using Machine Learning

[![React](https://img.shields.io/badge/Frontend-React%2019-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20v4-38bdf8.svg)](https://tailwindcss.com/)
[![Flask](https://img.shields.io/badge/Backend-Flask-000000.svg)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An intelligent full-stack machine learning web application that predicts whether a customer's loan application will be **Approved** or **Rejected** based on applicant financial metrics, credit history, income, loan amount, property area, and marital status.

---

## 🌟 Key Features

- **Real-Time ML Predictions**: Instant loan status prediction with confidence probability scores.
- **Explainable AI Decision Factors**: Highlights positive vs negative factors influencing loan decisions.
- **7 Model Benchmark Comparison**: Trains and evaluates **Logistic Regression, Decision Tree, Random Forest, SVM, KNN, Gradient Boosting, and XGBoost**.
- **Actionable Improvement Recommendations**: Gives clear steps for rejected or borderline applicants to improve approval odds.
- **Interactive EDA & Analytics Dashboard**: Visualizes approval rates, confusion matrices, and feature importance rankings using **Recharts**.
- **PDF Report Download**: Export formal evaluation summaries with 1-click.
- **Dark Mode Support**: Banking-grade modern visual design with dark and light themes.
- **Preset Quick-Load Applications**: Test with pre-configured high-probability and high-risk applicant profiles.

---

## 🏗️ Project Architecture & Structure

```
LoanApprovalPredictor/
├── dataset/
│   └── loan_data.csv               # Standard 614-row Loan Prediction Dataset
├── model/
│   ├── train.py                    # ML model training and evaluation script
│   └── model_metrics.json          # Precomputed metrics for all 7 algorithms
├── notebooks/
│   └── eda_and_training.py         # Exploratory Data Analysis script
├── backend/
│   ├── app.py                      # Flask REST API server
│   ├── wsgi.py                     # WSGI entry point
│   └── requirements.txt            # Python dependencies
├── docs/
│   ├── API_DOCUMENTATION.md        # API reference specs
│   ├── INSTALLATION_GUIDE.md       # Setup guide for local and cloud deployment
│   └── TESTING_GUIDE.md            # Test scenarios and evaluation cases
├── screenshots/
│   └── README_SCREENSHOTS.md       # Interface screenshot placeholders
├── src/
│   ├── components/                 # Reusable UI & Chart components
│   ├── pages/                      # Home, Prediction, Analytics, About, 404
│   ├── data/                       # Sample datasets, ML engines, presets
│   └── types.ts                    # TypeScript interfaces
├── server.ts                       # Express full-stack proxy & dev server
└── README.md                       # Main documentation
```

---

## 🤖 Machine Learning Model Benchmarks

| Algorithm | Accuracy (%) | Precision (%) | Recall (%) | F1 Score (%) | ROC AUC | CV Score (%) | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Gradient Boosting** | **84.55%** | **85.20%** | **93.40%** | **89.11%** | **0.812** | **83.90%** | 🏆 **Best Model** |
| Random Forest | 83.74% | 84.85% | 92.30% | 88.42% | 0.804 | 82.80% | Runner Up |
| Logistic Regression | 82.93% | 83.00% | 94.40% | 88.33% | 0.785 | 82.10% | Evaluated |
| XGBoost | 82.11% | 83.33% | 91.10% | 87.04% | 0.791 | 81.20% | Evaluated |
| Support Vector Machine | 81.30% | 81.82% | 93.20% | 87.14% | 0.762 | 80.50% | Evaluated |
| K-Nearest Neighbors | 74.80% | 77.08% | 88.10% | 82.22% | 0.698 | 73.40% | Evaluated |
| Decision Tree | 71.54% | 78.72% | 80.40% | 79.55% | 0.672 | 70.20% | Evaluated |

---

## 🚀 Quick Start (Local Run)

### Frontend & Integrated Node Server
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` in your browser.

### Python Backend (Optional Standalone Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## 📄 API Endpoints Summary

- `GET /api/health` - Server & model health status
- `POST /api/predict` - Accepts applicant parameters and returns loan decision
- `GET /api/model-info` - Returns model accuracy rankings & feature importance
- `GET /api/analytics` - Returns dataset summary statistics

---

## 🔮 Future Enhancements
- Integration with external bank credit bureau APIs for live credit score fetching.
- Multi-currency support and automated document verification using Gemini OCR.
- Deep Learning Neural Network benchmarking (TensorFlow/PyTorch).

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
