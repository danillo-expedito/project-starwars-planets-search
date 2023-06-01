import PropTypes from 'prop-types';
import { useState } from 'react';
import FilterContext from './filterContext';

function FilterProvider({ children }) {
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [options, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const [activeFilters, setActiveFilters] = useState([]);

  const removeOption = (op) => {
    const newOptions = options.filter((option) => option !== op);

    setOptions(newOptions);
    setSelected({
      column: options[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  function HandleFilter(op) {
    setActiveFilters([...activeFilters, selected]);

    removeOption(op);
  }

  const handleFilterCases = (planet) => {
    const conditions = [];

    activeFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        conditions.push(Number(planet[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        conditions.push(Number(planet[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        conditions.push(Number(planet[filter.column]) === Number(filter.value));
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
          HandleFilter,
          handleFilterCases,
          options }
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
