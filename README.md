# Plio Backend API

A backend service for searching torrents from multiple providers.

## Features

- Search torrents from multiple providers
- Filter by category
- Simple and efficient API
- Built with Node.js and Express

## Deployment

This application is configured to be deployed on Vercel. Follow these steps to deploy:

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. For subsequent deployments, use:
   ```bash
   vercel --prod
   ```

## Environment Variables

No environment variables are required for basic functionality.

## API Endpoints

- `GET /api/search?q=<query>&type=<category>&limit=<number>`
  - Search for torrents
  - Parameters:
    - `q`: Search query (required)
    - `type`: Category (optional, default: 'all')
    - `limit`: Number of results (optional, default: 30)

- `GET /health`
  - Health check endpoint

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. The server will be available at `http://localhost:3000`

## License

ISC
