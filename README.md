## Getting Started

```bash
# Start Python server, you can change to any of the free port
python3 -m http.server 8080

# 2. Open browser and visit
http://localhost:8080/index.html
```
## Updated website
```bash
#First time:
git pull
git checkout -b prototype-2/new-ai-feature-and-interaction-redesign

#Otherwise:
git checkout prototype-2/new-ai-feature-and-interaction-redesign

#then:
# Start Python server, you can change to any of the free port
python3 -m http.server 8080

# 2. Open browser and visit
http://localhost:8080/index.html
```

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