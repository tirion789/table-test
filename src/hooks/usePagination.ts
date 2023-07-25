import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { searchElementSliceArray } from '../common/until';

export const usePagination = (arrayPages: number[]) => {
  const [startIndexPostsArraySlice, setStartIndexPostsArraySlice] = useState(0);
  const [endIndexPostsArraysSlice, setEndIndexPostsArray] = useState(10);
  const [value, setValue] = useState(1);
  const [startIndexNumberArraySlice, setStartIndexNumberArraySlice] = useState(0);
  const [endIndexNumberArraySlice, setEndIndexNumberArraySlice] = useState(5);

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const pageParam = urlSearchParams.get('page');
    const pageSliceArrayIndex = Number(pageParam) * 10;

    if (pageParam === null) {
      setValue(1);
      navigate('/?page=1');
    }

    setValue(Number(pageParam));
    setEndIndexPostsArray(pageSliceArrayIndex);
    setStartIndexPostsArraySlice(pageSliceArrayIndex - 10);
  }, [startIndexNumberArraySlice, navigate, search, endIndexNumberArraySlice, value]);

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
    if (value !== arrayPages.length) {
      setStartIndexPostsArraySlice((prev) => prev + 10);
      setEndIndexPostsArray((prev) => prev + 10);
    }

    if (value === penultimateElementPagesSliceArray && value !== arrayPages.length - 1) {
      setStartIndexNumberArraySlice((prev) => prev + 1);
      setEndIndexNumberArraySlice((prev) => prev + 1);
    }
  };

  const handleClickPrevPage = () => {
    if (startIndexPostsArraySlice !== 0) {
      setStartIndexPostsArraySlice((prev) => prev - 10);
      setEndIndexPostsArray((prev) => prev - 10);
    }

    if (value === secondElementPagesSliceArray && value !== arrayPages[1]) {
      setStartIndexNumberArraySlice((prev) => prev - 1);
      setEndIndexNumberArraySlice((prev) => prev - 1);
    }
    setValue((prev) => prev - 1);
  };

  const handleClickCurrentPage = (page: number) => {
    setValue(page);

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
    setValue,
    startIndexPostsArraySlice,
    startIndexNumberArraySlice,
    endIndexNumberArraySlice,
    endIndexPostsArraysSlice,
    value,
    arrayPages,
  };
};
