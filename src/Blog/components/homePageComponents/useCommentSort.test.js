import { renderHook, act } from "@testing-library/react";
import useCommentSort from "./useCommentSort";
import { setSortedComments } from "./CommentsReducer";

// Tests that comments are sorted by createdAt field in descending order
it("test_sort_by_created_at_descending", () => {
  const comments = [
    { id: 1, createdAt: "2022-01-01T00:00:00.000Z" },
    { id: 2, createdAt: "2022-01-02T00:00:00.000Z" },
    { id: 3, createdAt: "2022-01-03T00:00:00.000Z" },
  ];
  const dispatch = jest.fn();
  const setSortState = jest.fn();
  const sortState = { field: "createdAt", order: "asc" };
  const sortedComments = comments;

  const { result } = renderHook(() =>
    useCommentSort(sortedComments, dispatch, sortState, setSortState)
  );

  act(() => {
    result.current.handleSortByCreatedAt();
  });

  expect(dispatch).toHaveBeenCalledWith(setSortedComments(comments.reverse()));
  expect(setSortState).toHaveBeenCalledWith({
    field: "createdAt",
    order: "desc",
  });
});

// Tests that comments are sorted by createdAt field in ascending order
it("test_sort_by_created_at_ascending", () => {
  const comments = [
    { id: 1, createdAt: "2022-01-01T00:00:00.000Z" },
    { id: 2, createdAt: "2022-01-02T00:00:00.000Z" },
    { id: 3, createdAt: "2022-01-03T00:00:00.000Z" },
  ];
  const dispatch = jest.fn();
  const setSortState = jest.fn();
  const sortState = { field: "createdAt", order: "desc" };
  const sortedComments = comments;

  const { result } = renderHook(() =>
    useCommentSort(sortedComments, dispatch, sortState, setSortState)
  );

  act(() => {
    result.current.handleSortByCreatedAt();
  });

  expect(dispatch).toHaveBeenCalledWith(setSortedComments(comments));
  expect(setSortState).toHaveBeenCalledWith({
    field: "createdAt",
    order: "asc",
  });
});

// Tests that comments are sorted by updatedAt field in descending order
it("test_sort_by_updated_at_descending", () => {
  const comments = [
    { id: 1, updatedAt: "2022-01-01T00:00:00.000Z" },
    { id: 2, updatedAt: "2022-01-02T00:00:00.000Z" },
    { id: 3, updatedAt: "2022-01-03T00:00:00.000Z" },
  ];
  const dispatch = jest.fn();
  const setSortState = jest.fn();
  const sortState = { field: "updatedAt", order: "asc" };
  const sortedComments = comments;

  const { result } = renderHook(() =>
    useCommentSort(sortedComments, dispatch, sortState, setSortState)
  );

  act(() => {
    result.current.handleSortByUpdatedAt();
  });

  expect(dispatch).toHaveBeenCalledWith(setSortedComments(comments.reverse()));
  expect(setSortState).toHaveBeenCalledWith({
    field: "updatedAt",
    order: "desc",
  });
});

// Tests that comments are sorted by updatedAt field in ascending order
it("test_sort_by_updated_at_ascending", () => {
  const comments = [
    { id: 1, updatedAt: "2022-01-01T00:00:00.000Z" },
    { id: 2, updatedAt: "2022-01-02T00:00:00.000Z" },
    { id: 3, updatedAt: "2022-01-03T00:00:00.000Z" },
  ];
  const dispatch = jest.fn();
  const setSortState = jest.fn();
  const sortState = { field: "updatedAt", order: "desc" };
  const sortedComments = comments;

  const { result } = renderHook(() =>
    useCommentSort(sortedComments, dispatch, sortState, setSortState)
  );

  act(() => {
    result.current.handleSortByUpdatedAt();
  });

  expect(dispatch).toHaveBeenCalledWith(setSortedComments(comments));
  expect(setSortState).toHaveBeenCalledWith({
    field: "updatedAt",
    order: "asc",
  });
});

// Tests that comments are sorted by totalVotes field in descending order
it("test_sort_by_votes_descending", () => {
  const comments = [
    { id: 1, totalVotes: 1 },
    { id: 2, totalVotes: 2 },
    { id: 3, totalVotes: 3 },
  ];
  const dispatch = jest.fn();
  const setSortState = jest.fn();
  const sortState = { field: "totalVotes", order: "asc" };
  const sortedComments = comments;

  const { result } = renderHook(() =>
    useCommentSort(sortedComments, dispatch, sortState, setSortState)
  );

  act(() => {
    result.current.handleSortByVotes();
  });

  expect(dispatch).toHaveBeenCalledWith(setSortedComments(comments.reverse()));
  expect(setSortState).toHaveBeenCalledWith({
    field: "totalVotes",
    order: "desc",
  });
});

// Tests that comments are sorted by totalVotes field in ascending order
it("test_sort_by_votes_ascending", () => {
  const comments = [
    { id: 1, totalVotes: 1 },
    { id: 2, totalVotes: 2 },
    { id: 3, totalVotes: 3 },
  ];
  const dispatch = jest.fn();
  const setSortState = jest.fn();
  const sortState = { field: "totalVotes", order: "desc" };
  const sortedComments = comments;

  const { result } = renderHook(() =>
    useCommentSort(sortedComments, dispatch, sortState, setSortState)
  );

  act(() => {
    result.current.handleSortByVotes();
  });

  expect(dispatch).toHaveBeenCalledWith(setSortedComments(comments));
  expect(setSortState).toHaveBeenCalledWith({
    field: "totalVotes",
    order: "asc",
  });
});
