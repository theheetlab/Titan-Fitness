<div align="center">

# 🏋️ Titan Fitness — Premium Gym Website

**A complete, production-ready gym website** built with React, Node.js, Express & MongoDB

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node-18-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-e63946)

---

### 🌐 [Live Demo](https://your-site.netlify.app) &nbsp;·&nbsp; 🔐 [Admin Panel](/admin) &nbsp;·&nbsp; 📖 [API Docs](#api-endpoints)

</div>

---

## ✨ Features at a Glance

### 🎨 Frontend
- ⚡ **Hero Section** — Bold animated landing with stats counter
- 🧭 **Responsive Navbar** — Mobile hamburger menu with smooth transitions
- 💪 **Why Choose Us** — Feature cards with hover effects
- 💳 **Membership Plans** — Pricing tiers with "Popular" badge
- 👨‍🏫 **Trainer Profiles** — Avatars, specializations & experience
- ⭐ **Testimonials** — Star ratings & member reviews
- 🖼️ **Gallery** — Image grid with lightbox viewer
- 📬 **Contact Form** — Validated form with backend storage
- 🌙 **Dark Theme** — Premium dark UI with red accents
- 📱 **Fully Responsive** — Mobile, tablet & desktop

### ⚙️ Backend
- 🧠 **MVC Architecture** — Clean controllers, models & routes
- 🔐 **JWT Auth** — Secure admin authentication
- 🗄️ **MongoDB Atlas** — Cloud database with Mongoose ODM
- ✅ **Input Validation** — Sanitized & validated requests
- 🚨 **Error Handling** — Centralized error middleware
- 🌱 **Auto Seed** — Default admin + sample data on first run

### 🔑 Admin Panel (`/admin`)
| Page | What You Can Do |
|------|----------------|
| 📊 **Dashboard** | View stats & recent contacts |
| ✉️ **Contacts** | Read & delete form submissions |
| 👤 **Trainers** | Add / Edit / Delete trainers |
| 💰 **Plans** | Manage membership pricing |
| ⭐ **Testimonials** | Curate member reviews |

> Login: `admin@titanfitness.com` / `admin123`

---

## 🧱 Tech Stack

```
Frontend             Backend              Database
─────────            ───────              ────────
React 18             Node.js 18           MongoDB Atlas
React Router 6       Express 4            Mongoose 7
Axios                JWT (jsonwebtoken)   bcryptjs
Modern CSS (no lib)  express-validator
```

---

## 📁 Project Structure

```
titan-fitness/
├── 📂 backend/
│   ├── 📂 config/          # Database connection
│   ├── 📂 controllers/     # Route handlers
│   ├── 📂 middleware/       # Auth guard
│   ├── 📂 models/          # Mongoose schemas
│   ├── 📂 routes/          # API route definitions
│   ├── 📂 utils/           # Seed scripts
│   ├── 📄 server.js        # Entry point
│   └── 📄 package.json
├── 📂 frontend/
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 components/  # Reusable UI (Navbar, Hero, etc.)
│   │   ├── 📂 pages/       # Route pages (Home, About, etc.)
│   │   │   └── 📂 admin/   # Dashboard, Login, Contacts...
│   │   ├── 📂 layouts/     # MainLayout, AdminLayout
│   │   ├── 📂 hooks/       # Custom React hooks
│   │   ├── 📂 services/    # Axios API client
│   │   ├── 📂 styles/      # Global CSS
│   │   ├── 📄 App.jsx      # Router config
│   │   └── 📄 index.js     # Entry point
│   └── 📄 package.json
├── 📄 deploy_info.md       # Deployment guide
└── 📄 README.md            # You are here ✨
```

---

## 🚀 Run Locally (5 minutes)

### Prerequisites
- Node.js **v16+**
- MongoDB Atlas account ([free tier](https://mongodb.com/atlas))
- Git

### 1️⃣ Clone & install

```bash
git clone https://github.com/your-username/titan-fitness.git
cd titan-fitness
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/titan_fitness?retryWrites=true&w=majority
JWT_SECRET=your_random_64_char_hex_string
ADMIN_EMAIL=admin@titanfitness.com
ADMIN_PASSWORD=admin123
```

> 💡 **Generate a JWT_SECRET:** `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

```bash
npm run dev     # starts on http://localhost:5000
```

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
npm start       # starts on http://localhost:3000
```

### 4️⃣ Open the site

| URL | What |
|-----|------|
| `http://localhost:3000` | 🏠 Main website |
| `http://localhost:3000/admin` | 🔐 Admin panel |
| `http://localhost:5000/api/health` | ❤️ Backend health check |

---

## 📡 API Endpoints

### Public (no auth needed)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/trainers` | List trainers |
| `GET` | `/api/trainers/:id` | Get one trainer |
| `GET` | `/api/membership-plans` | List plans |
| `GET` | `/api/testimonials` | List testimonials |
| `POST` | `/api/contacts` | Submit contact form |

### Protected (JWT required)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/auth/login` | Admin login |
| `GET` | `/api/auth/verify` | Verify token |
| `GET` | `/api/contacts` | List contacts |
| `DELETE` | `/api/contacts/:id` | Delete contact |
| `POST` | `/api/trainers` | Create trainer |
| `PUT` | `/api/trainers/:id` | Update trainer |
| `DELETE` | `/api/trainers/:id` | Delete trainer |
| `POST` | `/api/membership-plans` | Create plan |
| `PUT` | `/api/membership-plans/:id` | Update plan |
| `DELETE` | `/api/membership-plans/:id` | Delete plan |
| `POST` | `/api/testimonials` | Create testimonial |
| `PUT` | `/api/testimonials/:id` | Update testimonial |
| `DELETE` | `/api/testimonials/:id` | Delete testimonial |

> 🔑 **Protected routes** need header: `Authorization: Bearer <your_jwt_token>`

---

## 🌍 Deployment

### Quick picks

| Part | Platform | How |
|------|----------|-----|
| 🖥️ **Frontend** | [Netlify](https://netlify.com) or [Vercel](https://vercel.com) | Build: `npm run build`, Publish: `build/` |
| ⚙️ **Backend** | [Render](https://render.com) (free) | Web Service → root: `backend`, start: `node server.js` |
| 🗃️ **Database** | MongoDB Atlas (already cloud) | Whitelist `0.0.0.0/0` in Network Access |

> 📘 **Full step-by-step guide** → [`deploy_info.md`](./deploy_info.md)

---

## 🤝 Contributing

1. 🍴 Fork the repo
2. 🌿 Create your branch: `git checkout -b feature/awesome`
3. 💾 Commit: `git commit -m "Add awesome feature"`
4. 📤 Push: `git push origin feature/awesome`
5. 🔁 Open a Pull Request

---

## 📄 License

**MIT** — free to use, modify, and distribute.

---

<div align="center">

**Made with ❤️ for the iron community**

[⬆ Back to top](#-titan-fitness--premium-gym-website)

</div>
