![image](./docs/apartmentmap-light.jpg)

<p align="center">
 A Next TypeScript web application, SSR ready powered by Vercel and Supabase.
</p>

<br/>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#local-development"><strong>Local Development</strong></a> ·
  <a href="#documentation"><strong>Documentation</strong></a> ·
</p>
<br/>

## Features

- ⚡️ Next.js 14 (App Router)
- 💚 Supabase
- ⚛️ React 18
- ⛑ TypeScript
- Zone MUI UI Kit + Material UI v5
- 100% React Hooks
- ESLint & Prettier
- React Hook Form with Validation + Yup
- Animated Framer Motion
- Image Lazy loading
- Fully responsive, and works across all modern/supported browsers & devices

## Local Development

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

3. You can now run the Next.js local development server:

   ```bash
   pnpm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

# Documentation

### Requirements

- Node.js >= 18.17.0



