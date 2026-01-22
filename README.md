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
- Supabase account (for PostgreSQL database)
- Git & GitHub account

---

# 🖥️ LOCAL DEVELOPMENT

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database (MySQL Local)

Edit `backend/.env.local`:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/vercel_crud"
```

⚠️ **For Local Development with MySQL**, update `backend/prisma/schema.prisma`:
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

# 🚀 VERCEL + SUPABASE DEPLOYMENT GUIDE

Complete step-by-step guide to deploy your application on Vercel with Supabase PostgreSQL database.

---

## 📝 STEP 1: Create Accounts

### 1.1 Create Vercel Account
1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account
5. Complete the signup process

### 1.2 Create Supabase Account
1. Go to **[supabase.com](https://supabase.com)**
2. Click **"Start your project"** or **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Supabase to access your GitHub account
5. Complete the signup process

### 1.3 Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

Then login:
```bash
vercel login
```

---

## 🗄️ STEP 2: Create Supabase PostgreSQL Database

### 2.1 Create New Project
1. Go to **[supabase.com/dashboard](https://supabase.com/dashboard)**
2. Click **"New Project"**

### 2.2 Configure Project
Fill in the details:
- **Name**: `vercel-crud` (or any name you prefer)
- **Database Password**: Create a strong password (📝 **Save this!**)
- **Region**: Choose closest to your users:
  - `Southeast Asia (Singapore)` - For Sri Lanka/Asia
  - `West EU (Ireland)` - For Europe
  - `East US (North Virginia)` - For USA
- **Pricing Plan**: Free tier is enough for learning

### 2.3 Create Project
1. Click **"Create new project"**
2. Wait 1-2 minutes for project setup
3. You'll be redirected to the project dashboard

### 2.4 Get Database Connection String

#### Method 1: Connection String (Recommended)
1. In your Supabase project dashboard
2. Click **"Project Settings"** (gear icon) in the sidebar
3. Click **"Database"** in the settings menu
4. Scroll to **"Connection string"** section
5. Select **"URI"** tab
6. Copy the connection string:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

#### Method 2: Connection Pooler (For Serverless - Better for Vercel)
1. In **"Database"** settings
2. Go to **"Connection Pooling"** section
3. Copy the **"Connection string"** with pooler:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

### 2.5 Important Connection String Details

| Part | Example | Description |
|------|---------|-------------|
| Protocol | `postgresql://` | Database type |
| User | `postgres.[ref]` | Your project user |
| Password | `[YOUR-PASSWORD]` | Password you created |
| Host | `aws-0-ap-southeast-1.pooler.supabase.com` | Supabase server |
| Port | `6543` | Pooler port (or `5432` for direct) |
| Database | `postgres` | Default database |

⚠️ **Replace `[YOUR-PASSWORD]`** with the actual password you created in Step 2.2!

---

## 🔄 STEP 3: Update Schema for PostgreSQL

### 3.1 Update Prisma Schema
Edit `backend/prisma/schema.prisma`:

```prisma
// Prisma Schema for CRUD Application
// PostgreSQL for Vercel/Supabase deployment

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// User Model
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

// Post Model
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3.2 Update Backend Environment File
Edit `backend/.env`:

```env
# Supabase PostgreSQL - Pooled Connection (for queries)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase PostgreSQL - Direct Connection (for migrations)
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

⚠️ **Replace with your actual Supabase connection strings!**

### 3.3 Run Migration to Supabase
```bash
cd backend
npx prisma generate
npx prisma db push
```

You should see:
```
🚀 Your database is now in sync with your Prisma schema.
```

### 3.4 Verify Tables in Supabase
1. Go to Supabase Dashboard
2. Click **"Table Editor"** in sidebar
3. You should see `User` and `Post` tables

---

## 📦 STEP 4: Push Project to GitHub

### 4.1 Initialize Git Repository
```bash
cd d:\Learning\MERN\vercel-crud
git init
```

### 4.2 Check .gitignore
Make sure `.gitignore` includes:
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
git commit -m "Initial commit: Vercel CRUD with Supabase"
```

### 4.4 Create GitHub Repository
1. Go to **[github.com/new](https://github.com/new)**
2. **Repository name**: `vercel-crud`
3. Choose **Public** or **Private**
4. **DON'T** check "Add README"
5. Click **"Create repository"**

### 4.5 Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vercel-crud.git
git push -u origin main
```

---

## 🔧 STEP 5: Deploy Backend to Vercel

### 5.1 Go to Vercel Dashboard
1. Open **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **"Add New..."** → **"Project"**

### 5.2 Import GitHub Repository
1. Select your **`vercel-crud`** repository
2. Click **"Import"**

### 5.3 Configure Backend Project
1. **Project Name**: `vercel-crud-backend`
2. **Framework Preset**: **Next.js**
3. **Root Directory**: Click **"Edit"** → Select **`backend`**

### 5.4 Set Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres` |

⚠️ Use your actual Supabase connection strings!

### 5.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get URL: `https://vercel-crud-backend-xxx.vercel.app`

