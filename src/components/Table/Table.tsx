import React, { useEffect, useMemo, useState } from 'react';

import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  searchValue,
  selectEndSliceElement,
  selectPosts,
  selectStartSliceElement,
  status,
} from '../../redux/Posts/selectors';
import { fetchPosts } from '../../redux/Posts/asyncActions';
import { createNumberedArray, sortArrayByAlphabet, sortArrayByNumber } from '../../common/until';
import { PostType } from '../../redux/Posts/types';
import styles from './Table.module.scss';

export const Table = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const startIndex = useAppSelector(selectStartSliceElement);
  const endIndex = useAppSelector(selectEndSliceElement);
  const value = useAppSelector(searchValue);
  const postsStatus = useAppSelector(status);

  const [idSort, setIdSort] = useState(true);
  const [titleSort, setTitleSort] = useState(true);
  const [bodySort, setBodySort] = useState(true);
  const [postsList, setPostsList] = useState<PostType[]>(posts);

  const filteredPosts = useMemo(() => {
    return postsList
      .filter(
        ({ body, id, title }) =>
          body.toLowerCase().includes(value.toLowerCase()) ||
          String(id).toLowerCase().includes(value.toLowerCase()) ||
          title.toLowerCase().includes(value.toLowerCase())
      )

      .slice(startIndex, endIndex);
  }, [postsList, startIndex, endIndex, value]);

  const difference = 10 - filteredPosts.length;

  const handleClickSortByTitle = (type: string) => {
    switch (type) {
      case 'title':
        setBodySort(true);
        setIdSort(true);
        setPostsList(
          [...postsList].sort((a, b) =>
            sortArrayByAlphabet(a.title, b.title, titleSort, setTitleSort)
          )
        );
        break;
      case 'body':
        setIdSort(true);
        setTitleSort(true);
        setPostsList(
          [...postsList].sort((a, b) => sortArrayByAlphabet(a.body, b.body, bodySort, setBodySort))
        );

        break;
      case 'id':
        setTitleSort(true);
        setBodySort(true);
        setPostsList(
          [...postsList].sort((a, b) => sortArrayByNumber(a.id, b.id, idSort, setIdSort))
        );
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (postsStatus === 'success') {
      setPostsList(posts);
    }
  }, [posts, postsStatus]);

  return (
    <table className={styles.container}>
      <TableHeader
        idSort={idSort}
        bodySort={bodySort}
        titleSort={titleSort}
        handleClickSortByTitle={handleClickSortByTitle}
      />
      {filteredPosts.map(({ id, body, title }) => (
        <TableRow key={id} id={id} body={body} title={title} />
      ))}
      {difference && createNumberedArray(difference).map((_, index) => <TableRow key={index} />)}
    </table>
  );
};
