import PropTypes from 'prop-types';
import { useState } from 'react';
import SortContext from './sortContext';

function SortProvider({ children }) {
  const [sort, setSort] = useState({
    order: {
      column: '',
      sort: '',
    },
  });

  const [sortOption, setSortOption] = useState('population');
  const [radio, setRadio] = useState('');

  const sub = -1;

  function SortBy(planetA, planetB) {
    if (!sort.order.column || !sort.order.sort) {
      return true;
    }
    switch (sort.order.sort) {
    case 'ASC':
      if (planetA[sort.order.column] === 'unknown') {
        return 1;
      } if (planetB[sort.order.column] === 'unknown') {
        return sub;
      }
      return planetA[sort.order.column] - planetB[sort.order.column];
    case 'DESC':
      if (planetA[sort.order.column] === 'unknown') {
        return 1;
      } if (planetB[sort.order.column] === 'unknown') {
        return sub;
      }
      return planetB[sort.order.column] - planetA[sort.order.column];
    default:
      break;
    }
  }

  return (
    <SortContext.Provider
      value={
        { sort,
          sortOption,
          setSortOption,
          radio,
          setRadio,
          setSort,
          SortBy }
      }
    >
      {children}
    </SortContext.Provider>
  );
}

SortProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SortProvider;
