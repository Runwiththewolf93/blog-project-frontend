import { useMemo } from "react";

/**
 * Sorts the given array of comments based on the specified sort type, title sort order, and date sort order.
 *
 * @param {Array} comments - The array of comments to be sorted.
 * @param {string} sortType - The type of sorting to be applied ("title" or "date").
 * @param {string} titleSortOrder - The sort order for the titles ("asc" or "desc").
 * @param {string} dateSortOrder - The sort order for the dates ("asc" or "desc").
 * @return {Array} The sorted array of comments.
 */
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
