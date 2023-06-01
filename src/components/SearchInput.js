import { useContext } from 'react';
import FormContext from '../context/formContext';

function SearchInput() {
  const { search, handleChange } = useContext(FormContext);

  return (
    <form>
      <input
        type="text"
        name="search-input"
        value={ search }
        onChange={ ({ target }) => handleChange(target.value) }
        placeholder="Planet name"
        data-testid="name-filter"
      />
    </form>
  );
}

export default SearchInput;
