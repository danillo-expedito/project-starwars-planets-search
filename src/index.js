import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FormProvider from './context/formProvider';
import FilterProvider from './context/filterProvider';
import SortProvider from './context/sortProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <FormProvider>
      <FilterProvider>
        <SortProvider>
          <App />
        </SortProvider>
      </FilterProvider>
    </FormProvider>,
  );
