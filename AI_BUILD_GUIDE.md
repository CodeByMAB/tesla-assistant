# Tesla Assistant - AI Build Guide

This document teaches an AI how to build a Tesla-themed PWA similar to Tesla Assistant.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Lucide React** for icons
- **localStorage** for data persistence
- **PWA** (Service Worker + Manifest)

## Project Setup

```bash
# Create project
npm create vite@latest tesla-assistant -- --template react-ts
cd tesla-assistant

# Install dependencies
npm install
npm install lucide-react

# Dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System (Tesla-Inspired Dark Theme)

```css
:root {
  --tesla-black: #171a20;
  --tesla-dark: #0d0d0f;
  --tesla-card: #1e1e24;
  --tesla-card-hover: #25252d;
  --tesla-white: #ffffff;
  --tesla-gray: #8e8e93;
  --tesla-gray-dark: #5a5a5e;
  --tesla-green: #3e9e3e;
  --tesla-green-bright: #4fb84f;
  --tesla-blue: #4a90d9;
  --tesla-red: #ff453a;
  --tesla-yellow: #ffb800;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--tesla-black);
  color: var(--tesla-white);
}
```

## Key Components

### App Structure (App.tsx)
```tsx
import { useState } from 'react'
import SafetyScore from './components/SafetyScore'
import ChargingStations from './components/ChargingStations'
import Products from './components/Products'

type Tab = 'score' | 'charging' | 'products'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('score')

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <div className="logo-t">T</div>
          <span className="logo-text">Tesla Assistant</span>
        </div>
      </header>

      <nav className="nav">
        <button 
          className={`nav-btn ${activeTab === 'score' ? 'active' : ''}`}
          onClick={() => setActiveTab('score')}
        >
          Score
        </button>
        <button 
          className={`nav-btn ${activeTab === 'charging' ? 'active' : ''}`}
          onClick={() => setActiveTab('charging')}
        >
          Charging
        </button>
        <button 
          className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </nav>

      <main className="content">
        {activeTab === 'score' && <SafetyScore />}
        {activeTab === 'charging' && <ChargingStations />}
        {activeTab === 'products' && <Products />}
      </main>

      <footer className="footer">
        <p>🦀 Built with OpenClaw</p>
      </footer>
    </div>
  )
}

export default App
```

### Card Component Pattern
```tsx
function MyComponent() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Title</h3>
      </div>
      <p>Content here</p>
    </div>
  )
}
```

### Score Ring (SVG Circular Gauge)
```tsx
const circumference = 2 * Math.PI * 85
const offset = circumference - (score / 100) * circumference

<div className="score-ring">
  <svg width="200" height="200" viewBox="0 0 200 200">
    <circle className="score-ring-bg" cx="100" cy="100" r="85" />
    <circle 
      className={`score-ring-progress ${scoreClass}`}
      cx="100" cy="100" r="85"
      strokeDasharray={circumference}
      strokeDashoffset={offset}
    />
  </svg>
  <div className="score-value">
    <div className={`score-number ${scoreClass}`}>{score}</div>
  </div>
</div>
```

### Using Lucide Icons
```tsx
import { Shield, Zap, Gauge, Timer, Plug, Home } from 'lucide-react'

// In JSX:
<Shield size={18} />
<Zap size={16} style={{ color: 'var(--tesla-green)' }} />
```

### localStorage Data Persistence
```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// Usage:
const [score, setScore] = useLocalStorage('tesla-safety-score', 87)
```

## PWA Setup

### manifest.json (public/manifest.json)
```json
{
  "name": "Tesla Assistant",
  "short_name": "Tesla",
  "description": "Track Safety Score, optimize charging",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#171a20",
  "theme_color": "#171a20",
  "icons": [
    {
      "src": "/tesla-icon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

### Service Worker (public/sw.js)
```js
const CACHE_NAME = 'tesla-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      '/',
      '/index.html',
      '/assets/index.css',
      '/assets/index.js'
    ]))
  )
  self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  )
})
```

### HTML Meta Tags (index.html)
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<link rel="manifest" href="/manifest.json" />
```

## Key CSS Patterns

### Mobile-First Layout
```css
.app {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
```

### Button Styles
```css
.btn {
  padding: 14px 28px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
}

.btn-primary {
  background: var(--tesla-green);
  color: white;
}

.btn-secondary {
  background: var(--tesla-card);
  color: var(--tesla-white);
  border: 1px solid rgba(255,255,255,0.1);
}
```

### Navigation Tabs
```css
.nav {
  display: flex;
  padding: 0 16px;
  gap: 8px;
}

.nav-btn {
  flex: 1;
  padding: 14px 20px;
  background: transparent;
  border: none;
  color: var(--tesla-gray);
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
}

.nav-btn.active {
  color: var(--tesla-white);
  border-bottom: 2px solid var(--tesla-green);
}
```

## Building and Running

```bash
# Development
npm run dev

# Production build
npm run build

# Preview built app
npm run preview -- --host 0.0.0.0 --port 5173
```

## File Structure
```
tesla-assistant/
├── public/
│   ├── tesla-icon.svg
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── components/
│   │   ├── SafetyScore.tsx
│   │   ├── ChargingStations.tsx
│   │   ├── Products.tsx
│   │   ├── ChargingCalculator.tsx
│   │   ├── ScoreHistory.tsx
│   │   └── VehicleManager.tsx
│   ├── hooks/
│   │   └── useTeslaData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## How to Replicate This Project

1. **Initialize**: `npm create vite@latest project-name -- --template react-ts`
2. **Install icons**: `npm install lucide-react`
3. **Create design system**: Copy CSS variables and base styles
4. **Build components**: Create React components with Lucide icons
5. **Add persistence**: Use localStorage hooks
6. **Make PWA**: Add manifest.json and service worker
7. **Build**: `npm run build`
8. **Serve**: `npm run preview -- --port 5173`

This pattern can be adapted for any mobile-first PWA with a similar dark theme aesthetic.