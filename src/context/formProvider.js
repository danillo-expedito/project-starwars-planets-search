import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FormContext from './formContext';

function FormProvider({ children }) {
  const [search, setSearch] = useState('');

  const handleChange = (value) => {
    setSearch(value);
  };

  return (
    <FormContext.Provider value={ { search, handleChange } }>
      { children }
    </FormContext.Provider>
  );
}

FormProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FormProvider;
