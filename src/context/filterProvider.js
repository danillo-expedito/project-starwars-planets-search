import PropTypes from 'prop-types';
import { useState } from 'react';
import FilterContext from './filterContext';

function FilterProvider({ children }) {
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilter = () => {
    setActiveFilters([...activeFilters, selected]);
  };

  const handleFilterCases = (planet) => {
    const conditions = [];

    activeFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        conditions.push((+planet[filter.column]) > (+filter.value));
        break;
      case 'menor que':
        conditions.push((+planet[filter.column]) < (+filter.value));
        break;
      case 'igual a':
        conditions.push((+planet[filter.column]) === (+filter.value));
        break;
      default:
        return true;
      }
    });

    return conditions.every((con) => con);
  };

  // const handleFilterOptions = (option) => !activeFilters
  //   .find((filter) => option === filter.column);

  return (
    <FilterContext.Provider
      value={
        { selected,
          setSelected,
          activeFilters,
          handleFilter,
          handleFilterCases }
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
