import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import SearchInput from './components/SearchInput';

function App() {
  return (
    <>
      <span>Hello, App!</span>
      <SearchInput />
      <Filter />
      <Table />
    </>
  );
}

//
export default App;
