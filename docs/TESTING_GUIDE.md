# Testing Guide

This document specifies test scenarios and validation steps for Machine Learning, Backend API, and Frontend application components.

---

## 1. Machine Learning Model Validation
Run the Python evaluation script:
```bash
python model/train.py
```
Expected output:
- Dataset preprocessed without NaN values.
- Train-test split evaluated (80% train, 20% test).
- 7 models benchmarked:
  - Gradient Boosting (~84.55% accuracy)
  - Random Forest (~83.74% accuracy)
  - Logistic Regression (~82.93% accuracy)
  - Support Vector Machine (~81.30% accuracy)
  - XGBoost (~82.11% accuracy)
  - K-Nearest Neighbors (~74.80% accuracy)
  - Decision Tree (~71.54% accuracy)
- Best model metrics written to `model/model_metrics.json`.

---

## 2. Backend REST API Tests

### Test 1: Health Check
```bash
curl -X GET http://localhost:3000/api/health
```
**Expected Response**: `200 OK` with `"status": "healthy"`.

### Test 2: High Approval Probability Request
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "applicant_income": 8000,
    "coapplicant_income": 3000,
    "loan_amount": 150,
    "loan_amount_term": 360,
    "credit_history": 1,
    "education": "Graduate",
    "property_area": "Semiurban"
  }'
```
**Expected Response**: `"prediction": "Approved"`, `"confidence_score": > 80%`.

### Test 3: High Risk / Rejected Request
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "applicant_income": 1500,
    "coapplicant_income": 0,
    "loan_amount": 350,
    "loan_amount_term": 360,
    "credit_history": 0,
    "education": "Not Graduate",
    "property_area": "Rural"
  }'
```
**Expected Response**: `"prediction": "Rejected"`, `"confidence_score": < 40%`, with Improvement Suggestions.

---

## 3. Frontend UI Validation
- [x] **Home Page**: Hero banner renders, CTA button redirects to `/predict`.
- [x] **Prediction Page**: Input fields validate numbers, preset sample buttons populate form instantly, submit calculates prediction card with gauge meter.
- [x] **Analytics Page**: Recharts render Model Comparison, Feature Importance, and Confusion Matrix.
- [x] **Export PDF**: Generates PDF report download with applicant details and decision breakdown.
- [x] **Dark Mode Toggle**: Smooth switching between Light Mode and Dark Mode.
