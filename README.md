# Titan Fitness - Premium Gym Website

A complete, production-ready premium gym website built with React.js, Node.js, Express, and MongoDB Atlas. Features a modern UI, full admin panel, and contact form with database storage.

## Tech Stack

- **Frontend:** React 18, React Router 6, Axios, Modern CSS
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Admin Panel:** Built into frontend with protected routes

## Features

### Frontend
- Premium Hero Section with animations
- Responsive Navbar with mobile menu
- Why Choose Us section
- Membership Plans with pricing cards
- Trainer profiles and details
- Testimonials slider
- Gallery with lightbox
- Contact form with backend integration
- About page with mission/vision
- Scroll animations and hover effects
- Professional typography and dark theme
- Fully responsive (mobile, tablet, desktop)

### Backend
- RESTful API with Express.js
- MVC Architecture
- MongoDB Atlas integration
- Contact form submission storage
- Trainer, Membership Plan, Testimonial CRUD
- Admin authentication with JWT
- Input validation
- Error handling

### Admin Panel (`/admin`)
- Secure login page
- Dashboard with stats
- View/delete contact submissions
- Add/edit/delete trainers
- Add/edit/delete membership plans
- Protected routes with JWT authentication

## Project Structure

```
titan-fitness/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── membershipController.js
│   │   ├── testimonialController.js
│   │   └── trainerController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Contact.js
│   │   ├── MembershipPlan.js
│   │   ├── Testimonial.js
│   │   └── Trainer.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── membershipRoutes.js
│   │   ├── testimonialRoutes.js
│   │   └── trainerRoutes.js
│   ├── utils/
│   │   └── seedAdmin.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── MembershipPlans.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── ContactCTA.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Membership.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Gallery.jsx
│   │   │   └── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── Login.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Contacts.jsx
│   │   │       ├── ManageTrainers.jsx
│   │   │       └── ManagePlans.jsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── info_heet.md
└── README.md
```

## How to Run Locally

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free tier)
- Git

### Step 1: Clone the repository
```bash
git clone <your-repo-url>
cd titan-fitness
```

### Step 2: Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/titan_fitness?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
ADMIN_EMAIL=admin@titanfitness.com
ADMIN_PASSWORD=admin123
```

Run the backend:
```bash
npm run dev
```

### Step 3: Setup Frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm start
```

### Step 4: Open the website
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Backend API: http://localhost:5000/api

### Admin Login Credentials
- Email: admin@titanfitness.com
- Password: admin123

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contacts` | Submit contact form | No |
| GET | `/api/contacts` | Get all contacts | Yes |
| DELETE | `/api/contacts/:id` | Delete contact | Yes |
| GET | `/api/trainers` | Get all trainers | No |
| GET | `/api/trainers/:id` | Get trainer by ID | No |
| POST | `/api/trainers` | Create trainer | Yes |
| PUT | `/api/trainers/:id` | Update trainer | Yes |
| DELETE | `/api/trainers/:id` | Delete trainer | Yes |
| GET | `/api/membership-plans` | Get all plans | No |
| POST | `/api/membership-plans` | Create plan | Yes |
| PUT | `/api/membership-plans/:id` | Update plan | Yes |
| DELETE | `/api/membership-plans/:id` | Delete plan | Yes |
| GET | `/api/testimonials` | Get all testimonials | No |
| POST | `/api/testimonials` | Create testimonial | Yes |
| PUT | `/api/testimonials/:id` | Update testimonial | Yes |
| DELETE | `/api/testimonials/:id` | Delete testimonial | Yes |
| POST | `/api/auth/login` | Admin login | No |
| GET | `/api/auth/verify` | Verify token | Yes |
| GET | `/api/health` | Health check | No |

## Deployment

### Frontend Hosting Options
- Netlify (free)
- Vercel (free)
- GitHub Pages (free)

### Backend Hosting Options
- Render (free tier)
- Railway (free tier)
- Heroku (paid)
- DigitalOcean (paid)

See `info_heet.md` for detailed deployment instructions.

## License
MIT
