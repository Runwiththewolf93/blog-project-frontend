import { useState } from "react";

const useSort = (initialSortType, initialSortOrder) => {
  const [sortType, setSortType] = useState(initialSortType);
  const [titleSortOrder, setTitleSortOrder] = useState(initialSortOrder);
  const [dateSortOrder, setDateSortOrder] = useState(initialSortOrder);

  const sortByTitleFunction = () => {
    setTitleSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    setSortType("title");
  };

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
