import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { searchElementSliceArray } from '../common/until';

export const usePagination = (arrayPages: number[]) => {
  const [firstIndexPostsArray, setFirstIndexPostsArray] = useState(0);
  const [secondIndexPostsArray, setSecondIndexPostsArray] = useState(10);
  const [value, setValue] = useState(1);
  const [firstIndexNumberArray, setFirstIndexNumberArray] = useState(0);
  const [secondIndexNumberArray, setSecondIndexNumberArray] = useState(5);

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
    setSecondIndexPostsArray(pageSliceArrayIndex);
    setFirstIndexPostsArray(pageSliceArrayIndex - 10);
  }, [firstIndexNumberArray, navigate, search, secondIndexNumberArray]);

  const penultimateElementPagesSliceArray = searchElementSliceArray(
    3,
    arrayPages,
    firstIndexNumberArray,
    secondIndexNumberArray
  );

  const secondElementPagesSliceArray = searchElementSliceArray(
    1,
    arrayPages,
    firstIndexNumberArray,
    secondIndexNumberArray
  );

  const lastElementPagesSliceArray = searchElementSliceArray(
    4,
    arrayPages,
    firstIndexNumberArray,
    secondIndexNumberArray
  );

  const firstElementPagesSliceArray = searchElementSliceArray(
    0,
    arrayPages,
    firstIndexNumberArray,
    secondIndexNumberArray
  );

  const handleClickNextPage = () => {
    if (value !== arrayPages.length) {
      setFirstIndexPostsArray((prev) => prev + 10);
      setSecondIndexPostsArray((prev) => prev + 10);
    }

    if (value === penultimateElementPagesSliceArray && value !== arrayPages.length - 1) {
      setFirstIndexNumberArray((prev) => prev + 1);
      setSecondIndexNumberArray((prev) => prev + 1);
    }
  };

  const handleClickPrevPage = () => {
    if (firstIndexPostsArray !== 0) {
      setFirstIndexPostsArray((prev) => prev - 10);
      setSecondIndexPostsArray((prev) => prev - 10);
    }

    if (value === secondElementPagesSliceArray && value !== arrayPages[1]) {
      setFirstIndexNumberArray((prev) => prev - 1);
      setSecondIndexNumberArray((prev) => prev - 1);
    }
    setValue((prev) => prev - 1);
  };

  const handleClickCurrentPage = (page: number) => {
    setValue(page);

    const pageSliceArrayIndex = page * 10;
    setSecondIndexPostsArray(pageSliceArrayIndex);
    setFirstIndexPostsArray(pageSliceArrayIndex - 10);

    if (page === arrayPages.at(-1) || page === arrayPages[0]) {
      return;
    }

    if (page === lastElementPagesSliceArray) {
      setFirstIndexNumberArray((prev) => prev + 1);
      setSecondIndexNumberArray((prev) => prev + 1);
    }
    if (page === firstElementPagesSliceArray) {
      setFirstIndexNumberArray((prev) => prev - 1);
      setSecondIndexNumberArray((prev) => prev - 1);
    }
  };

  return {
    handleClickNextPage,
    handleClickPrevPage,
    handleClickCurrentPage,
    setSecondIndexPostsArray,
    setValue,
    firstIndexPostsArray,
    firstIndexNumberArray,
    secondIndexNumberArray,
    secondIndexPostsArray,
    value,
    arrayPages,
  };
};
