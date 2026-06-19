# Resume AI

An AI-powered platform that analyzes your resume against a job description, highlights skill gaps, and generates tailored technical and behavioral interview questions to help you prepare smarter.

## Features

- **User Authentication** – Secure register, login, logout, and session management using cookies
- **Resume & JD Matching** – Upload your resume and a job description to get a match score
- **Skill Gap Analysis** – See which skills from the JD are missing from your resume
- **AI-Generated Interview Questions** – Get personalized interview questions based on your resume and the target role
- **Persistent Sessions** – Stay logged in across visits with secure, cookie-based auth

## Tech Stack

**Frontend**
- React
- Vite
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```
VITE_API_URL=http://localhost:3000
```

Run the frontend:
```bash
npm run dev
```

## How It Works

1. User registers/logs in
2. User uploads their resume and pastes a job description
3. The AI engine analyzes both and returns:
   - A match score
   - Identified skill gaps
   - A set of tailored interview questions
4. User reviews the analysis and practices with the generated questions

## Author

Nitin Bansal
