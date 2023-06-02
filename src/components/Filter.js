import { useContext } from 'react';
import FilterContext from '../context/filterContext';

function Filter() {
  const { selected, setSelected, RemoveFilters,
    activeFilters, HandleFilter, options } = useContext(FilterContext);

  return (
    <div>
      <form>
        <select
          data-testid="column-filter"
          value={ selected.column }
          onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
        >
          {/* <option selected hidden>Choose an option</option> */}
          {
            options
              .map((columnOption) => (
                <option value={ columnOption } key={ columnOption }>
                  { columnOption }
                </option>
              ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          value={ selected.comparison }
          onChange={ (e) => setSelected({ ...selected, comparison: e.target.value }) }
        >
          {/* <option selected hidden>Choose an option</option> */}
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
          onClick={ () => HandleFilter(selected.column) }
        >
          Filtrar
        </button>
      </form>
      { activeFilters.length > 0
        && (
          <div>
            <h3>Filtros ativos:</h3>
            { activeFilters.map((filter, index) => (
              <div key={ index }>
                <p data-testid="filter">
                  { `${filter.column} ${filter.comparison} = ${filter.value}` }
                  <button
                    type="button"
                    onClick={ () => RemoveFilters(filter.column) }
                  >
                    Excluir
                  </button>
                </p>
              </div>
            ))}
          </div>
        )}
      <button
        type="button"
        onClick={ () => RemoveFilters() }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
    </div>
  );
}

export default Filter;
