import { useContext } from 'react';
import FormContext from '../context/formContext';
import 'tailwindcss/tailwind.css';

function SearchInput() {
  const { search, handleChange } = useContext(FormContext);

  return (
    <form className="flex-col">
      <input
        type="text"
        name="search-input"
        value={ search }
        onChange={ ({ target }) => handleChange(target.value) }
        placeholder="Planet name"
        data-testid="name-filter"
        className="
        bg-zinc-950 rounded-md text-center
        text-white focus: outline-yellow-300
        "
      />
    </form>
  );
}

export default SearchInput;
