import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Create container
const appContainer = document.createElement('div');
appContainer.id = 'my-react-root';
document.body.appendChild(appContainer);

// Render React
createRoot(appContainer).render(<App />);