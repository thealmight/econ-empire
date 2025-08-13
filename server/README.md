# Server Deployment Notes (Railway)

## Railway
- Service type: Node.js
- Start command: `node server.js`
- Port: 4000 (Railway sets `PORT`, app already reads it)

Environment variables:
- `DATABASE_URL` (PostgreSQL connection string from Railway)
- `JWT_SECRET` (choose a strong secret)
- `FRONTEND_URLS` (comma-separated, e.g. `https://<your-vercel-app>.vercel.app,https://<your-domain>`)

Provision a PostgreSQL plugin on Railway and connect it to the service; Railway will populate `DATABASE_URL`.

Socket.IO works through standard HTTP(S); ensure your Vercel frontend points to your Railway backend for both API and websocket (same base URL).