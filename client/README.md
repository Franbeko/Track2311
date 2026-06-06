Here's a professional README file for your Track2311 project:

```markdown
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
- [Screenshots](#screenshots)
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
| **Admin Dashboard** | Manage users, investments, and applications |

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | MongoDB |
| **Authentication** | Google OAuth, JWT |
| **Deployment** | Vercel (Frontend), Dokploy (Backend + MongoDB on VPS) |
| **Other** | Nodemailer, Resend API, Framer Motion |

---

## 📁 Project Structure

```
track-investments/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context (Auth, Chat, Language)
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS files
│   ├── public/             # Static assets
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   ├── middleware/         # Custom middleware
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v20+)
- MongoDB
- npm or yarn

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Franbeko/Track2311.git
cd Track2311/server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
# MONGODB_URI, JWT_SECRET, GOOGLE_CLIENT_ID, etc.

# Start the server
npm run dev
```

### Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start the development server
npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT secret key |
| `FRONTEND_URL` | Frontend URL (for CORS) |
| `EMAIL_USER` | Gmail for email notifications |
| `EMAIL_PASS` | Gmail app password |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

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
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Backend (Dokploy on VPS)

1. Connect GitHub repository
2. Set Build Path to `/server`
3. Add environment variables
4. Deploy to VPS

---

## 👨‍💻 Author

**Francis Kojo Haizel**

- WhatsApp: +231 776 005 247
- Email: franciskhhaizel@gmail.com
- Portfolio: [franciskhaizel-dev.vercel.app](https://franciskhaizel-dev.vercel.app)

---

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

## 🙏 Acknowledgments

- Track2311 Investment and Consultancy for the opportunity
- All contributors and testers

---

**Built with ❤️ by Francis Kojo Haizel**
```

## Save and push the README:

```bash
cd C:/Projects/track-investments
echo "# Track2311 Investments - Agricultural Investment Platform

A full-stack web application for a Liberian agricultural investment firm.

🔗 **Live Demo:** [https://track2311investments.org](https://track2311investments.org)

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Auth:** Google OAuth, JWT
- **Deployment:** Vercel (frontend), Dokploy (backend)

## Features
- User authentication (email + Google)
- AI-powered chatbot
- Investment plans with ROI
- Job application system
- Contact form with email
- Fully responsive design

## Author
**Francis Kojo Haizel**
- Portfolio: https://franciskhaizel-dev.vercel.app
- Email: franciskhhaizel@gmail.com

---
Built with ❤️ by Francis Kojo Haizel" > README.md
```