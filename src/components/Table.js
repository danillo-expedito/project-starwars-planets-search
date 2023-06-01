import { useContext, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';
import FormContext from '../context/formContext';

function Table() {
  const { planets, fetchData } = useContext(PlanetsContext);
  const { search } = useContext(FormContext);

  useEffect(() => {
    fetchData();
  });

  return (
    <table>
      <thead>
        <tr>
          { planets.length
          && (Object.keys(planets[0]).map((objKey, index) => (
            <th
              key={ index }
            >
              {objKey}
            </th>
          )))}
        </tr>
      </thead>
      <tbody>
        { planets.length
        && (
          planets.filter((planet) => planet.name.toLowerCase().includes(search))
            .map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
