import { useEffect, useState } from 'react';

function useFetch() {
  const [DATA, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const responseJSON = await response.json();

    const { results } = responseJSON;
    results.forEach((planet) => delete planet.residents);

    console.log(results);
    setData(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    DATA,
  };
}

export default useFetch;
