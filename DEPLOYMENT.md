# Titan Fitness - Deployment Guide

## Prerequisites

- Node.js v16+
- Git
- MongoDB Atlas account (free tier)
- Vercel account (free)
- Render account (free)

---

## 1. MongoDB Atlas Setup

1. Go to https://www.mongodb.com/atlas and sign up
2. Create a **Free M0 Cluster** (default settings)
3. Under **Database Access** → Add New Database User → Set username/password
4. Under **Network Access** → Add IP → `0.0.0.0/0` (Allow from anywhere)
5. Click **Connect** → **Drivers** → Copy connection string
6. Replace `<password>` with your actual password
7. Replace `/?retryWrites...` with `/titan_fitness?retryWrites=true&w=majority`

Final string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/titan_fitness?retryWrites=true&w=majority
```

---

## 2. Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/titan_fitness?retryWrites=true&w=majority
JWT_SECRET=<random-64-char-hex-string>
ADMIN_EMAIL=admin@titanfitness.com
ADMIN_PASSWORD=admin123
```

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
WDS_SOCKET_PORT=3000
```

For production, change `REACT_APP_API_URL` to your Render backend URL.

---

## 3. Backend Deployment (Render)

1. Push code to GitHub
2. Go to https://render.com → New+ → Web Service
3. Connect your GitHub repo
4. Configure:

| Setting | Value |
|---------|-------|
| Name | `titan-fitness-api` |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |
| Plan | Free |

5. Add Environment Variables:

| Key | Value |
|-----|-------|
| MONGODB_URI | Your MongoDB Atlas connection string |
| JWT_SECRET | Random 64-char hex string |
| ADMIN_EMAIL | admin@titanfitness.com |
| ADMIN_PASSWORD | admin123 |
| NODE_VERSION | 18 |

6. Click **Create Web Service** (wait 3-5 minutes)
7. You'll get a URL: `https://titan-fitness-api.onrender.com`

---

## 4. Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to https://vercel.com → Add New → Project
3. Import your GitHub repo
4. Configure:

| Setting | Value |
|---------|-------|
| Framework Preset | Create React App |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `build` |

5. Add Environment Variable:

| Key | Value |
|-----|-------|
| REACT_APP_API_URL | `https://titan-fitness-api.onrender.com/api` |

6. Click **Deploy**
7. You'll get a URL: `https://titan-fitness.vercel.app`

---

## 5. Domain Connection

### Vercel (Frontend)
1. Go to your project → Settings → Domains
2. Add your domain (e.g., `titanfitness.com`)
3. Follow Vercel's DNS instructions

### Render (Backend)
1. Go to your service → Settings → Custom Domain
2. Add `api.titanfitness.com`
3. Add CNAME record at your DNS provider pointing to `titan-fitness-api.onrender.com`

---

## 6. Post-Deployment Checklist

- [ ] Visit frontend URL — pages load correctly
- [ ] Visit `/admin` — login page renders
- [ ] Login with admin credentials — dashboard loads
- [ ] Check API health: `https://titan-fitness-api.onrender.com/api/health`
- [ ] Test contact form submission
- [ ] Test admin CRUD (trainers, plans, testimonials)
- [ ] Check mobile responsiveness
- [ ] Verify Open Graph tags render on social media
- [ ] Update `REACT_APP_API_URL` on Vercel if needed and redeploy

---

## 7. Updating After Deployment

### Frontend
```bash
# Make changes, then:
cd frontend
npm run build
# Commit and push — Vercel auto-deploys
```

### Backend
```bash
# Make changes, commit, push — Render auto-deploys
```

### Content Updates (No Code Changes)
- Admin Panel → Trainers → Add/Edit/Delete trainers
- Admin Panel → Plans → Add/Edit/Delete plans
- Admin Panel → Testimonials → Add/Edit/Delete testimonials
- Admin Panel → Contacts → View/Delete contact submissions

---

## 8. Default Admin Credentials

- URL: `https://your-domain.com/admin`
- Email: `admin@titanfitness.com`
- Password: `admin123`

**Change password after first login.**

---

## 9. Troubleshooting

| Problem | Solution |
|---------|----------|
| API returns 500 | Check MongoDB Atlas IP whitelist and connection string |
| CORS errors | Ensure `cors()` middleware is in `server.js` |
| Blank page | Check browser console for errors; verify build succeeded |
| Images not loading | Unsplash URLs might be rate-limited; replace with local images |
| Admin login fails | Check `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars on Render |
