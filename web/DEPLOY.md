# Deploy on Vercel

The Next.js app lives in **`web/`**.

## One-time Vercel setup

1. Import `Rohith-2504/rohith-portfolio` on [vercel.com](https://vercel.com)
2. **Settings → General → Root Directory** → set to **`web`**
3. Save, then redeploy

Vercel will auto-detect Next.js from `web/package.json`.

## Environment variables (optional)

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | Your deployed FastAPI URL (Railway/Render) |

Without this, the site works — only the AI chat needs the API running.

## Local dev

```bash
npm run dev          # Next.js on :3000
npm run dev:api      # FastAPI on :8000
```

## RAG API (separate host)

Deploy the `api/` folder to Railway, Render, or similar. Point `NEXT_PUBLIC_API_URL` at that URL in Vercel.