### 5.6 Test Backend
Open in browser:
```
https://vercel-crud-backend-xxx.vercel.app/api/users
```
Should return: `[]` (empty array)

---

## 🎨 STEP 6: Deploy Frontend to Vercel

### 6.1 Create Frontend Environment File
Create `frontend/.env.production`:

```env
VITE_API_URL=https://vercel-crud-backend-xxx.vercel.app/api
```

**Replace `xxx`** with your actual backend URL from Step 5.5.

### 6.2 Commit and Push
```bash
git add frontend/.env.production
git commit -m "Add frontend production config"
git push
```

### 6.3 Go to Vercel Dashboard
1. Open **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **"Add New..."** → **"Project"**

### 6.4 Import Same Repository Again
1. Select your **`vercel-crud`** repository
2. Click **"Import"**

### 6.5 Configure Frontend Project
1. **Project Name**: `vercel-crud-frontend`
2. **Framework Preset**: **Vite**
3. **Root Directory**: Click **"Edit"** → Select **`frontend`**

### 6.6 Deploy
1. Click **"Deploy"**
2. Wait 1-2 minutes
3. You'll get URL: `https://vercel-crud-frontend-xxx.vercel.app`

---

## 🎉 STEP 7: Test Your Application

### 7.1 Open Your Application
```
https://vercel-crud-frontend-xxx.vercel.app
```

### 7.2 Test CRUD Operations

#### Test Users:
1. Create user with name and email
2. Edit user - click "Edit"
3. Delete user - click "Delete"

#### Test Posts:
1. Click "Posts" tab
2. Select author, add title and content
3. Create, edit, and delete posts

### 7.3 Verify Data in Supabase
1. Go to Supabase Dashboard
2. Click **"Table Editor"**
3. See your data in `User` and `Post` tables!

---

## 🔧 TROUBLESHOOTING

### ❌ "Database connection failed"
**Solution**:
1. Check `DATABASE_URL` in Vercel environment variables
2. Make sure password is correct (no special characters issues)
3. Try using connection pooler URL with `?pgbouncer=true`

### ❌ "relation does not exist"
**Solution**:
Run migration again:
```bash
cd backend
npx prisma db push
```

### ❌ "Invalid `prisma.user.findMany()` invocation"
**Solution**:
1. Regenerate Prisma client:
   ```bash
   npx prisma generate
   ```
2. Redeploy on Vercel

### ❌ "CORS error" or "Network Error"
**Solution**:
1. Check `VITE_API_URL` in frontend
2. Verify backend URL is correct
3. Check backend is deployed and running

### ❌ Password Contains Special Characters
If your Supabase password has special characters, URL-encode them:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `/` | `%2F` |
| `=` | `%3D` |

Example: `pass@word` → `pass%40word`

---

## 📊 SUPABASE DASHBOARD FEATURES

### View Tables
1. Click **"Table Editor"** in sidebar
2. See all your tables and data
3. Add/edit/delete rows directly

### View Logs
1. Click **"Database"** → **"Database"**
2. See query logs and performance

### Connection Info
1. Click **"Project Settings"** → **"Database"**
2. See all connection details

---

## 🔄 LOCAL DEVELOPMENT WITH MYSQL

To develop locally with MySQL instead of Supabase:

### 1. Create `.env.local` in backend:
```env
DATABASE_URL="mysql://root:password@localhost:3306/vercel_crud"
```

### 2. Update schema for MySQL:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### 3. Regenerate and push:
```bash
npx prisma generate
npx prisma db push
```

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
    └── index.ts
```

### Backend (`backend/`)
```
├── app/api/
│   ├── users/
│   │   ├── route.ts      # GET all, POST
│   │   └── [id]/route.ts # GET, PUT, DELETE
│   └── posts/
│       ├── route.ts
│       └── [id]/route.ts
├── lib/
│   └── prisma.ts
└── prisma/
    └── schema.prisma
```

---

## 📚 USEFUL LINKS

- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Supabase Dashboard**: [supabase.com/dashboard](https://supabase.com/dashboard)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Prisma + Supabase**: [prisma.io/docs/guides/database/supabase](https://www.prisma.io/docs/guides/database/supabase)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

## 💰 PRICING

### Supabase Free Tier Includes:
- ✅ 500 MB database storage
- ✅ 2 GB bandwidth
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests
- ✅ Social auth providers

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN

---

## 📋 QUICK REFERENCE

### Environment Variables Summary

**Local Development (`.env.local`)**:
```env
DATABASE_URL="mysql://root:password@localhost:3306/vercel_crud"
```

**Vercel Backend**:
```env
DATABASE_URL="postgresql://postgres.[ref]:[password]@...pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@...pooler.supabase.com:5432/postgres"
```

**Vercel Frontend (`.env.production`)**:
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

### Important Commands
```bash
# Install dependencies
npm install

# Local development
npm run dev

# Database
npx prisma generate    # Generate client
npx prisma db push     # Push schema
npx prisma studio      # View data

# Deploy (auto via git push)
git add .
git commit -m "Update"
git push
```

---

## 📝 License

MIT

---

**🎉 Happy Deploying with Vercel + Supabase!** 🚀
