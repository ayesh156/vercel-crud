# Vercel CRUD Application - Monorepo

A **world-class** full-stack CRUD application with separated **React Frontend** and **Next.js Backend API**.

## 🏗️ Architecture

```
vercel-crud/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── types/         # TypeScript types
│   └── ...
├── backend/           # Next.js API Server
│   ├── app/
│   │   └── api/          # API routes
│   ├── lib/              # Utilities (Prisma client)
│   └── prisma/           # Database schema
├── shared/            # Shared types between frontend & backend
└── package.json       # Monorepo workspace config
```

## 🚀 Features

- **Monorepo Structure**: Frontend and Backend in separate folders
- **React Frontend**: Vite + TypeScript + Tailwind CSS
- **Next.js Backend**: API Routes with TypeScript
- **Prisma ORM**: PostgreSQL/MySQL support
- **Clean Architecture**: Services, Hooks, Components separation
- **Type Safety**: Shared types across the stack

## 📋 Prerequisites

- Node.js 18+
- MySQL database (local development)
- npm (v7+ for workspaces)
- Vercel account (for deployment)
- Git & GitHub account

---

# 🖥️ LOCAL DEVELOPMENT

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database (MySQL Local)

Edit `backend/.env`:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/vercel_crud"
```

⚠️ **Important**: Make sure `backend/prisma/schema.prisma` has:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### 3. Setup Database

```bash
npm run db:push
```

### 4. Run Development Servers

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both frontend and backend |
| `npm run dev:frontend` | Run only frontend |
| `npm run dev:backend` | Run only backend |
| `npm run build` | Build both apps |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Prisma Studio |

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create user |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create post |
| GET | `/api/posts/:id` | Get post by ID |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

---

# 🚀 VERCEL DEPLOYMENT GUIDE

Complete step-by-step guide to deploy your application on Vercel.

---

## 📝 STEP 1: Create Vercel Account

### 1.1 Sign Up
1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account
5. Complete the signup process

### 1.2 Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

Then login:
```bash
vercel login
```
- Choose GitHub
- Browser will open for authentication

---

## 🗄️ STEP 2: Create Vercel Postgres Database

### 2.1 Open Vercel Dashboard
1. Go to **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **"Storage"** in the top navigation bar

### 2.2 Create Database
1. Click **"Create Database"** button
2. Select **"Postgres"** (Powered by Neon)
3. Click **"Continue"**

### 2.3 Configure Database Settings
- **Database Name**: `vercel-crud-db` (or any name you prefer)
- **Region**: Choose closest to your target users
  - `Washington, D.C., USA (iad)` - US East
  - `San Francisco, USA (sfo)` - US West  
  - `Frankfurt, Germany (fra)` - Europe
  - `Singapore (sin)` - Asia
- Click **"Create"**

### 2.4 Save Database Connection String
1. After creation, you'll see the database dashboard
2. Go to **"Quickstart"** tab
3. Under **"Postgres"**, you'll see connection strings
4. Copy the **"Postgres URL"** (pooled connection):
   ```
   postgres://default:xxxxx@ep-xxxxx.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require
   ```
5. **📝 Save this somewhere safe** - you'll need it!

> ⚠️ **Note**: Keep this connection string private!

---

## 🔄 STEP 3: Update Schema for PostgreSQL

Since we're using MySQL locally but PostgreSQL on Vercel, update the schema:

### 3.1 Update Prisma Schema
Edit `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from mysql
  url      = env("DATABASE_URL")
}
```

### 3.2 Create Temporary Environment File
Create `backend/.env.production.local` (for migration only):

```env
DATABASE_URL="postgres://default:xxxxx@ep-xxxxx.aws.neon.tech:5432/verceldb?sslmode=require"
```
Replace with your actual connection string from Step 2.4.

### 3.3 Run Migration to Vercel Database
```bash
cd backend
npx prisma generate
npx prisma db push
```

You should see:
```
✅ The database is now in sync with your schema.
```

### 3.4 Verify Tables (Optional)
```bash
npx prisma studio
```
- This opens a web UI to view your Vercel database
- You should see `User` and `Post` tables (empty)

### 3.5 Revert Back to MySQL for Local Development
Edit `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"  // Back to mysql for local dev
  url      = env("DATABASE_URL")
}
```

Then regenerate:
```bash
npx prisma generate
cd ..
```

---

## 📦 STEP 4: Push Project to GitHub

### 4.1 Initialize Git Repository
```bash
cd d:\Learning\MERN\vercel-crud
git init
```

### 4.2 Create .gitignore
Make sure `.gitignore` exists with:
```
node_modules/
.env
.env.local
.env.production.local
.next/
dist/
build/
.vercel
```

### 4.3 Commit Your Code
```bash
git add .
git commit -m "Initial commit: Vercel CRUD with React + Next.js + Prisma"
```

### 4.4 Create GitHub Repository
1. Go to **[github.com/new](https://github.com/new)**
2. **Repository name**: `vercel-crud` (or any name)
3. **Description**: "Full-stack CRUD app with React, Next.js, and Prisma"
4. Choose **Public** or **Private**
5. **DON'T** check "Add README" (we already have one)
6. Click **"Create repository"**

### 4.5 Push to GitHub
Copy the commands from GitHub (replace with your username):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vercel-crud.git
git push -u origin main
```

