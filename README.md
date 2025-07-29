## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Legal-Youth-prototype-web.git
   cd Legal-Youth-prototype-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

5. **if all does not work**
   do ```python3 -m http.server number```
   go to `http://localhost:number/demo.html`

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