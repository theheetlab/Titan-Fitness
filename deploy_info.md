# Deploy Guide — Titan Fitness Gym Website

## Architecture

```
Frontend (React)  ──── calls ────>  Backend (Node/Express)  ────>  MongoDB Atlas
   (Netlify / Vercel)                  (Render / Railway)               (Cloud)
```

- **Frontend** = React app (static site) → deploy to **Netlify** or **Vercel**
- **Backend** = Node.js + Express API → deploy to **Render** or **Railway**
- **Database** = MongoDB Atlas (already cloud-hosted)

---

## Step 0 — Prerequisites (Do this first)

### 0.1 Push your code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/titan-fitness.git
git push -u origin main
```

### 0.2 Get your MongoDB Atlas connection string

1. Go to https://cloud.mongodb.com
2. Click your cluster → **Connect** → **Connect your application**
3. Copy the connection string (looks like `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/titan_fitness?retryWrites=true&w=majority`)
4. Replace `<user>` and `<pass>` with your database username and password
5. **Important:** Make sure your IP is whitelisted — go to **Network Access** and add `0.0.0.0/0` (allows all connections, required for hosted backends)

### 0.3 Generate a JWT_SECRET

Run this in your terminal and copy the output:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

It will print a 64-character hex string like `a1b2c3d4...`. Keep this safe.

---

## Step 1 — Deploy the Backend (on Render)

Render is the easiest free host for Node.js APIs. Vercel/Netlify cannot run Express backends directly.

### 1.1 Create a Render account

1. Go to https://render.com
2. Sign up with GitHub (click "Sign up with GitHub" — easiest)
3. Authorize Render to access your repositories

### 1.2 Create a Web Service

1. In the Render dashboard, click **New +** → **Web Service**
2. Connect your GitHub repository (`titan-fitness`)
3. Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `titan-fitness-api` (or anything you like) |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Plan** | **Free** |

### 1.3 Add Environment Variables (IMPORTANT)

In the same page, under **Environment Variables**, add these:

| Key | Value |
|-----|-------|
| `NODE_VERSION` | `18.18.0` |
| `MONGODB_URI` | Your MongoDB connection string from Step 0.2 |
| `JWT_SECRET` | The 64-char hex string from Step 0.3 |
| `ADMIN_EMAIL` | `admin@titanfitness.com` |
| `ADMIN_PASSWORD` | `admin123` |

**DO NOT** set `PORT` — Render sets this automatically.

### 1.4 Deploy

1. Click **Create Web Service**
2. Wait 2-3 minutes for the build and deploy
3. When done, you will see a URL like: `https://titan-fitness-api.onrender.com`
4. Visit `https://titan-fitness-api.onrender.com/api/health` — you should see `{ "status": "OK", "message": "Titan Fitness API is running" }`

> **Note:** On the free plan, Render spins down after 15 minutes of inactivity. The first request after inactivity will take 30-60 seconds to wake up.

---

## Step 2 — Deploy the Frontend (on Netlify)

### 2.1 Create a Netlify account

1. Go to https://netlify.com
2. Sign up with GitHub

### 2.2 Deploy from GitHub

1. Click **Add new site** → **Import an existing project**
2. Connect your GitHub repository
3. Fill in the form:

| Field | Value |
|-------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `frontend/build` |

> **Note:** Make sure "Base directory" is set to `frontend` (not root). Otherwise Netlify won't find the frontend code.

### 2.3 Add Environment Variable

Click **Show advanced** and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://titan-fitness-api.onrender.com/api` (your Render URL + `/api`) |

### 2.4 Deploy

1. Click **Deploy site**
2. Wait for the build to finish (~1-2 minutes)
3. Your site will be at a random URL like `https://random-name-123456.netlify.app`
4. You can add a custom domain later in **Site settings** → **Domain management**

---

## Step 3 — Deploy the Frontend (on Vercel, alternative to Netlify)

If you prefer Vercel over Netlify:

### 3.1 Create a Vercel account

1. Go to https://vercel.com
2. Sign up with GitHub

### 3.2 Create a `vercel.json` file in the root directory

Create this file in the `frontend/` folder:

**`frontend/vercel.json`**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This is needed because React uses client-side routing (your `/about`, `/contact`, `/admin` pages need to all route through `index.html`).

### 3.3 Deploy

1. Click **Add New** → **Project**
2. Connect your GitHub repository
3. Fill in the form:

| Field | Value |
|-------|-------|
| **Framework Preset** | `Create React App` (Vercel detects this automatically) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` (Vercel fills this automatically) |
| **Output Directory** | `build` (Vercel fills this automatically) |

### 3.4 Add Environment Variable

Under **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://titan-fitness-api.onrender.com/api` |

### 3.5 Deploy

1. Click **Deploy**
2. Wait for the build
3. Your site URL will be like `https://titan-fitness.vercel.app`

---

## Step 4 — Connect Everything

After deploying both backend and frontend, your frontend needs to point to the live backend:

1. The `REACT_APP_API_URL` in Netlify/Vercel must be set to `https://titan-fitness-api.onrender.com/api`
2. The backend on Render must have the correct `MONGODB_URI` pointing to your MongoDB Atlas

**To test the full flow:**

1. Visit your deployed frontend URL
2. The homepage should load with all content
3. Go to `/admin/login` and sign in with `admin@titanfitness.com` / `admin123`
4. If you see the admin dashboard with data, everything is working

---

## Common Problems & Fixes

### "Blank page after deploy"
- Make sure `REACT_APP_API_URL` is set correctly in Netlify/Vercel environment variables
- Check the browser console (F12) for errors
- Make sure your frontend build succeeded (check deploy logs)

### "Cannot connect to backend"
- Verify `REACT_APP_API_URL` is `https://titan-fitness-api.onrender.com/api` (your render URL + /api)
- Visit the backend health URL directly to confirm it's running
- On Render free plan, the backend sleeps after 15 min — wait 30 sec for it to wake up

### "401 Unauthorized on admin login"
- Make sure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in Render environment variables
- The backend seeds the admin account on every restart — try trigger a deploy or restart on Render

### "MongoDB connection error"
- Check that your connection string is correct
- Make sure `0.0.0.0/0` is whitelisted in MongoDB Atlas → Network Access
- Check that the database name in the connection string matches

### "Frontend build fails on Netlify"
- Make sure **Base directory** is set to `frontend`
- Check that `Publish directory` is `frontend/build`

### "Frontend build fails on Vercel"
- Make sure **Root Directory** is set to `frontend`
- If you get a routing error, create `frontend/vercel.json` (see Step 3.2)

---

## Quick Reference — All Environment Variables

### Backend (Render)

| Variable | Where to get it |
|----------|----------------|
| `MONGODB_URI` | MongoDB Atlas → Connect → Connect your application |
| `JWT_SECRET` | Run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` | Your choice (default: `admin@titanfitness.com`) |
| `ADMIN_PASSWORD` | Your choice (default: `admin123`) |

### Frontend (Netlify / Vercel)

| Variable | Value |
|----------|-------|
| `REACT_APP_API_URL` | `https://your-app-name.onrender.com/api` |

---

## What Goes Where — Summary

```
GitHub Repository
│
├── backend/  ───>  Render (Web Service)
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── package.json
│
├── frontend/  ───>  Netlify or Vercel (Static Site)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── deploy_info.md  (this file)
```

**Both deployments connect to the same MongoDB Atlas cluster** — no separate database setup needed.
