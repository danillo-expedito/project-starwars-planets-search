import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import FormProvider from '../context/formProvider';
import FilterProvider from '../context/filterProvider';
import SortProvider from '../context/sortProvider';
import userEvent from '@testing-library/user-event';

describe('Testa se os elementos estão presentes na aplicação', () => {
  it('Se o titulo e subtitulo estão presentes', () => {
    render(
    <FormProvider>
      <FilterProvider>
        <SortProvider>
          <App />
        </SortProvider>
      </FilterProvider>
    </FormProvider>);

    const mainTitle = screen.getByRole('heading', { name: /star wars/i, level: 1 });
    const subtitle = screen.getByRole('heading', { name: /planet search/i, level: 4 });

    expect(mainTitle).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });
  it('Se possui os inputs de filtro', () => {
    render(
      <FormProvider>
        <FilterProvider>
          <SortProvider>
            <App />
          </SortProvider>
        </FilterProvider>
      </FormProvider>);

    const filterOptions = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterBtn = screen.getByRole('button', { name: /filtrar/i })
    const removeFilterBtn = screen.getByRole('button', { name: /remover filtros/i });
    
    expect(filterOptions).toHaveValue('population');
    expect(screen.getAllByText('population')).toHaveLength(2);
    expect(screen.getAllByText('orbital_period')).toHaveLength(2);
    expect(screen.getAllByText('diameter')).toHaveLength(2);
    expect(screen.getAllByText('rotation_period')).toHaveLength(2);
    expect(screen.getAllByText('surface_water')).toHaveLength(2);
    expect(screen.getByText('maior que')).toBeInTheDocument();
    expect(screen.getByText('menor que')).toBeInTheDocument();
    expect(screen.getByText('igual a')).toBeInTheDocument();
    expect(comparison).toHaveValue('maior que');
    expect(valueFilter).toHaveValue(0);
    expect(filterBtn).toBeDefined();
    expect(removeFilterBtn).toBeDefined();
  });  
  it('Se possui os inputs de ordenação', () => {
    render(
      <FormProvider>
        <FilterProvider>
          <SortProvider>
            <App />
          </SortProvider>
        </FilterProvider>
      </FormProvider>);
    
   const ascRadio = screen.getByRole('radio', { name: /ascendente/i });
   const descRadio = screen.getByRole('radio', { name: /descendente/i });
   const sortBtn = screen.getByRole('button', { name: /ordenar/i });

   expect(ascRadio).toBeInTheDocument();
   expect(descRadio).toBeInTheDocument();
   expect(sortBtn).toBeInTheDocument();
  });  
})

