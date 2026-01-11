
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Garantir que o app não crasha se o root demorar a aparecer ou se houver erro de ambiente
const container = document.getElementById('root');

if (!container) {
  console.error("Critical Failure: Root element not found. Check index.html structure.");
} else {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Initialization Error:", err);
    container.innerHTML = `<div style="color: white; padding: 20px;">FALHA CRÍTICA NO TERMINAL: ${err}</div>`;
  }
}
