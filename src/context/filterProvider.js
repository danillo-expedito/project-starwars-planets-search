import PropTypes from 'prop-types';
import { useState } from 'react';
import FilterContext from './filterContext';

function FilterProvider({ children }) {
  const [selected, setSelected] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilter = () => {
    setActiveFilters([...activeFilters, selected]);
  };

  return (
    <FilterContext.Provider
      value={
        { selected,
          setSelected,
          activeFilters,
          handleFilter }
      }
    >
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FilterProvider;