**✅ Your code is now on GitHub!**

---

## 🔧 STEP 5: Deploy Backend to Vercel

### 5.1 Go to Vercel Dashboard
1. Open **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **"Add New..."** → **"Project"**

### 5.2 Import GitHub Repository
1. You'll see **"Import Git Repository"**
2. If your repo doesn't appear, click **"Adjust GitHub App Permissions"**
3. Select your **`vercel-crud`** repository
4. Click **"Import"**

### 5.3 Configure Backend Project
1. **Framework Preset**: Select **"Next.js"**
2. **Root Directory**: Click **"Edit"** → Select **`backend`**
3. **Project Name**: `vercel-crud-backend` (or any name)

### 5.4 Set Environment Variables
Click **"Environment Variables"** section:

Add the following:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgres://default:xxxxx@ep-xxxxx.aws.neon.tech:5432/verceldb?sslmode=require` |

- Paste your Vercel Postgres connection string from Step 2.4
- Make sure to select all environments: **Production**, **Preview**, **Development**

### 5.5 Deploy
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. You'll see: **"🎉 Your project has been deployed"**

### 5.6 Get Backend URL
After deployment:
- You'll see your backend URL: `https://vercel-crud-backend-xxx.vercel.app`
- **📝 Copy this URL** - you'll need it for the frontend!

### 5.7 Test Backend API
Open in browser:
```
https://vercel-crud-backend-xxx.vercel.app/api/users
```
Should return: `[]` (empty array)

**✅ Backend is deployed!**

---

## 🎨 STEP 6: Deploy Frontend to Vercel

### 6.1 Create Frontend Environment File
Create `frontend/.env.production`:

```env
VITE_API_URL=https://vercel-crud-backend-xxx.vercel.app/api
```
**Important**: Replace `xxx` with your actual backend URL from Step 5.6.

### 6.2 Commit Environment File
```bash
git add frontend/.env.production
git commit -m "Add production environment config"
git push
```

### 6.3 Go to Vercel Dashboard
1. Open **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **"Add New..."** → **"Project"**

### 6.4 Import Same Repository Again
1. Select your **`vercel-crud`** repository again
2. Click **"Import"**

### 6.5 Configure Frontend Project
1. **Framework Preset**: Select **"Vite"**
2. **Root Directory**: Click **"Edit"** → Select **`frontend`**
3. **Project Name**: `vercel-crud-frontend` (or any name)

### 6.6 Set Build Settings
Build settings should be auto-detected:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 6.7 Deploy
1. Click **"Deploy"**
2. Wait for build to complete (1-2 minutes)
3. You'll see: **"🎉 Your project has been deployed"**

### 6.8 Get Frontend URL
After deployment:
- You'll see your frontend URL: `https://vercel-crud-frontend-xxx.vercel.app`
- This is your live application!

**✅ Frontend is deployed!**

---

## 🎉 STEP 7: Test Your Deployed Application

### 7.1 Open Your Application
Go to your frontend URL:
```
https://vercel-crud-frontend-xxx.vercel.app
```

### 7.2 Test CRUD Operations

#### Test Users:
1. **Create User**:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Click **"Create User"**
2. **Verify**: User should appear in the list on the right
3. **Edit User**: Click "Edit", change name, save
4. **Delete User**: Click "Delete" (confirm dialog)

#### Test Posts:
1. Click **"Posts"** tab
2. **Create Post**:
   - Select a user as author
   - Title: `My First Post`
   - Content: `This is deployed on Vercel!`
   - Check "Published"
   - Click **"Create Post"**
3. **Verify**: Post appears in the list
4. **Edit/Delete**: Test edit and delete operations

### 7.3 Verify Data Persistence
1. Refresh the page - data should persist
2. Open in incognito/private window - data should still be there
3. Check from another device - should see same data

**🎊 Congratulations! Your app is live on Vercel!**

---

## 🔄 STEP 8: Enable Automatic Deployments

### 8.1 Connect Git for Auto-Deploy
Your projects are already connected! Every time you push to GitHub:
- Commits to `main` → Production deployment
- Pull requests → Preview deployments

### 8.2 Test Auto-Deploy
1. Make a small change locally (e.g., update a text)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update homepage text"
   git push
   ```
3. Go to Vercel Dashboard
4. You'll see automatic deployment in progress
5. Wait 1-2 minutes
6. Your changes are live!

---

## 🔧 TROUBLESHOOTING

### ❌ Problem: "Database connection failed"
**Solution**: 
1. Check `DATABASE_URL` in Vercel project settings
2. Make sure it starts with `postgres://` (not `mysql://`)
3. Redeploy the backend

