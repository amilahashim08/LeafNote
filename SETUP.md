# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/leafnote
JWT_SECRET=your-secret-key-change-this-in-production-min-32-chars
NEXTAUTH_URL=http://localhost:3000
```

**Important Notes:**
- For **local MongoDB**: Use `mongodb://localhost:27017/leafnote`
- For **MongoDB Atlas** (cloud): Replace with your Atlas connection string
- Change `JWT_SECRET` to a strong random string (at least 32 characters)

### 3. Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is installed and running
- On Windows: MongoDB usually runs as a service automatically
- On Mac/Linux: Run `mongod` in a terminal

**Option B: MongoDB Atlas (Cloud)**
- No local setup needed
- Just use your Atlas connection string in `.env.local`

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### 6. Create Your First Account

1. You'll be redirected to the login page
2. Click "Sign up" to create a new account
3. Fill in your name, email, and password
4. After registration, you'll be logged in automatically

### 7. Start Creating Notes!

- Click the green **"+"** button in the bottom-right corner
- Fill in the note title, content, and add tags
- Click **"Add"** to save your note

## Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
- Verify MongoDB is running: `mongosh` or check MongoDB Compass
- Check your `MONGODB_URI` in `.env.local`
- For Atlas: Ensure your IP is whitelisted

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Project Structure Overview

```
LeafNote/
├── app/              # Next.js App Router (pages & API routes)
├── components/       # React components
├── lib/             # Utilities (DB, Auth, Helpers)
├── models/          # Mongoose models
├── types/           # TypeScript types
└── .env.local       # Environment variables (create this)
```

## Next Steps

- ✅ Project is set up and ready to run
- ✅ All dependencies are installed
- ✅ Environment variables are configured
- ✅ MongoDB connection is established
- ✅ Authentication is working
- ✅ CRUD operations are functional

Enjoy building with LeafNote! 🚀

