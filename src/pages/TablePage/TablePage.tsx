import React from 'react';

import { Table } from '../../components/Table';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { Pagination } from '../../components/Pagination';
import { Input } from '../../components/Input';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { searchValue } from '../../redux/Posts/selectors';
import { setSearchValue } from '../../redux/Posts/posts';
import styles from './TablePage.module.scss';

export const TablePage = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(searchValue);
  return (
    <main className={styles.wrapper}>
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
