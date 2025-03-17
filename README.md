# Irregular Verbs Learning App

A React application for learning irregular verbs with a Vercel-hosted API backend.

## Project Structure

This project is structured as follows:

```
/
├── src/                # Frontend React application
│   ├── components/     # React components
│   ├── api.ts          # API client for connecting to the backend
│   └── ...
├── api/                # Backend API for Vercel deployment
│   ├── index.js        # Express server
│   └── ...
├── vercel.json         # Vercel configuration for monorepo deployment
└── ...
```

## Frontend (React)

The frontend is a React application built with:
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Backend (Vercel API)

The backend is an Express.js API designed to be deployed on Vercel:
- Express.js server
- RESTful API endpoints
- Vercel serverless functions

## Development

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### API

```bash
# Navigate to API directory
cd api

# Install dependencies
npm install

# Start API development server
npm run dev
```

## Deployment

This project is set up as a monorepo for deployment to Vercel. The `vercel.json` file in the root directory configures both the frontend and API to be deployed together.

```bash
# Deploy the entire project to Vercel
vercel
```

With this setup:
- The frontend will be served from the root URL (e.g., `https://your-app.vercel.app/`)
- The API will be served from the `/api` path (e.g., `https://your-app.vercel.app/api/verbs`)

## API Endpoints

- `GET /api/verbs` - Get all irregular verbs
- `GET /api/verbs/random` - Get a random irregular verb
- `GET /api/verbs/:base` - Get a specific verb by its base form
- `GET /api/scores` - Get all user scores
- `GET /api/scores/:username` - Get scores for a specific user
- `POST /api/scores` - Save a new score

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# For development
VITE_API_URL=http://localhost:3000

# For production with monorepo deployment
# For production
# VITE_API_URL=https://your-vercel-api-url.vercel.app
```
