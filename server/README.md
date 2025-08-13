# Server Deployment Notes (Railway)

## Railway
- Service type: Node.js
- Start command: `node server.js` (package.json runs a DB sync before start)
- Port: 4000 (Railway sets `PORT`, app already reads it)

Environment variables:
- `DATABASE_URL` (PostgreSQL connection string from Railway)
- `JWT_SECRET` (choose a strong secret)
- `FRONTEND_URLS` (comma-separated, e.g. `https://<your-vercel-app>.vercel.app,https://<your-domain>`) 

Initial table creation:
- On first deploy, the app runs `scripts/sync.js` automatically via `npm start` to create/alter tables as needed.
- If needed, you can run a one-off sync in the Railway console: `npm run sync`.

Provision a PostgreSQL plugin on Railway and connect it to the service; Railway will populate `DATABASE_URL`.

Socket.IO works through standard HTTP(S); ensure your Vercel frontend points to your Railway backend for both API and websocket (same base URL).