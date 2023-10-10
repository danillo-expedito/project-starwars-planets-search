import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import SearchInput from './components/SearchInput';
import Sort from './components/Sort';
import 'tailwindcss/tailwind.css';
import starWarsLogo from './images/Star_Wars_Logo..png';
import ActiveFilter from './components/ActiveFilters';

function App() {
  return (
    <div
      className="bg-gradient-to-r
      from-zinc-700
      via-zinc-800
      to-zinc-900 to-70%
      flex flex-col justify-center
      items-center
      gap-4
      min-h-screen
      overflow-hidden
      "
    >
      <h1>
        <img
          alt="Star Wars logo"
          src={ starWarsLogo }
          className="w-64 mt-4 focus: animate-pulse"
        />
      </h1>
      <h4
        className="text-yellow-300
        text-md
        font-bold
        underline
        decoration-black
        decoration-double
        decoration-2
        "
      >
        Planet Search
      </h4>
      <SearchInput />
      <div className="flex flex-row gap-2">
        <Filter />
        <Sort />
      </div>
      <ActiveFilter />
      <Table />
    </div>
  );
}

//
export default App;