describe('Testa o retorno da API e a disposição dos elementos na tela', () => {
  it('Se a API está sendo chamada', () => {
    const responseAPI = { 
      "count": 60,
      "next": "https://swapi.dev/api/planets/?page=2",
      "previous": null,
      "results": [
        { "name":"Tatooine", "rotation_period":"23","orbital_period":"304","diameter":"10465","climate":"arid","gravity":"1 standard","terrain":"desert","surface_water":"1","population":"200000","residents":["https://swapi.dev/api/people/1/","https://swapi.dev/api/people/2/","https://swapi.dev/api/people/4/","https://swapi.dev/api/people/6/","https://swapi.dev/api/people/7/","https://swapi.dev/api/people/8/","https://swapi.dev/api/people/9/","https://swapi.dev/api/people/11/","https://swapi.dev/api/people/43/","https://swapi.dev/api/people/62/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-09T13:50:49.641000Z","edited":"2014-12-20T20:58:18.411000Z","url":"https://swapi.dev/api/planets/1/"}, 
        { "name":"Alderaan","rotation_period":"24","orbital_period":"364","diameter":"12500","climate":"temperate","gravity":"1 standard","terrain":"grasslands, mountains","surface_water":"40","population":"2000000000","residents":["https://swapi.dev/api/people/5/","https://swapi.dev/api/people/68/","https://swapi.dev/api/people/81/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:35:48.479000Z","edited":"2014-12-20T20:58:18.420000Z","url":"https://swapi.dev/api/planets/2/"}, 
        { "name":"Yavin IV","rotation_period":"24","orbital_period":"4818","diameter":"10200","climate":"temperate, tropical","gravity":"1 standard","terrain":"jungle, rainforests","surface_water":"8","population":"1000","residents":[],"films":["https://swapi.dev/api/films/1/"],"created":"2014-12-10T11:37:19.144000Z","edited":"2014-12-20T20:58:18.421000Z","url":"https://swapi.dev/api/planets/3/"},{"name":"Hoth","rotation_period":"23","orbital_period":"549","diameter":"7200","climate":"frozen","gravity":"1.1 standard","terrain":"tundra, ice caves, mountain ranges","surface_water":"100","population":"unknown","residents":[],"films":["https://swapi.dev/api/films/2/"],"created":"2014-12-10T11:39:13.934000Z","edited":"2014-12-20T20:58:18.423000Z","url":"https://swapi.dev/api/planets/4/"}, 
        { "name":"Dagobah","rotation_period":"23","orbital_period":"341","diameter":"8900","climate":"murky","gravity":"N/A","terrain":"swamp, jungles","surface_water":"8","population":"unknown","residents":[],"films":["https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:42:22.590000Z","edited":"2014-12-20T20:58:18.425000Z","url":"https://swapi.dev/api/planets/5/"}, 
        { "name":"Bespin","rotation_period":"12","orbital_period":"5110","diameter":"118000","climate":"temperate","gravity":"1.5 (surface), 1 standard (Cloud City)","terrain":"gas giant","surface_water":"0","population":"6000000","residents":["https://swapi.dev/api/people/26/"],"films":["https://swapi.dev/api/films/2/"],"created":"2014-12-10T11:43:55.240000Z","edited":"2014-12-20T20:58:18.427000Z","url":"https://swapi.dev/api/planets/6/"}, 
        { "name":"Endor","rotation_period":"18","orbital_period":"402","diameter":"4900","climate":"temperate","gravity":"0.85 standard","terrain":"forests, mountains, lakes","surface_water":"8","population":"30000000","residents":["https://swapi.dev/api/people/30/"],"films":["https://swapi.dev/api/films/3/"],"created":"2014-12-10T11:50:29.349000Z","edited":"2014-12-20T20:58:18.429000Z","url":"https://swapi.dev/api/planets/7/"}, 
        { "name":"Naboo","rotation_period":"26","orbital_period":"312","diameter":"12120","climate":"temperate","gravity":"1 standard","terrain":"grassy hills, swamps, forests, mountains","surface_water":"12","population":"4500000000","residents":["https://swapi.dev/api/people/3/","https://swapi.dev/api/people/21/","https://swapi.dev/api/people/35/","https://swapi.dev/api/people/36/","https://swapi.dev/api/people/37/","https://swapi.dev/api/people/38/","https://swapi.dev/api/people/39/","https://swapi.dev/api/people/42/","https://swapi.dev/api/people/60/","https://swapi.dev/api/people/61/","https://swapi.dev/api/people/66/"],"films":["https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:52:31.066000Z","edited":"2014-12-20T20:58:18.430000Z","url":"https://swapi.dev/api/planets/8/"}, 
        { "name":"Coruscant","rotation_period":"24","orbital_period":"368","diameter":"12240","climate":"temperate","gravity":"1 standard","terrain":"cityscape, mountains","surface_water":"unknown","population":"1000000000000","residents":["https://swapi.dev/api/people/34/","https://swapi.dev/api/people/55/","https://swapi.dev/api/people/74/"],"films":["https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:54:13.921000Z","edited":"2014-12-20T20:58:18.432000Z","url":"https://swapi.dev/api/planets/9/"}, 
        { "name":"Kamino","rotation_period":"27","orbital_period":"463","diameter":"19720","climate":"temperate","gravity":"1 standard","terrain":"ocean","surface_water":"100","population":"1000000000","residents":["https://swapi.dev/api/people/22/","https://swapi.dev/api/people/72/","https://swapi.dev/api/people/73/"],"films":["https://swapi.dev/api/films/5/"],"created":"2014-12-10T12:45:06.577000Z","edited":"2014-12-20T20:58:18.434000Z","url":"https://swapi.dev/api/planets/10/"} 
      ]}
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    });

    render(
      <FormProvider>
        <FilterProvider>
          <SortProvider>
            <App />
          </SortProvider>
        </FilterProvider>
      </FormProvider>);


    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets')
  });
  it('Se a API está sendo chamada e retorna os elementos corretos', async () => {
    const responseAPI = { 
      "count": 60,
      "next": "https://swapi.dev/api/planets/?page=2",
      "previous": null,
      "results": [
        { "name":"Tatooine", "rotation_period":"23","orbital_period":"304","diameter":"10465","climate":"arid","gravity":"1 standard","terrain":"desert","surface_water":"1","population":"200000","residents":["https://swapi.dev/api/people/1/","https://swapi.dev/api/people/2/","https://swapi.dev/api/people/4/","https://swapi.dev/api/people/6/","https://swapi.dev/api/people/7/","https://swapi.dev/api/people/8/","https://swapi.dev/api/people/9/","https://swapi.dev/api/people/11/","https://swapi.dev/api/people/43/","https://swapi.dev/api/people/62/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-09T13:50:49.641000Z","edited":"2014-12-20T20:58:18.411000Z","url":"https://swapi.dev/api/planets/1/"}, 
        { "name":"Alderaan","rotation_period":"24","orbital_period":"364","diameter":"12500","climate":"temperate","gravity":"1 standard","terrain":"grasslands, mountains","surface_water":"40","population":"2000000000","residents":["https://swapi.dev/api/people/5/","https://swapi.dev/api/people/68/","https://swapi.dev/api/people/81/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:35:48.479000Z","edited":"2014-12-20T20:58:18.420000Z","url":"https://swapi.dev/api/planets/2/"}, 
        { "name":"Yavin IV","rotation_period":"24","orbital_period":"4818","diameter":"10200","climate":"temperate, tropical","gravity":"1 standard","terrain":"jungle, rainforests","surface_water":"8","population":"1000","residents":[],"films":["https://swapi.dev/api/films/1/"],"created":"2014-12-10T11:37:19.144000Z","edited":"2014-12-20T20:58:18.421000Z","url":"https://swapi.dev/api/planets/3/"},{"name":"Hoth","rotation_period":"23","orbital_period":"549","diameter":"7200","climate":"frozen","gravity":"1.1 standard","terrain":"tundra, ice caves, mountain ranges","surface_water":"100","population":"unknown","residents":[],"films":["https://swapi.dev/api/films/2/"],"created":"2014-12-10T11:39:13.934000Z","edited":"2014-12-20T20:58:18.423000Z","url":"https://swapi.dev/api/planets/4/"}, 
        { "name":"Dagobah","rotation_period":"23","orbital_period":"341","diameter":"8900","climate":"murky","gravity":"N/A","terrain":"swamp, jungles","surface_water":"8","population":"unknown","residents":[],"films":["https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:42:22.590000Z","edited":"2014-12-20T20:58:18.425000Z","url":"https://swapi.dev/api/planets/5/"}, 
        { "name":"Bespin","rotation_period":"12","orbital_period":"5110","diameter":"118000","climate":"temperate","gravity":"1.5 (surface), 1 standard (Cloud City)","terrain":"gas giant","surface_water":"0","population":"6000000","residents":["https://swapi.dev/api/people/26/"],"films":["https://swapi.dev/api/films/2/"],"created":"2014-12-10T11:43:55.240000Z","edited":"2014-12-20T20:58:18.427000Z","url":"https://swapi.dev/api/planets/6/"}, 
        { "name":"Endor","rotation_period":"18","orbital_period":"402","diameter":"4900","climate":"temperate","gravity":"0.85 standard","terrain":"forests, mountains, lakes","surface_water":"8","population":"30000000","residents":["https://swapi.dev/api/people/30/"],"films":["https://swapi.dev/api/films/3/"],"created":"2014-12-10T11:50:29.349000Z","edited":"2014-12-20T20:58:18.429000Z","url":"https://swapi.dev/api/planets/7/"}, 
        { "name":"Naboo","rotation_period":"26","orbital_period":"312","diameter":"12120","climate":"temperate","gravity":"1 standard","terrain":"grassy hills, swamps, forests, mountains","surface_water":"12","population":"4500000000","residents":["https://swapi.dev/api/people/3/","https://swapi.dev/api/people/21/","https://swapi.dev/api/people/35/","https://swapi.dev/api/people/36/","https://swapi.dev/api/people/37/","https://swapi.dev/api/people/38/","https://swapi.dev/api/people/39/","https://swapi.dev/api/people/42/","https://swapi.dev/api/people/60/","https://swapi.dev/api/people/61/","https://swapi.dev/api/people/66/"],"films":["https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:52:31.066000Z","edited":"2014-12-20T20:58:18.430000Z","url":"https://swapi.dev/api/planets/8/"}, 
        { "name":"Coruscant","rotation_period":"24","orbital_period":"368","diameter":"12240","climate":"temperate","gravity":"1 standard","terrain":"cityscape, mountains","surface_water":"unknown","population":"1000000000000","residents":["https://swapi.dev/api/people/34/","https://swapi.dev/api/people/55/","https://swapi.dev/api/people/74/"],"films":["https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:54:13.921000Z","edited":"2014-12-20T20:58:18.432000Z","url":"https://swapi.dev/api/planets/9/"}, 
        { "name":"Kamino","rotation_period":"27","orbital_period":"463","diameter":"19720","climate":"temperate","gravity":"1 standard","terrain":"ocean","surface_water":"100","population":"1000000000","residents":["https://swapi.dev/api/people/22/","https://swapi.dev/api/people/72/","https://swapi.dev/api/people/73/"],"films":["https://swapi.dev/api/films/5/"],"created":"2014-12-10T12:45:06.577000Z","edited":"2014-12-20T20:58:18.434000Z","url":"https://swapi.dev/api/planets/10/"} 
      ]}
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    });

    render(
      <FormProvider>
        <FilterProvider>
          <SortProvider>
            <App />
          </SortProvider>
        </FilterProvider>
      </FormProvider>);
    
    const columnHeaders = await screen.findAllByRole('columnheader');
    const rows = await screen.findAllByRole('row');
    const planetsName = responseAPI.results.map((planet) => planet.name);

    planetsName.forEach((planetName) => {
      expect(async () => await screen.findByText(planetName).toBeInTheDocument())
    })
    expect(columnHeaders).toHaveLength(13);
    expect(rows).toHaveLength(11);
  });
});

describe('Testa a funcionalidade da filtragem', () => {
  it('Se os planetas são filtrados corretamente', async () => {
    const responseAPI = { 
      "count": 60,
      "next": "https://swapi.dev/api/planets/?page=2",
      "previous": null,
      "results": [
        { "name":"Tatooine", "rotation_period":"23","orbital_period":"304","diameter":"10465","climate":"arid","gravity":"1 standard","terrain":"desert","surface_water":"1","population":"200000","residents":["https://swapi.dev/api/people/1/","https://swapi.dev/api/people/2/","https://swapi.dev/api/people/4/","https://swapi.dev/api/people/6/","https://swapi.dev/api/people/7/","https://swapi.dev/api/people/8/","https://swapi.dev/api/people/9/","https://swapi.dev/api/people/11/","https://swapi.dev/api/people/43/","https://swapi.dev/api/people/62/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-09T13:50:49.641000Z","edited":"2014-12-20T20:58:18.411000Z","url":"https://swapi.dev/api/planets/1/"}, 
        { "name":"Alderaan","rotation_period":"24","orbital_period":"364","diameter":"12500","climate":"temperate","gravity":"1 standard","terrain":"grasslands, mountains","surface_water":"40","population":"2000000000","residents":["https://swapi.dev/api/people/5/","https://swapi.dev/api/people/68/","https://swapi.dev/api/people/81/"],"films":["https://swapi.dev/api/films/1/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:35:48.479000Z","edited":"2014-12-20T20:58:18.420000Z","url":"https://swapi.dev/api/planets/2/"}, 
        { "name":"Yavin IV","rotation_period":"24","orbital_period":"4818","diameter":"10200","climate":"temperate, tropical","gravity":"1 standard","terrain":"jungle, rainforests","surface_water":"8","population":"1000","residents":[],"films":["https://swapi.dev/api/films/1/"],"created":"2014-12-10T11:37:19.144000Z","edited":"2014-12-20T20:58:18.421000Z","url":"https://swapi.dev/api/planets/3/"},{"name":"Hoth","rotation_period":"23","orbital_period":"549","diameter":"7200","climate":"frozen","gravity":"1.1 standard","terrain":"tundra, ice caves, mountain ranges","surface_water":"100","population":"unknown","residents":[],"films":["https://swapi.dev/api/films/2/"],"created":"2014-12-10T11:39:13.934000Z","edited":"2014-12-20T20:58:18.423000Z","url":"https://swapi.dev/api/planets/4/"}, 
        { "name":"Dagobah","rotation_period":"23","orbital_period":"341","diameter":"8900","climate":"murky","gravity":"N/A","terrain":"swamp, jungles","surface_water":"8","population":"unknown","residents":[],"films":["https://swapi.dev/api/films/2/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:42:22.590000Z","edited":"2014-12-20T20:58:18.425000Z","url":"https://swapi.dev/api/planets/5/"}, 
        { "name":"Bespin","rotation_period":"12","orbital_period":"5110","diameter":"118000","climate":"temperate","gravity":"1.5 (surface), 1 standard (Cloud City)","terrain":"gas giant","surface_water":"0","population":"6000000","residents":["https://swapi.dev/api/people/26/"],"films":["https://swapi.dev/api/films/2/"],"created":"2014-12-10T11:43:55.240000Z","edited":"2014-12-20T20:58:18.427000Z","url":"https://swapi.dev/api/planets/6/"}, 
        { "name":"Endor","rotation_period":"18","orbital_period":"402","diameter":"4900","climate":"temperate","gravity":"0.85 standard","terrain":"forests, mountains, lakes","surface_water":"8","population":"30000000","residents":["https://swapi.dev/api/people/30/"],"films":["https://swapi.dev/api/films/3/"],"created":"2014-12-10T11:50:29.349000Z","edited":"2014-12-20T20:58:18.429000Z","url":"https://swapi.dev/api/planets/7/"}, 
        { "name":"Naboo","rotation_period":"26","orbital_period":"312","diameter":"12120","climate":"temperate","gravity":"1 standard","terrain":"grassy hills, swamps, forests, mountains","surface_water":"12","population":"4500000000","residents":["https://swapi.dev/api/people/3/","https://swapi.dev/api/people/21/","https://swapi.dev/api/people/35/","https://swapi.dev/api/people/36/","https://swapi.dev/api/people/37/","https://swapi.dev/api/people/38/","https://swapi.dev/api/people/39/","https://swapi.dev/api/people/42/","https://swapi.dev/api/people/60/","https://swapi.dev/api/people/61/","https://swapi.dev/api/people/66/"],"films":["https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:52:31.066000Z","edited":"2014-12-20T20:58:18.430000Z","url":"https://swapi.dev/api/planets/8/"}, 
        { "name":"Coruscant","rotation_period":"24","orbital_period":"368","diameter":"12240","climate":"temperate","gravity":"1 standard","terrain":"cityscape, mountains","surface_water":"unknown","population":"1000000000000","residents":["https://swapi.dev/api/people/34/","https://swapi.dev/api/people/55/","https://swapi.dev/api/people/74/"],"films":["https://swapi.dev/api/films/3/","https://swapi.dev/api/films/4/","https://swapi.dev/api/films/5/","https://swapi.dev/api/films/6/"],"created":"2014-12-10T11:54:13.921000Z","edited":"2014-12-20T20:58:18.432000Z","url":"https://swapi.dev/api/planets/9/"}, 
        { "name":"Kamino","rotation_period":"27","orbital_period":"463","diameter":"19720","climate":"temperate","gravity":"1 standard","terrain":"ocean","surface_water":"100","population":"1000000000","residents":["https://swapi.dev/api/people/22/","https://swapi.dev/api/people/72/","https://swapi.dev/api/people/73/"],"films":["https://swapi.dev/api/films/5/"],"created":"2014-12-10T12:45:06.577000Z","edited":"2014-12-20T20:58:18.434000Z","url":"https://swapi.dev/api/planets/10/"} 
      ]}
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    });

    render(
      <FormProvider>
        <FilterProvider>
          <SortProvider>
            <App />
          </SortProvider>
        </FilterProvider>
      </FormProvider>);

    const filterOptions = screen.getByTestId('column-filter');
    const selectedOption = 'diameter';
    const comparison = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', { name: /filtrar/i });

    userEvent.selectOptions(filterOptions, selectedOption);
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '13000');

    expect(filterOptions.value).toBe(selectedOption);
    expect(comparison.value).toBe('menor que');
    expect(valueInput.value).toBe('13000');

    userEvent.click(filterBtn);

    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(9);
    expect(filterOptions.value).toBe('population');
    expect(comparison.value).toBe('maior que');
    expect(valueInput.value).toBe('0');

    userEvent.selectOptions(filterOptions, 'orbital_period');
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '400');

    expect(filterOptions.value).toBe('orbital_period');
    expect(comparison.value).toBe('maior que');
    expect(valueInput.value).toBe('400');
    
    userEvent.click(filterBtn);
    
    const rowsAfterNewFilter = await screen.findAllByRole('row');
    expect(rowsAfterNewFilter).toHaveLength(4);
    
    const removeFilterBtns = await screen.findAllByRole('button', { name: /excluir/i });
    expect(removeFilterBtns).toHaveLength(2);
  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
})
