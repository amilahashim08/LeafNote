# LeafNote (frontend)

Next.js UI for LeafNote. API routes are served by a separate [LeafNote backend](../LeafNote-backend).

## Run locally (two terminals)

1. **Backend** (port 4000 by default)

```bash
cd ../LeafNote-backend
cp .env.local.example .env
# set MONGODB_URI, JWT_SECRET
npm install
npm run dev
```

2. **Frontend** (port 3000)

```bash
cd LeafNote-frontend
cp .env.local.example .env.local
# optional: BACKEND_URL=http://127.0.0.1:4000
npm install
npm run dev
```

The Next.js dev server proxies `/api/*` to the backend via `next.config.mjs` rewrites, so the browser can keep using `/api/...` URLs and auth cookies on `localhost:3000`.

## Deploying

- Deploy **LeafNote-frontend** to Vercel (or any Next host) and set `BACKEND_URL` to your production API base URL.
- Deploy **LeafNote-backend** to Railway/Render/fly.io/etc. Set `MONGODB_URI`, `JWT_SECRET`, `PORT`, and `FRONTEND_URL` (your real site URL) for CORS.
