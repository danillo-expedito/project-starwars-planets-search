import { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import FormContext from '../context/formContext';
import FilterContext from '../context/filterContext';
import SortContext from '../context/sortContext';
import convertDate from '../utils/convertDateFormat';

function Table() {
  const { DATA } = useFetch();
  const { search } = useContext(FormContext);
  const { HandleFilterCases } = useContext(FilterContext);
  const { SortBy } = useContext(SortContext);

  return (
    <div className="w-screen p-4 overflow-x-scroll">
      { DATA.length
        ? (
          <table
            className="bg-zinc-950 border-separate border-spacing-2
              border-3 border-zinc-800 rounded-md"
          >
            <thead>
              <tr>
                { Object.keys(DATA[0]).map((objKey, index) => (
                  <th
                    key={ index }
                    className="text-yellow-300 border border-slate-300 w-24"
                  >
                    {objKey}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              { DATA.filter((planet) => planet.name.toLowerCase().includes(search))
                .filter(HandleFilterCases)
                .sort((a, b) => SortBy(a, b))
                .map((planet, index) => (
                  <tr key={ index }>
                    <td
                      className="border border-slate-300
                          text-slate-300 text-center
                          px-4 py-2
                        "
                      data-testid="planet-name"
                    >
                      {planet.name}
                    </td>
                    <td
                      className="border border-slate-300
                          text-slate-300 text-center
                          px-4 py-2
                        "
                    >
                      {planet.rotation_period}
                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {planet.orbital_period}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {planet.diameter}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {planet.climate}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {planet.gravity}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {planet.terrain}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {planet.surface_water}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {planet.population}

                    </td>
                    <td
                      className="border border-slate-300
                        text-center text-slate-300
                        px-4 py-2
                        "
                    >
                      <div className="w-64 overflow-x-auto scroll-smooth">
                        {planet.films}
                      </div>
                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-4 py-2
                      "
                    >
                      {convertDate(planet.created)}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-6 py-2
                      "
                    >
                      {convertDate(planet.edited)}

                    </td>
                    <td
                      className="border border-slate-300
                        text-slate-300 text-center
                        px-6 py-2
                      "
                    >
                      {planet.url}

                    </td>
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
