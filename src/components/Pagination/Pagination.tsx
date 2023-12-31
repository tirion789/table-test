import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setStartSliceElement, setEndSliceElement } from '../../redux/Posts/posts';
import { usePagination } from '../../hooks/usePagination';
import { selectPosts } from '../../redux/Posts/selectors';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  const numberPages = posts.length / 10;
  const numberPagesArray = Array.from({ length: numberPages }, (_, index) => index + 1);

  const {
    handleClickCurrentPage,
    handleClickNextPage,
    handleClickPrevPage,
    startIndexPostsArraySlice,
    endIndexPostsArraysSlice,
    currentPage,
    arrayPages,
    startIndexNumberArraySlice,
    endIndexNumberArraySlice,
  } = usePagination(numberPagesArray);

  useEffect(() => {
    dispatch(setStartSliceElement(startIndexPostsArraySlice));
    dispatch(setEndSliceElement(endIndexPostsArraysSlice));
  }, [dispatch, startIndexPostsArraySlice, endIndexPostsArraysSlice]);

  return (
    <div className={styles.container}>
      <Link
        to={`/?page=${currentPage - 1}`}
        onClick={handleClickPrevPage}
        className={classNames(styles.button, currentPage === 1 && styles.disabled)}
      >
        Назад
      </Link>
      <ul className={styles.list}>
        {arrayPages.slice(startIndexNumberArraySlice, endIndexNumberArraySlice).map((page) => (
          <li key={page}>
            <Link
              to={`/?page=${page}`}
              onClick={() => handleClickCurrentPage(page)}
              className={classNames(styles.item, currentPage === page && styles.active_button)}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={`/?page=${currentPage + 1}`}
        onClick={handleClickNextPage}
        className={classNames(styles.button, currentPage === arrayPages.length && styles.disabled)}
      >
        Вперёд
      </Link>
    </div>
  );
};
