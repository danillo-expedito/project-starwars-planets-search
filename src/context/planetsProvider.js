import PropTypes from 'prop-types';
import { useState } from 'react';
import PlanetsContext from './planetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();

    const planetsData = data.results;

    planetsData.forEach((planet) => {
      delete planet.residents;
    });

    setPlanets(planetsData);
  };

  return (
    <PlanetsContext.Provider value={ { planets, fetchData } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
