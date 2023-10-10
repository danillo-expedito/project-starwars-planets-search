import { useContext } from 'react';
import FilterContext from '../context/filterContext';

function Filter() {
  const { selected, setSelected, RemoveFilters,
    HandleFilter, options } = useContext(FilterContext);

  return (
    <div className="flex flex-row gap-2">
      <form className="flex flex-row gap-2">
        <select
          className="bg-zinc-950
          text-yellow-300
          font-normal
          text-center rounded
          w-44
          h-6
          focus: outline-yellow-300"
          data-testid="column-filter"
          name="column-filter"
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
          className="bg-zinc-950
                  text-yellow-300
                  font-normal
                  w-32
                  h-6
                  text-center rounded
                  focus: outline-yellow-300"
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
          className="bg-zinc-950
                  text-yellow-300
                  font-normal
                  text-center rounded
                  w-28
                  h-6
                  focus: outline-yellow-300"
          type="number"
          data-testid="value-filter"
          value={ selected.value }
          onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => HandleFilter(selected.column) }
          className="bg-gradient-to-r
          from-yellow-200
          via-yellow-400 via-18%
          to-yellow-300 to-40%
          uppercase
          text-sm
          w-28 h-6
          text-zinc-900
          font-bold
          border-2 border-zinc-950
          shadow-md
          shadow-black
          active:shadow-none
          rounded"
        >
          Filtrar
        </button>
      </form>
      <button
        type="button"
        onClick={ () => RemoveFilters() }
        data-testid="button-remove-filters"
        className="bg-gradient-to-r
          from-yellow-200
          via-yellow-400 via-28%
          to-yellow-300 to-60%
          w-40 h-6
          text-sm
          uppercase
          text-zinc-900
          font-bold
          border-2 border-zinc-950
          shadow-md
          shadow-black
          active:shadow-none
          rounded"
      >
        Remover Filtros
      </button>
    </div>
  );
}

export default Filter;
