import { useContext } from 'react';
import SortContext from '../context/sortContext';

function Sort() {
  const { sortOption, setSortOption, radio,
    setRadio, setSort } = useContext(SortContext);
  return (
    <form className="flex flex-row gap-2">
      <select
        className="bg-zinc-950
      text-yellow-300
      font-normal
      text-center rounded
      w-44
      h-6
      focus: outline-yellow-300"
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
      <input
        className="cursor-pointer"
        type="radio"
        name="sort-radio"
        id="asc"
        data-testid="column-sort-input-asc"
        value="ASC"
        checked={ radio === 'ASC' }
        onChange={ (e) => setRadio(e.target.value) }
      />
      <label
        htmlFor="asc"
        className="text-stone-300 italic cursor-pointer"
      >
        Ascendente

      </label>
      <input
        className="cursor-pointer"
        type="radio"
        name="sort-radio"
        id="desc"
        data-testid="column-sort-input-desc"
        value="DESC"
        checked={ radio === 'DESC' }
        onChange={ (e) => setRadio(e.target.value) }
      />
      <label htmlFor="desc" className="text-stone-300 italic cursor-pointer">
        Descendente
      </label>
      <button
        className="bg-gradient-to-r
      from-yellow-200
      via-yellow-400 via-18%
      to-yellow-300 to-40%
      text-sm
      uppercase
      w-28 h-6
      text-zinc-900
      font-bold
      border-2 border-zinc-950
      shadow-md
      shadow-black
      active:shadow-none
      rounded"
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
