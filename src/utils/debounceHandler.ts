import { debounce } from 'lodash';

export const debounceHandler = (
  callback: (isCorrect: boolean, index: number) => void,
  delay: number
) => {
  return debounce(callback, delay);
};