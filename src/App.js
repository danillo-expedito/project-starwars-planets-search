import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import SearchInput from './components/SearchInput';
import Sort from './components/Sort';

function App() {
  return (
    <>
      <span>Hello, App!</span>
      <SearchInput />
      <Filter />
      <Sort />
      <Table />
    </>
  );
}

//
export default App;