### ❌ Problem: "API not found" (404 on /api/users)
**Solution**:
1. Check backend deployment logs in Vercel dashboard
2. Make sure `ROOT_DIRECTORY` is set to `backend`
3. Verify build completed successfully

### ❌ Problem: Frontend shows "Network Error"
**Solution**:
1. Check `VITE_API_URL` in frontend `.env.production`
2. Make sure backend URL is correct
3. Check CORS is enabled in `backend/next.config.js` (already configured)
4. Redeploy frontend

### ❌ Problem: "Prisma Client not generated"
**Solution**:
```bash
cd backend
npx prisma generate
git add .
git commit -m "Regenerate Prisma client"
git push
```

### ❌ Problem: Build fails on Vercel
**Solution**:
1. Check build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version (should be 18+)

---

## 📊 MONITORING YOUR APPLICATION

### View Logs
1. Go to Vercel Dashboard
2. Click your project
3. Go to **"Logs"** tab
4. See real-time logs of your application

### View Analytics
1. Go to project → **"Analytics"** tab
2. See visitor count, page views, etc.

### View Deployment History
1. Go to project → **"Deployments"** tab
2. See all deployments
3. Rollback to previous version if needed

---

## 🔄 UPDATING YOUR APPLICATION

### Method 1: Push to GitHub (Automatic)
```bash
# Make your changes
git add .
git commit -m "Add new feature"
git push
```
Vercel automatically deploys!

### Method 2: Redeploy from Dashboard
1. Go to Vercel Dashboard → Your Project
2. Go to **"Deployments"** tab
3. Click ⋯ on latest deployment
4. Click **"Redeploy"**

---

## 🌍 CUSTOM DOMAIN (Optional)

### Add Your Own Domain
1. Go to Vercel Project → **"Settings"**
2. Click **"Domains"**
3. Add your domain (e.g., `myapp.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-10 minutes)

---

## 💰 PRICING

### Free Plan Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth
- ✅ 6,000 build minutes/month
- ✅ Automatic HTTPS
- ✅ Global CDN

**Perfect for learning and personal projects!**

---

## 📁 PROJECT STRUCTURE

### Frontend (`frontend/src/`)
```
├── components/
│   ├── ui/           # Button, Input, Card, Loading, Toast
│   ├── layout/       # Layout wrapper
│   ├── users/        # UserForm, UserList
│   └── posts/        # PostForm, PostList
├── hooks/
│   ├── useUsers.ts   # User CRUD hook
│   ├── usePosts.ts   # Post CRUD hook
│   └── useToast.ts   # Toast notifications
├── pages/
│   ├── UsersPage.tsx
│   └── PostsPage.tsx
├── services/
│   ├── api.ts        # Axios instance
│   ├── userService.ts
│   └── postService.ts
└── types/
    └── index.ts      # TypeScript interfaces
```

### Backend (`backend/`)
```
├── app/api/
│   ├── users/
│   │   ├── route.ts      # GET all, POST
│   │   └── [id]/route.ts # GET, PUT, DELETE
│   └── posts/
│       ├── route.ts      # GET all, POST
│       └── [id]/route.ts # GET, PUT, DELETE
├── lib/
│   └── prisma.ts         # Prisma client
└── prisma/
    └── schema.prisma     # Database schema
```

---

## 📚 USEFUL LINKS

- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs**: [react.dev](https://react.dev)

---

## 🙋 SUPPORT

If you encounter any issues:
1. Check the **Troubleshooting** section above
2. Review Vercel deployment logs
3. Verify all environment variables
4. Check GitHub Actions (if configured)

---

## 📝 License

MIT

---

**🎉 Happy Deploying! Your app is now live on the internet!** 🚀

---

## 📋 QUICK REFERENCE

### Local Development URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Production URLs (Example)
- Frontend: `https://vercel-crud-frontend-xxx.vercel.app`
- Backend: `https://vercel-crud-backend-xxx.vercel.app`
- API: `https://vercel-crud-backend-xxx.vercel.app/api`

### Important Commands
```bash
# Local Development
npm install              # Install dependencies
npm run dev             # Run both servers
npm run db:push         # Push schema to database

# Deployment
git push                # Auto-deploy via GitHub
vercel                  # Manual deploy via CLI

# Database
npx prisma studio       # View database
npx prisma db push      # Push schema changes
```

### Environment Variables Summary

**Local (.env)**:
- `DATABASE_URL` = MySQL connection (local)

**Vercel Backend**:
- `DATABASE_URL` = PostgreSQL connection (Vercel Postgres)

**Vercel Frontend**:
- `VITE_API_URL` = Backend URL

---

**All Done! 🎊 You now have a production-ready full-stack application!**
