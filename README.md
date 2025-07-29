## Getting Started

### Quick Start (Chinese)

**Current Recommended Method:**
```bash
# 1. Start the server
python3 -m http.server 8080

# 2. Open browser and visit
http://localhost:8080/demo.html
```

**Why this method is recommended:**
- No Node.js upgrade required
- Contains all required features
- Immediately available, no compatibility issues
- Complete prototype demonstration

### Prerequisites
- Node.js (v16 or higher) - **Note: Current setup uses Node.js v12.22.9**
- npm or yarn
- Python 3 (for fallback server)

### Recommended Running Method

#### **Demo Website (Recommended)**
```bash
# Start Python server
python3 -m http.server 8080

# Access demo website
http://localhost:8080/demo.html
```
**Advantages:**
- No Node.js upgrade required
- Contains all functional features
- Immediately available, no compatibility issues

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Legal-Youth-prototype-web.git
   cd Legal-Youth-prototype-web
   ```

2. **Setup the demo website:**
   ```bash
   python3 -m http.server 8080
   # Visit: http://localhost:8080/demo.html
   ```

3. **Open your browser**
   Navigate to `http://localhost:8080/demo.html`

### Note on React App

**Current Limitation:**
- Node.js v12.22.9 is incompatible with modern React dependencies
- The React app requires Node.js v16+ to run properly
- The demo website provides full functionality without this limitation

### Building for Production

```bash
npm run build
```

## Technical Architecture

### Frontend Technologies
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: Professional UI components
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations and transitions
- **Fuse.js**: Fuzzy search functionality

### Key Libraries
- `@mui/material`: UI component library
- `@mui/icons-material`: Material Design icons
- `react-router-dom`: Routing
- `framer-motion`: Animations
- `fuse.js`: Fuzzy search
- `react-helmet-async`: SEO and meta tags
- `react-hot-toast`: Notifications

### Project Structure
```
src/
├── components/
│   └── Layout/
│       ├── Layout.tsx
│       ├── Header.tsx
│       └── Footer.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   ├── InteractiveTools.tsx
│   ├── ResourceLibrary.tsx
│   ├── AboutUs.tsx
│   └── ... (other pages)
├── App.tsx
└── index.tsx
```

## Troubleshooting

### Demo Website Issues

**Port already in use:**
```bash
# Stop existing server
pkill -f "python3 -m http.server"

# Start on different port
python3 -m http.server 8081
# Visit: http://localhost:8081/demo.html
```

**File not found:**
- Ensure you're in the correct directory
- Check that demo.html exists in the project root

## Testing

The project includes comprehensive testing documentation in `TESTING-REPORT.md`.

## Deployment

The application can be deployed to various platforms:

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting for static sites
- **AWS S3**: Scalable cloud hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.