import { useMemo } from "react";

const useSortedComments = (
  comments,
  sortType,
  titleSortOrder,
  dateSortOrder
) => {
  return useMemo(() => {
    if (!comments || comments.length === 0) return [];

    return [...comments].sort((a, b) => {
      const titleA = a.blog.title ? a.blog.title.toLowerCase() : "";
      const titleB = b.blog.title ? b.blog.title.toLowerCase() : "";

      if (sortType === "title") {
        return (
          (titleSortOrder === "asc" ? 1 : -1) * titleA.localeCompare(titleB)
        );
      }
      return (
        (dateSortOrder === "asc" ? 1 : -1) *
        (new Date(b.createdAt) - new Date(a.createdAt))
      );
    });
  }, [comments, sortType, titleSortOrder, dateSortOrder]);
};

export default useSortedComments;
