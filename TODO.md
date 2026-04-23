# LeafNote MongoDB Atlas IP Whitelist Fix - TODO Steps

## Updated IP Detection (Dynamic IP?)
**Latest IPs**:
- Run 1: **154.192.17.5** ❌ (test-mongo.js failed)
- Run 2: **175.107.255.89** 
- IPv6: **2400:adcc:110b:7100:b5e6:3c4e:da84:9624**

## Plan Breakdown (Approved)
1. ✅ [Complete] Multiple IP checks
2. ✅ [Complete] TODO.md tracking
3. ☐ **IMMEDIATE FIX** - Whitelist **ALL** in Atlas (dev only):
     - Login: https://cloud.mongodb.com/
     - Project → cluster0 → **Network Access** → **Add IP Address** → **"Allow Access from Anywhere" (0.0.0.0/0)** → **Confirm**
     - Wait 1-2 min for propagation
4. ☐ Test: `node test-mongo.js` (expect "Connected!")
5. ☐ App: `npm run dev` (expect "✅ MongoDB connected")
6. ☐ [Optional] Local MongoDB alt below
7. ✅ Task complete!

## Quick Atlas Steps (Screenshots Guide)
1. https://account.mongodb.com/account/login → Login
2. Browse → cluster0 → **Connect** → **Network Access** tab
3. **Add IP Address** → **Allow Access from Anywhere** → **Confirm**

## Alt: Local MongoDB (No Atlas needed)
```
docker compose up -d mongo
```
Then `.env.local`: `MONGODB_URI=mongodb://localhost:27017/leafnote`

## Status
- Cluster: cluster0.rnp8iud.mongodb.net (amilahashim07_db_user)
- test-mongo.js FAILED (IP block confirmed)
- **Action**: Add 0.0.0.0/0 NOW → retest

**Mark steps ✅ here when done.**



