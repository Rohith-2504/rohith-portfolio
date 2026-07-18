# Deploy on Vercel

The Next.js app is at the **repository root** (`src/app/`).

## Vercel setup

1. Import `Rohith-2504/rohith-portfolio`
2. **Root Directory:** leave empty (repo root)
3. Deploy — Vercel auto-detects Next.js

## Environment variables (optional)

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | Your deployed FastAPI URL |

## Local dev

```bash
npm install
npm run dev          # Next.js on :3000
npm run dev:api      # FastAPI on :8000
```

## RAG API

Deploy the `api/` folder separately (Railway, Render, etc.).
