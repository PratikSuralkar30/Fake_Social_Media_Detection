# Fake Account Detector

This project is a full-stack AI application that detects fake social media accounts using a Scikit-Learn Random Forest model.

## Project Structure
- **app/**: Next.js frontend (Tailwind CSS, Lucide React, Recharts)
- **backend/**: FastAPI backend (Python, Scikit-Learn, Joblib)

---

## 🚀 Setup & Execution Instructions

### 1. Backend (FastAPI)
The backend serves the ML model predictions via a REST API.

1. **Open a terminal** and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Model File**: Ensure `model_compressed.joblib` is present in the `backend/` folder.
4. **Run the server**:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```
   *The API will be available at `http://127.0.0.1:8000`*

### 2. Frontend (Next.js)
The frontend provides a dashboard for platform selection and profile analysis.

1. **Open a NEW terminal** and navigate to the app directory:
   ```bash
   cd app
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
   *The dashboard will be available at `http://localhost:3000`*

---

## 🛠️ How to use the App
1. Open your browser to `http://localhost:3000`.
2. Click on the **Instagram** platform card (Active).
3. Fill in the profile details (Followers, Following, Engagement, etc.).
4. Click **Analyze Profile**.
5. The result (Real/Fake) will appear instantly with a confidence score.

## 📊 Model Details
- **Algorithm**: Random Forest Classifier
- **Accuracy**: ~90.56%
- **Input Features**: 12 profile metrics mapped to a 17-feature model vector.
