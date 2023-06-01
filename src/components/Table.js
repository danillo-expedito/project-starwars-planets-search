import { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import FormContext from '../context/formContext';
import FilterContext from '../context/filterContext';

function Table() {
  const { DATA } = useFetch();
  const { search } = useContext(FormContext);
  const { handleFilterCases } = useContext(FilterContext);

  return (
    <div>
      { DATA.length
        ? (
          <table>
            <thead>
              <tr>
                { Object.keys(DATA[0]).map((objKey, index) => (
                  <th
                    key={ index }
                  >
                    {objKey}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              { DATA.filter((planet) => planet.name.toLowerCase().includes(search))
                .filter(handleFilterCases)
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
                ))}
            </tbody>
          </table>
        )
        : (
          <p>LOADING...</p>
        )}
    </div>
  );
}

export default Table;
