import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// StrictMode intentionally omitted: it double-invokes effects in dev, which
// would spin up duplicate Lenis / GSAP ScrollTrigger instances.
createRoot(document.getElementById('root')!).render(<App />)
