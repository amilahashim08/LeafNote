# Quick Fix for MongoDB Connection Error

## Error: `ECONNREFUSED ::1:27017`

### Fastest Solution: Use MongoDB Atlas (5 minutes)

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (free, no credit card)
3. **Create a free cluster** (M0)
4. **Create database user:**
   - Security → Database Access → Add New User
   - Username: `leafnote_user`
   - Password: (save this!)
5. **Whitelist IP:**
   - Security → Network Access → Add IP → Allow from Anywhere
6. **Get connection string:**
   - Click "Connect" on cluster
   - Choose "Connect your application"
   - Copy the connection string
7. **Update `.env.local`:**
   ```env
   MONGODB_URI=mongodb+srv://leafnote_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/leafnote?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-change-this-in-production
   ```
8. **Restart server:**
   ```bash
   npm run dev
   ```

**Done!** ✅

---

### Alternative: Install Local MongoDB

See `MONGODB_SETUP.md` for detailed instructions.

