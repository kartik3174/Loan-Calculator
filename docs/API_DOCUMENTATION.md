# Loan Approval Predictor - REST API Documentation

This document outlines the API endpoints provided by the Loan Approval Predictor backend.

## Base URL
- Development: `http://localhost:3000/api` (Node/Express backend) or `http://localhost:5000` (Flask backend)

---

## Endpoints

### 1. Health Check
Checks backend operational status and active machine learning model availability.

- **Method**: `GET`
- **Path**: `/api/health`
- **Response**: `200 OK`
```json
{
  "status": "healthy",
  "timestamp": 1753447923,
  "model_loaded": true,
  "model_name": "Gradient Boosting Classifier (84.55% Accuracy)"
}
```

---

### 2. Predict Loan Approval
Evaluates loan applicant financial parameters and returns instant ML prediction, probability metrics, decision factors, and improvement recommendations.

- **Method**: `POST`
- **Path**: `/api/predict`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "gender": "Male",
  "married": "Yes",
  "dependents": "1",
  "education": "Graduate",
  "self_employed": "No",
  "applicant_income": 5849,
  "coapplicant_income": 1508,
  "loan_amount": 128,
  "loan_amount_term": 360,
  "credit_history": 1,
  "property_area": "Semiurban"
}
```

- **Response**: `200 OK`
```json
{
  "prediction": "Approved",
  "is_approved": true,
  "confidence_score": 88.5,
  "approval_probability": 88.5,
  "rejection_probability": 11.5,
  "prediction_time_ms": 11.8,
  "dti_ratio": 22.4,
  "monthly_emi": 355.56,
  "total_income": 7357,
  "key_factors": [
    {
      "factor": "Positive Credit History",
      "impact": "High Positive",
      "score": "+35%"
    },
    {
      "factor": "Strong Debt-to-Income (22.4%)",
      "impact": "Positive",
      "score": "+15%"
    }
  ],
  "suggestions": []
}
```

---

### 3. Model Information & Metrics
Retrieves comparison analytics across all 7 machine learning algorithms trained on the dataset.

- **Method**: `GET`
- **Path**: `/api/model-info`
- **Response**: `200 OK`
```json
{
  "best_model_name": "Gradient Boosting",
  "best_accuracy": 84.55,
  "models": [
    {
      "name": "Gradient Boosting",
      "accuracy": 84.55,
      "precision": 85.2,
      "recall": 93.4,
      "f1_score": 89.11,
      "roc_auc": 0.812,
      "cv_score": 83.9,
      "is_best": true
    },
    {
      "name": "Random Forest",
      "accuracy": 83.74,
      "precision": 84.85,
      "recall": 92.3,
      "f1_score": 88.42,
      "roc_auc": 0.804,
      "cv_score": 82.8,
      "is_best": false
    }
  ]
}
```

---

### 4. Dataset & EDA Analytics
Provides overall exploratory data analysis breakdown, approval distributions, and demographic statistics.

- **Method**: `GET`
- **Path**: `/api/analytics`
- **Response**: `200 OK`
```json
{
  "dataset_summary": {
    "total_records": 614,
    "approved_count": 422,
    "rejected_count": 192,
    "approval_rate": 68.73,
    "avg_applicant_income": 5403,
    "avg_coapplicant_income": 1621,
    "avg_loan_amount_k": 146
  }
}
```
