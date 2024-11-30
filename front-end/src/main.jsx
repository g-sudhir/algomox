import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import './index.css';
import './output.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
); 