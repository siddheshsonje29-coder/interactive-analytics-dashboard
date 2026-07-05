import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce rapid state updates.
 * @param {*} value The value to watch and debounce.
 * @param {number} delay Timeout delay in milliseconds.
 * @returns {*} The debounced value.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
