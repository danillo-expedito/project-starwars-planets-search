import { useContext } from 'react';
import FilterContext from '../context/filterContext';

function ActiveFilter() {
  const { activeFilters, RemoveFilters } = useContext(FilterContext);

  return (
    <div>
      { activeFilters.length > 0
        && (
          <div
            className="flex flex-col items-center"
          >
            <h3
              className="text-yellow-300 font-bold
            decoration-double decoration-black
            decoration-2
            underline mb-2
            "
            >
              Filtros ativos:
            </h3>
            <div className="flex flex-row gap-2">
              { activeFilters.map((filter, index) => (
                <div
                  key={ index }
                  className="flex flex-row gap-2
                   bg-zinc-950 rounded-md w-56 h-12
                     items-center justify-around p-2"
                >
                  <p data-testid="filter" className="text-stone-400 text-sm">
                    { `${filter.column} ${filter.comparison} = ${filter.value}` }
                  </p>
                  <div
                    className="border-l-2 border-stone-400 h-10
                    flex flex-col justify-center
                    "
                  >
                    <button
                      className="text-stone-400
                    font-bold rounded-full w-4 h-4
                    text-sm mb-1 mr-0 ml-1
                    "
                      type="button"
                      onClick={ () => RemoveFilters(filter.column) }
                    >
                      X
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default ActiveFilter;
