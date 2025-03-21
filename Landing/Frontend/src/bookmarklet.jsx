import { createRoot } from 'react-dom/client'
import { Fab } from './bookmarklet/Fab'

// Create container
const root = document.createElement('div')
document.body.appendChild(root)

// Render the app
createRoot(root).render(<Fab />)