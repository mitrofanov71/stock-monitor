import React, { ChangeEvent } from 'react';
import { FiltersType } from '@/types/common';

interface Props {
  search: string;
  onSearch: (value: string) => void;
  filter: FiltersType;
  onSetFilter: (FiltersType) => void;
}

const Header = ({ search, onSearch, filter, onSetFilter }: Props) => {
  const handleSearchChange = (e: ChangeEvent) => {
    onSearch(e.target.value);
  };
  const handleSetFilter = (filter: FiltersType) => () => {
    onSetFilter(filter);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Поиск по символу акции"
        className="border rounded p-2 w-full md:w-60"
      />
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded border ${
            filter === 'all' ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={handleSetFilter('all')}
        >
          Все
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            filter === 'up' ? 'bg-green-500 text-white' : ''
          }`}
          onClick={handleSetFilter('up')}
        >
          Растущие
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            filter === 'down' ? 'bg-red-500 text-white' : ''
          }`}
          onClick={handleSetFilter('down')}
        >
          Падающие
        </button>
      </div>
    </div>
  );
};

export default Header;
