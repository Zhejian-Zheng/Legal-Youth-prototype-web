## Project Structure

This project is organized into separate frontend and backend directories:

```
Legal-Youth-prototype-web/
├── backend/                 # Backend services (Node.js/Express)
│   ├── server.js           # Main Express server
│   ├── utils.js            # Shared utilities and demo messages
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend setup instructions
├── frontend/               # Static HTML files
│   ├── index.html          # Main homepage
│   ├── advanced-search.html
│   ├── ask-ai.html
│   └── ...                 # Other HTML pages
├── src/                    # React frontend application
│   ├── App.tsx
│   ├── components/
│   └── pages/
├── public/                 # React public assets
└── package.json            # Frontend dependencies
```

## Getting Started

### Option 1: React Frontend (Recommended)
```bash
# Install frontend dependencies
npm install

# Start React development server
npm start

# Open browser and visit
http://localhost:8080
```

### Option 1b: Build React + Serve via Express
```bash
# Install dependencies (if not already)
npm install

# Produce optimized SPA bundle in /build
npm run build

# Install backend deps and start API + static server
cd backend
npm install
NODE_ENV=production node server.js

# Visit the Express server (serves build + /api routes)
http://localhost:3001
```

### Tailwind CSS Workflow
```bash
# Install dependencies (already listed in package.json)
npm install

# Tailwind is compiled automatically by react-scripts
npm start        # development with live Tailwind classes
npm run build    # production bundle (output in /build)
```
Tailwind directives live in `src/index.css`. Add utility classes directly to JSX, or extend the design tokens in `tailwind.config.js` (brand/accent colors pre-defined for consistency).

### Option 2: Backend Server
```bash
# Install backend dependencies
cd backend
npm install

# Start backend server
npm start

# Open browser and visit
http://localhost:3001
```

### Option 3: Static HTML Files
```bash
# Start Python server for static files
python3 -m http.server 8080

# Open browser and visit
http://localhost:8080/frontend/index.html
```
## Updated website
```bash
#First time:
git pull

git checkout prototype-2/new-ai-feature-and-interaction-redesign

#then:
# Start Python server, you can change to any of the free port
python3 -m http.server 8080