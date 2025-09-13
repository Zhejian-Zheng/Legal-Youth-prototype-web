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