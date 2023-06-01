import React from 'react';
import ReactDOM from 'react-dom/client';
import PlanetsProvider from './context/planetsProvider';
import App from './App';
import FormProvider from './context/formProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </PlanetsProvider>,
  );
