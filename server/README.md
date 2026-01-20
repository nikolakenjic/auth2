# AI Resume & Interview Coach — Backend (server)

Backend API for **AI Resume & Interview Coach** — a full-stack MERN application that helps users:

- build resumes
- generate cover letters
- analyze job descriptions
- track interview sessions

The backend is built with:
**Node.js + Express + TypeScript + MongoDB**
and uses JWT authentication with HTTP-only cookies**.

---

## 🚀 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Auth (Access + Refresh tokens)**
- **Cookies (httpOnly)**
- **Zod** (request validation)
- **Resend** (emails)
- **Google OAuth** (google-auth-library)
- **Morgan** (request logging)

---

## ✅ Features

### 🔐 Authentication

- Register / Login / Logout
- Refresh access token (JWT rotation support)
- Email verification
- Password reset flow
- Google OAuth login/register
- Protected routes using `authenticate` middleware

### 📝 Resume Module

- Create resume
- Get all resumes (per user)
- Get resume by ID (per user)
- Update resume
- Delete resume

### 📄 Cover Letter Module

- Create cover letter
- Get all cover letters (per user)
- Get cover letter by ID (per user)
- Update cover letter
- Delete cover letter

### 🗣️ Interview Session Module

- Create interview session
- Get all sessions (per user)
- Get session by ID (per user)
- Update session (messages / status / feedback)
- Delete session

### 📌 Job Description Module

- Create job description
- Get all job descriptions (per user)
- Get job description by ID (per user)
- Update job description (keywords / missing skills / match score)
- Delete job description

---

## 📁 Project Structure

server/
src/
controllers/
middleware/
models/
routes/
services/
utils/
validations/
app.ts
server.ts
package.json
config.env

---

## Setup (config.env + run project)

Create a config.env file inside the server/ folder:

PORT=5000  
CLIENT_URL=http://localhost:3000  
NODE_ENV=development

MONGO_URI=your_mongo_connection_string

APP_ORIGIN=http://localhost:5000

JWT_SECRET=your_access_token_secret  
JWT_REFRESH_SECRET=your_refresh_token_secret

RESEND_API_KEY=your_resend_api_key  
EMAIL_SENDER=your_sender_email

GOOGLE_CLIENT_ID=your_google_client_id  
GOOGLE_CLIENT_SECRET=your_google_client_secret

Install dependencies:

npm install

Run development server:

npm run dev

Build project:

npm run build

Start production server:

npm start

✅ Important: never commit config.env to GitHub.

---

## 🔐 Authentication Notes

- Access and refresh tokens are stored in HTTP-only cookies
- Protected routes require a valid access token cookie
- Refresh endpoint generates a new access token (and refresh token if needed)

---

## 📌 API Endpoints

Base URL: /api/v1

Auth:

- POST /auth/register
- POST /auth/login
- GET /auth/refresh
- GET /auth/logout
- GET /auth/email/verify/:code
- POST /auth/email/resend-verification
- POST /auth/password/forgot
- POST /auth/password/reset
- POST /auth/google

User (Protected):

- GET /user/me

Resume (Protected):

- GET /resume
- POST /resume
- GET /resume/:id
- PATCH /resume/:id
- DELETE /resume/:id

Cover Letter (Protected):

- GET /cover-letter
- POST /cover-letter
- GET /cover-letter/:id
- PATCH /cover-letter/:id
- DELETE /cover-letter/:id

Interview Session (Protected):

- GET /interview-session
- POST /interview-session
- GET /interview-session/:id
- PATCH /interview-session/:id
- DELETE /interview-session/:id

Job Description (Protected):

- GET /job-description
- POST /job-description
- GET /job-description/:id
- PATCH /job-description/:id
- DELETE /job-description/:id

---

## ✅ Scripts (package.json)

dev: ts-node-dev --files src/server.ts  
build: tsc && cp ./package.json ./dist  
start: node server.js

---

## 👨‍💻 Author

Nikola Kenjić
