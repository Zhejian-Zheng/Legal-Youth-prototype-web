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

### Current Valid Page:
1. Home page
2. Click the advance search button in the home page, website will takes you to advance search page
3. Click the AskAI button in the botton right corner of home page, website will takes you to AI chet page
4. Click the 'Discover & Create Forum' button in the forum section in the navbar of the home page, the website will take you to the Forum page.
5. Click the 'Discover & Create Quiz' button in the Quiz section in the navbar of the home page, the website will take you to the quiz library page.
6. Click the 'Book Volunteer lawyer' button in the navbar of the home page, the website will take you to the Book Volunteer lawyer page.
7. Click the 'Employment' button in the Explore Legal Topics section in the home page, the website will take you to the Employment topic page.
