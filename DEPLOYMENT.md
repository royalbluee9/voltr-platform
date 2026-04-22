# VOLTR Architecture Deployment Guide

This repository contains a full-stack **VOLTR Energy Trading System:**
1. **Frontend:** React + Vite + Zustand + Three.js (`/voltr-frontend`)
2. **Backend:** Node.js + Express + Prisma (`/voltr-backend`)
3. **ML Service:** Python + FastAPI (`/voltr-ml`)

## 🚀 Pushing to GitHub
Because this is a complex monorepo, push this codebase to GitHub securely.

1. **Sign into GitHub CLI / Browser.**
2. **Create a fresh repository.**
3. **Run these exact terminal commands from the `voltr-platform` folder:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/voltr-platform.git
git branch -M main
git push -u origin main
```

---

## 🌐 Automatic Deployments (Cloud Setup)

Once pushed to Github, follow these step-by-step instructions to easily launch the 3 environments manually into production properly without Docker images.

### 1. Frontend (Vercel)
Vercel handles React architectures automatically.
1. Sign into **Vercel.com** and click **Create New Project**.
2. Connect your GitHub and select the `voltr-platform` repository.
3. *CRITICAL:* Under **Root Directory**, click **Edit** and select `voltr-frontend`!
4. The Build Command (`npm run build`) and Output Directory (`dist`) will auto-populate.
5. Click **Deploy**. Your Frontend is now live on Edge networks.

### 2. Node Backend (Render.com Web Service)
Render seamlessly supports Prisma + Node.js servers out of the box with persistent database volumes.
1. Sign into **Render.com** and click **New+** -> **Web Service**.
2. Connect the `voltr-platform` GitHub repository.
3. *CRITICAL:* Set Native Build Environment (`Node`).
4. Set **Root Directory** to `voltr-backend`.
5. Set Build Command: `npm install && npx prisma db push && npx prisma db seed && npm run build`
6. Set Start Command: `npm run start`
7. Click **Deploy**.

### 3. Machine Learning Microservice (Render.com Web Service)
1. In **Render.com**, click **New+** -> **Web Service**.
2. Connect the `voltr-platform` GitHub repository again.
3. *CRITICAL:* Set Native Build Environment (`Python`).
4. Set **Root Directory** to `voltr-ml`.
5. Set Build Command: `pip install -r requirements.txt`
6. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
7. Click **Deploy**.

> Note: Update the `socket.io` API keys natively inside `voltr-frontend/src/hooks/useWebSocket.ts` or `voltr-backend/src/sockets/marketStream.ts` respectively once you gather the final Render URLs!
