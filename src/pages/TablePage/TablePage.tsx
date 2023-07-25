import React from 'react';

import { Table } from '../../components/Table';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { Pagination } from '../../components/Pagination';
import { Input } from '../../components/Input';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { searchValue } from '../../redux/Posts/selectors';
import { setSearchValue } from '../../redux/Posts/posts';

export const TablePage = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(searchValue);
  return (
    <main>
      <Input
        icon={<SearchIcon />}
        placeholder="Поиск"
        value={value}
        onChange={(event) => dispatch(setSearchValue(event.target.value))}
      />
      <Table />
      <Pagination />
    </main>
  );
};
