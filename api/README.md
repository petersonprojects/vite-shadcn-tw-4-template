# Irregular Verbs API

This is a simple API for the Irregular Verbs application. It provides endpoints to retrieve irregular verbs and manage user scores.

## Deployment

This API is designed to be deployed on Vercel as part of a monorepo. The `vercel.json` file in the project root contains the necessary configuration for deployment.

### How to deploy

The API is deployed together with the frontend as a single Vercel project:

```
# From the project root
vercel
```

## API Endpoints

### Verbs

- `GET /api/verbs` - Get all irregular verbs
- `GET /api/verbs/random` - Get a random irregular verb
- `GET /api/verbs/:base` - Get a specific verb by its base form

### Scores

- `GET /api/scores` - Get all user scores
- `GET /api/scores/:username` - Get scores for a specific user
- `POST /api/scores` - Save a new score

#### POST /api/scores Request Body

```json
{
  "username": "string",
  "score": number,
  "timeTaken": number
}
```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

The server will run on http://localhost:3000. 