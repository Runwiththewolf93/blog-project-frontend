import { useCallback } from "react";
import { setSortedComments } from "./CommentsReducer";

// useCommentSort hook
const useCommentSort = (sortedComments, dispatch, sortState, setSortState) => {
  const sortComments = useCallback(
    (comments, field, state) => {
      const sorted = [...comments].sort((a, b) => {
        if (field === "createdAt" || field === "updatedAt") {
          return state.order === "asc"
            ? new Date(a[field]) - new Date(b[field])
            : new Date(b[field]) - new Date(a[field]);
        } else {
          // for totalVotes
          return state.order === "asc"
            ? a[field] - b[field]
            : b[field] - a[field];
        }
      });

      dispatch(setSortedComments(sorted));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    field => {
      let newState;
      if (sortState.field === field) {
        // If the field is the same, just toggle the order
        newState = {
          field,
          order: sortState.order === "asc" ? "desc" : "asc",
        };
      } else {
        // If the field changes, reset the order to "asc"
        newState = { field, order: "asc" };
      }

      setSortState(newState);
      sortComments(sortedComments, field, newState);
    },
    // eslint-disable-next-line
    [sortState, sortedComments, sortComments]
  );

  return {
    sortState,
    handleSortByCreatedAt: () => handleSort("createdAt"),
    handleSortByUpdatedAt: () => handleSort("updatedAt"),
    handleSortByVotes: () => handleSort("totalVotes"),
  };
};

export default useCommentSort;
