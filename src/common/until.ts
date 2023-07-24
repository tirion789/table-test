export const sortArrayByAlphabet = (
  a: string,
  b: string,
  isSort: boolean,
  callback: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isSort) {
    callback(false);
    return -a.localeCompare(b);
  }

  callback(true);
  return a.localeCompare(b);
};

export const searchElementSliceArray = (
  element: number,
  array: number[],
  firstIndex: number,
  secondIndex: number
) => {
  return array.slice(firstIndex, secondIndex)[element];
};

export const sortArrayByNumber = (
  a: number,
  b: number,
  isSort: boolean,
  callback: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isSort) {
    callback(false);
    return b - a;
  }
  callback(true);
  return a - b;
};

export const createNumberedArray = (length: number, startNum = 1) => {
  return Array.from(Array(length).keys()).map((_, i) => startNum + i);
};
