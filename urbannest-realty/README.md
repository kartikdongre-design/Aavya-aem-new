# UrbanNest Realty

Premium real estate property listing and management platform.

## Quick Start

```bash
cd urbannest-realty
npm install
npm run dev
```

- **Website:** http://localhost:3200
- **API:** http://localhost:3201

## Default Admin Login

- **Email:** `admin@urbannest.com`
- **Password:** `Admin@123`

Admin panel: http://localhost:3200/admin/login

## Features

- Modern responsive homepage with hero, search, categories, listings
- Property listings with filters (category, status, keyword)
- Property detail pages with gallery, amenities, agent, inquiry forms
- Client registration and login
- Admin dashboard with property CRUD, image upload, CMS editing
- JSON persistence (`data/properties.json`, `data/cms-content.json`, etc.)

## Project Structure

```
urbannest-realty/
├── data/           # JSON data stores
├── server/         # Express API
├── shared/         # Shared validation
└── src/            # React frontend
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API + Vite dev server |
| `npm run dev:api` | API only |
| `npm run build` | Production build |
