import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { searchElementSliceArray } from '../common/until';

export const usePagination = (arrayPages: number[]) => {
  const [startIndexPostsArraySlice, setStartIndexPostsArraySlice] = useState(0);
  const [endIndexPostsArraysSlice, setEndIndexPostsArray] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndexNumberArraySlice, setStartIndexNumberArraySlice] = useState(0);
  const [endIndexNumberArraySlice, setEndIndexNumberArraySlice] = useState(5);

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const pageParam = urlSearchParams.get('page');
    const pageSliceArrayIndex = Number(pageParam) * 10;

    if (pageParam === null) {
      setCurrentPage(1);
      navigate('/?page=1');
    }

    setCurrentPage(Number(pageParam));
    setEndIndexPostsArray(pageSliceArrayIndex);
    setStartIndexPostsArraySlice(pageSliceArrayIndex - 10);
  }, [startIndexNumberArraySlice, navigate, search, endIndexNumberArraySlice]);

  const penultimateElementPagesSliceArray = searchElementSliceArray(
    3,
    arrayPages,
    startIndexNumberArraySlice,
    endIndexNumberArraySlice
  );

  const secondElementPagesSliceArray = searchElementSliceArray(
    1,
    arrayPages,
    startIndexNumberArraySlice,
    endIndexNumberArraySlice
  );

  const lastElementPagesSliceArray = searchElementSliceArray(
    4,
    arrayPages,
    startIndexNumberArraySlice,
    endIndexNumberArraySlice
  );

  const firstElementPagesSliceArray = searchElementSliceArray(
    0,
    arrayPages,
    startIndexNumberArraySlice,
    endIndexNumberArraySlice
  );

  const handleClickNextPage = () => {
    if (currentPage !== arrayPages.length) {
      setStartIndexPostsArraySlice((prev) => prev + 10);
      setEndIndexPostsArray((prev) => prev + 10);
    }

    if (
      currentPage === penultimateElementPagesSliceArray &&
      currentPage !== arrayPages.length - 1
    ) {
      setStartIndexNumberArraySlice((prev) => prev + 1);
      setEndIndexNumberArraySlice((prev) => prev + 1);
    }
  };

  const handleClickPrevPage = () => {
    if (startIndexPostsArraySlice !== 0) {
      setStartIndexPostsArraySlice((prev) => prev - 10);
      setEndIndexPostsArray((prev) => prev - 10);
    }

    if (currentPage === secondElementPagesSliceArray && currentPage !== arrayPages[1]) {
      setStartIndexNumberArraySlice((prev) => prev - 1);
      setEndIndexNumberArraySlice((prev) => prev - 1);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const handleClickCurrentPage = (page: number) => {
    setCurrentPage(page);

    const pageSliceArrayIndex = page * 10;
    setEndIndexPostsArray(pageSliceArrayIndex);
    setStartIndexPostsArraySlice(pageSliceArrayIndex - 10);

    if (page === arrayPages.at(-1) || page === arrayPages[0]) {
      return;
    }

    if (page === lastElementPagesSliceArray) {
      setStartIndexNumberArraySlice((prev) => prev + 1);
      setEndIndexNumberArraySlice((prev) => prev + 1);
    }
    if (page === firstElementPagesSliceArray) {
      setStartIndexNumberArraySlice((prev) => prev - 1);
      setEndIndexNumberArraySlice((prev) => prev - 1);
    }
  };

  return {
    handleClickNextPage,
    handleClickPrevPage,
    handleClickCurrentPage,
    setEndIndexPostsArray,
    setCurrentPage,
    startIndexPostsArraySlice,
    startIndexNumberArraySlice,
    endIndexNumberArraySlice,
    endIndexPostsArraysSlice,
    currentPage,
    arrayPages,
  };
};
