# Mobile Contact Table App

This is a mobile-friendly contact manager app using React + Supabase.

## Setup

1. Create a Supabase project
2. Add the `contacts` table using SQL from `server/supabase-schema.sql`
3. Copy your Supabase URL and anon key to `client/.env`

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Deploy `client/` to Vercel or run locally:
```
cd client
npm install
npm run dev
```
