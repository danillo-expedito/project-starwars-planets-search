import React from 'react';
import ReactDOM from 'react-dom/client';
import PlanetsProvider from './context/planetsProvider';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>,
  );
