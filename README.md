# Fechín Mitchell — Portfolio

Professional portfolio website with two experiences:
- **The Professional Way** — Modern, dark + gold single-page portfolio
- **The Fun Way** — Retro internet history journey (add your existing components)

## Quick Start

```bash
# Terminal 1 — Backend
cd server
npm install
npm start

# Terminal 2 — Frontend
cd client
npm install
npm start
```

Then open **http://localhost:3000**

## Structure

```
├── client/           # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.jsx       # Choice page
│   │   │   └── Professional.jsx  # Full single-page portfolio
│   │   ├── App.jsx              # Experience router
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   └── vite.config.js
├── server/           # Express backend
│   └── index.js
└── package.json
```

## Adding the Fun/Retro Experience

Import your existing retro components (GeoCities, MySpace, etc.) into the `fun` route in `App.jsx`.
