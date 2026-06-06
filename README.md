# 🌾 Track2311 Investments - Agricultural Investment Platform

A full-stack web application for a Liberian agricultural investment firm, featuring user authentication, AI-powered chatbot, job application system, and investment management.

🔗 **Live Demo:** [https://track2311investments.org](https://track2311investments.org)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contact](#contact)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **User Authentication** | Email/Password + Google OAuth login |
| **AI Chatbot** | Intelligent chatbot for customer support and FAQs |
| **Investment Plans** | Multiple investment options with ROI calculations |
| **Job Application System** | Submit applications for career opportunities |
| **Contact Form** | Automated email responses |
| **Responsive Design** | Fully responsive on all devices |

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | MongoDB |
| **Authentication** | Google OAuth, JWT |
| **Deployment** | Vercel (Frontend), Dokploy (Backend + MongoDB on VPS) |

---

## 📁 Project Structure

```
track-investments/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v20+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Franbeko/Track2311.git
cd Track2311/server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

Server runs at `http://localhost:5000`

### Frontend Setup

```bash
# Open a new terminal
cd client

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT secret key |
| `FRONTEND_URL` | Frontend URL for CORS |
| `EMAIL_USER` | Gmail for notifications |
| `EMAIL_PASS` | Gmail app password |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |

### Frontend (.env)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

---

## 📦 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Set Root Directory to `client`
4. Add `VITE_API_URL` environment variable
5. Deploy

### Backend (Dokploy on VPS)

1. Connect GitHub repository
2. Set Build Path to `/server`
3. Add all environment variables
4. Deploy to VPS

---

## 👨‍💻 Author

**Francis Kojo Haizel**

- WhatsApp: +231 776 005 247
- Email: franciskhhaizel@gmail.com
- Portfolio: [franciskhaizel-dev.vercel.app](https://franciskhaizel-dev.vercel.app)

---

**Built with ❤️ by Francis Kojo Haizel**
```