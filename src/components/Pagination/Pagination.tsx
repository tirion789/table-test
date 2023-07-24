import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFirstSliceElement, setSecondSliceElement } from '../../redux/Posts/posts';
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
    firstIndexPostsArray,
    secondIndexPostsArray,
    value,
    arrayPages,
    firstIndexNumberArray,
    secondIndexNumberArray,
  } = usePagination(numberPagesArray);

  useEffect(() => {
    dispatch(setFirstSliceElement(firstIndexPostsArray));
    dispatch(setSecondSliceElement(secondIndexPostsArray));
  }, [dispatch, firstIndexPostsArray, secondIndexPostsArray]);

  return (
    <div className={styles.container}>
      <Link
        to={`/?page=${value - 1}`}
        onClick={handleClickPrevPage}
        className={classNames(styles.button, firstIndexPostsArray === 0 && styles.disabled)}
      >
        Назад
      </Link>
      <ul className={styles.list}>
        {arrayPages.slice(firstIndexNumberArray, secondIndexNumberArray).map((page) => (
          <li key={page}>
            <Link
              to={`/?page=${page}`}
              onClick={() => handleClickCurrentPage(page)}
              className={classNames(styles.item, value === page && styles.active_button)}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={`/?page=${value + 1}`}
        onClick={handleClickNextPage}
        className={classNames(
          styles.button,
          secondIndexPostsArray === posts.length && styles.disabled
        )}
      >
        Вперёд
      </Link>
    </div>
  );
};
