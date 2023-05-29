import { useState, useCallback } from "react";
import { setSortedComments } from "./CommentsReducer";

const useCommentSort = (sortedComments, dispatch) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortByCreatedAt = useCallback(() => {
    const sortedByCreatedAt = [...sortedComments].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    dispatch(setSortedComments(sortedByCreatedAt));
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }, [sortedComments, sortOrder, dispatch]);

  const handleSortByUpdatedAt = useCallback(() => {
    const sortedByUpdatedAt = [...sortedComments].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      } else {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

    dispatch(setSortedComments(sortedByUpdatedAt));
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }, [sortedComments, sortOrder, dispatch]);

  return { sortOrder, handleSortByCreatedAt, handleSortByUpdatedAt };
};

export default useCommentSort;
