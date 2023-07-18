import { useState } from "react";

/**
 * Creates a custom hook that manages sorting functionality.
 *
 * @param {string} initialSortType - The initial sort type.
 * @param {string} initialSortOrder - The initial sort order.
 * @return {object} An object containing the current sort type,
 *                  title sort order, date sort order, as well as
 *                  functions to sort by title and date.
 */
const useSort = (initialSortType, initialSortOrder) => {
  const [sortType, setSortType] = useState(initialSortType);
  const [titleSortOrder, setTitleSortOrder] = useState(initialSortOrder);
  const [dateSortOrder, setDateSortOrder] = useState(initialSortOrder);

  /**
   * Sorts the data by title in ascending or descending order.
   *
   * @return {void} No return value.
   */
  const sortByTitleFunction = () => {
    setTitleSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    setSortType("title");
  };

  /**
   * A function that sorts the data by date.
   *
   * @return {void} No return value.
   */
  const sortByDateFunction = () => {
    setDateSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    setSortType("date");
  };

  return {
    sortType,
    titleSortOrder,
    dateSortOrder,
    sortByTitleFunction,
    sortByDateFunction,
  };
};

export default useSort;
