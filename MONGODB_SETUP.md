# MongoDB Setup Guide

## Error: `ECONNREFUSED ::1:27017`

This error means MongoDB is not running on your local machine. Here are two solutions:

---

## Solution 1: Use MongoDB Atlas (Cloud) - RECOMMENDED ⭐

MongoDB Atlas is free and doesn't require local installation.

### Step 1: Create a Free MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (no credit card required)
3. Choose the **FREE** tier (M0)

### Step 2: Create a Cluster

1. After signing up, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider and region (choose the closest to you)
4. Click **"Create"**
5. Wait 1-3 minutes for the cluster to be created

### Step 3: Create Database User

1. In the **Security** → **Database Access** section
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username (e.g., `leafnote_user`)
5. Enter a password (save this password!)
6. Set privileges to **"Atlas admin"** or **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Whitelist Your IP Address

1. In the **Security** → **Network Access** section
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development) OR add your current IP
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and version **"5.5 or later"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update .env.local

Replace the connection string with your Atlas connection string:

```env
MONGODB_URI=mongodb+srv://leafnote_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/leafnote?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-this-in-production-min-32-chars
NEXTAUTH_URL=http://localhost:3000
```

**Important:** 
- Replace `YOUR_PASSWORD` with the password you created in Step 3
- Replace `cluster0.xxxxx` with your actual cluster address
- The database name `leafnote` will be created automatically

### Step 7: Restart Your Server

```bash
npm run dev
```

---

## Solution 2: Install and Run Local MongoDB

### Option A: MongoDB Community Server (Full Installation)

#### Windows:

1. **Download MongoDB:**
   - Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Select Windows, MSI package
   - Click Download

2. **Install MongoDB:**
   - Run the installer
   - Choose **"Complete"** installation
   - Check **"Install MongoDB as a Service"**
   - Check **"Run service as Network Service user"**
   - Install MongoDB Compass (GUI tool) - optional but recommended
   - Click **"Install"**

3. **Verify Installation:**
   - MongoDB should start automatically as a Windows service
   - Open PowerShell and run:
     ```powershell
     mongosh
     ```
   - If it connects, MongoDB is running!

4. **If MongoDB doesn't start automatically:**
   - Open Services (Win + R, type `services.msc`)
   - Find **"MongoDB"** service
   - Right-click → **Start**

#### macOS:

1. **Using Homebrew (Recommended):**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. **Verify:**
   ```bash
   mongosh
   ```

#### Linux (Ubuntu/Debian):

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

### Option B: MongoDB Docker (Easier)

If you have Docker installed:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

To stop:
```bash
docker stop mongodb
```

To start again:
```bash
docker start mongodb
```

### Verify Local MongoDB Connection

After installation, test the connection:

```bash
mongosh
# or
mongo  # (older versions)
```

If it connects, you're good! Your `.env.local` should have:

```env
MONGODB_URI=mongodb://localhost:27017/leafnote
```

---

## Quick Test

After setting up MongoDB (either Atlas or local), test the connection:

```bash
# Restart your Next.js server
npm run dev
```

If you see no connection errors, MongoDB is connected! 🎉

---

## Troubleshooting

### Still getting connection errors?

1. **Check if MongoDB is running (local only):**
   ```bash
   # Windows
   netstat -ano | findstr :27017
   
   # Mac/Linux
   lsof -i :27017
   ```

2. **Check your .env.local file:**
   - Make sure it's in the root directory
   - No extra spaces or quotes around values
   - Restart the server after changing .env.local

3. **For MongoDB Atlas:**
   - Make sure your IP is whitelisted
   - Double-check username and password
   - Verify the connection string format

4. **Try connecting directly:**
   ```bash
   # For local MongoDB
   mongosh mongodb://localhost:27017/leafnote
   
   # For Atlas (replace with your connection string)
   mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/leafnote"
   ```

---

## Recommendation

**For beginners:** Use **MongoDB Atlas** (Solution 1) - it's easier, free, and doesn't require local installation.

**For advanced users:** Use local MongoDB if you prefer having the database on your machine.

