# Legal Youth Backend

Backend services for the Legal Youth prototype application.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/demo/:messageKey` - Demo messages for frontend
- `GET /api/search?q=query` - Search functionality (placeholder)

## Project Structure

```
backend/
├── server.js          # Main Express server
├── utils.js           # Shared utilities and demo messages
├── package.json       # Backend dependencies
└── README.md          # This file
```

## Development

The backend serves static files from the `../frontend` directory and provides API endpoints for the React frontend.
