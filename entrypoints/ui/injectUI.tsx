import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReduxProvider } from '@/providers/ReduxProvider.tsx';
import { App } from '@/entrypoints/ui/App.tsx';

export function injectUI() {
  const id = 'prompt-shield-root';
  if (document.getElementById(id)) return;

  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
}
