import PropTypes from 'prop-types';
import { useState } from 'react';
import FilterContext from './filterContext';

function FilterProvider({ children }) {
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const arrayOfOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [options, setOptions] = useState(arrayOfOptions);

  const [activeFilters, setActiveFilters] = useState([]);

  function RemoveOption(op) {
    const newOptions = options.filter((option) => option !== op);

    setOptions(newOptions);
    setSelected({
      column: options[0],
      comparison: 'maior que',
      value: 0,
    });
  }

  function HandleFilter(op) {
    setActiveFilters([...activeFilters, selected]);

    RemoveOption(op);
  }

  function RemoveFilters(filter) {
    if (!filter) {
      setActiveFilters([]);
      setOptions(arrayOfOptions);
    } else {
      const newActiveFilters = activeFilters
        .filter((active) => active.column !== filter);
      setActiveFilters(newActiveFilters);
      setOptions([...options, filter]);
    }
  }

  function HandleFilterCases(planet) {
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
  }

  return (
    <FilterContext.Provider
      value={
        { selected,
          setSelected,
          activeFilters,
          HandleFilter,
          HandleFilterCases,
          options,
          RemoveFilters }
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
