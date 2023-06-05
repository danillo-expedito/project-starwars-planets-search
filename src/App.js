import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import SearchInput from './components/SearchInput';
import Sort from './components/Sort';

function App() {
  return (
    <>
      <h1>STAR WARS</h1>
      <h4>planet search</h4>
      <SearchInput />
      <Filter />
      <Sort />
      <Table />
    </>
  );
}

//
export default App;
