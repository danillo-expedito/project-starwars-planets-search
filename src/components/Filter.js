import { useContext } from 'react';
import FilterContext from '../context/filterContext';

function Filter() {
  const { selected, setSelected,
    activeFilters, handleFilter } = useContext(FilterContext);

  return (
    <div>
      <form>
        <select
          data-testid="column-filter"
          value={ selected.column }
          onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
        >
          <option selected hidden>Choose an option</option>
          { ['population', 'orbital_period',
            'diameter', 'rotation_period', 'surface_water']
            .map((columnOption) => (
              <option value={ columnOption } key={ columnOption }>
                { columnOption }
              </option>
            ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ selected.comparison }
          onChange={ (e) => setSelected({ ...selected, comparison: e.target.value }) }
        >
          <option selected hidden>Choose an option</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ selected.value }
          onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilter }
        >
          Filtrar
        </button>
      </form>
      { activeFilters.length > 0
        && (
          <div>
            <p>Filtros ativos:</p>
            <div>
              { activeFilters.map((filter, index) => (
                <p
                  key={ index }
                >
                  { `${filter.column} ${filter.comparison} = ${filter.value}` }
                </p>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default Filter;
