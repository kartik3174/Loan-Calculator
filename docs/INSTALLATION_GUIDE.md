# Installation & Deployment Guide

This guide walks you through setting up and deploying the **Loan Approval Predictor** web application locally and deploying to Vercel (Frontend) & Render (Backend).

---

## Local Setup Instructions

### Prerequisites
- **Node.js**: v18 or higher
- **Python**: v3.10 or higher
- **npm**: v9 or higher

---

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/loan-approval-predictor.git
cd loan-approval-predictor
```

---

### Step 2: Frontend Setup
```bash
# Navigate to root directory
npm install

# Start development server
npm run dev
```
The frontend will run at `http://localhost:3000`.

---

### Step 3: Backend Setup (Python Flask)
```bash
# Move to backend folder
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask backend server
python app.py
```
The Flask REST API will run at `http://localhost:5000`.

---

## Deployment Instructions

### Deploying Frontend to Vercel
1. Connect your repository to Vercel.
2. Set build settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variable:
   - `VITE_API_URL`: Your Render backend service URL.
4. Click **Deploy**.

---

### Deploying Backend to Render
1. Create a new **Web Service** on Render.
2. Select your repository and root directory as `backend`.
3. Set environment settings:
   - Environment: **Python 3**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn wsgi:app`
4. Deploy the service.
