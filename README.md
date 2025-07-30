## Getting Started

```bash
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