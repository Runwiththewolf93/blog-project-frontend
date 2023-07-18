import { useState } from "react";

/**
 * Returns a stateful value stored in local storage and a function to update it.
 *
 * @param {string} key - The key used to store the value in local storage.
 * @param {any} initialValue - The initial value to use if no value is found in local storage.
 * @return {Array} - An array containing the stored value and a function to update it.
 */
// Custom hook to read and write to localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
