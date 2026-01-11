import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro na renderização:", error);
    container.innerHTML = `<div style="color: white; padding: 20px; font-family: sans-serif;">
      <h2>Erro de Sistema</h2>
      <p>${error instanceof Error ? error.message : 'Erro desconhecido'}</p>
    </div>`;
  }
} else {
  console.error("Elemento root não encontrado");
}