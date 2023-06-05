import { useContext } from 'react';
import SortContext from '../context/sortContext';

function Sort() {
  const { sortOption, setSortOption, radio,
    setRadio, setSort } = useContext(SortContext);
  return (
    <form>
      <select
        value={ sortOption }
        onChange={ (e) => setSortOption(e.target.value) }
        data-testid="column-sort"
      >
        { ['population', 'orbital_period',
          'diameter', 'rotation_period', 'surface_water']
          .map((opt, index) => (
            <option
              key={ index }
              value={ opt }
            >
              {opt}
            </option>
          ))}
      </select>
      <label htmlFor="asc">Ascendente</label>
      <input
        type="radio"
        name="sort-radio"
        id="asc"
        data-testid="column-sort-input-asc"
        value="ASC"
        checked={ radio === 'ASC' }
        onChange={ (e) => setRadio(e.target.value) }
      />
      <label htmlFor="desc">Descendente</label>
      <input
        type="radio"
        name="sort-radio"
        id="desc"
        data-testid="column-sort-input-desc"
        value="DESC"
        checked={ radio === 'DESC' }
        onChange={ (e) => setRadio(e.target.value) }
      />
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setSort({ order: { column: sortOption, sort: radio } }) }
      >
        Ordenar
      </button>
    </form>
  );
}

export default Sort;
