import { renderHook } from "@testing-library/react";
import useSortedComments from "./useSortedComments";

describe("useSortedComments_function", () => {
  // Tests that an empty array is returned when given an empty array of comments
  it("test_empty_comments", () => {
    const comments = [];
    const { result } = renderHook(() =>
      useSortedComments(comments, "title", "asc", "asc")
    );
    expect(result.current).toEqual([]);
  });

  // Tests that an empty array is returned when given null as the array of comments
  it("test_null_comments", () => {
    const comments = null;
    const { result } = renderHook(() =>
      useSortedComments(comments, "title", "asc", "asc")
    );
    expect(result.current).toEqual([]);
  });

  // Tests that a sorted array of comments is returned when given an array of comments with length 1
  it("test_single_comment", () => {
    const comments = [
      {
        blog: {
          title: "Title 1",
        },
        createdAt: "2022-01-01T00:00:00.000Z",
      },
    ];
    const { result } = renderHook(() =>
      useSortedComments(comments, "title", "asc", "asc")
    );
    expect(result.current).toEqual(comments);
  });

  // Tests that a sorted array of comments is returned when given an array of comments with length greater than 1
  it("test_multiple_comments", () => {
    const comments = [
      {
        blog: {
          title: "Title 1",
        },
        createdAt: "2022-01-01T00:00:00.000Z",
      },
      {
        blog: {
          title: "Title 2",
        },
        createdAt: "2022-01-02T00:00:00.000Z",
      },
    ];
    const { result } = renderHook(() =>
      useSortedComments(comments, "title", "asc", "asc")
    );
    expect(result.current).toEqual(comments);
  });

  // Tests that a sorted array of comments in ascending order of title is returned when given sortType as 'title' and titleSortOrder as 'asc'
  it("test_sort_by_title_asc", () => {
    const comments = [
      {
        blog: {
          title: "Title 2",
        },
        createdAt: "2022-01-01T00:00:00.000Z",
      },
      {
        blog: {
          title: "Title 1",
        },
        createdAt: "2022-01-02T00:00:00.000Z",
      },
    ];
    const { result } = renderHook(() =>
      useSortedComments(comments, "title", "asc", "asc")
    );
    expect(result.current).toEqual([comments[1], comments[0]]);
  });

  // Tests that a sorted array of comments in descending order of date is returned when given sortType as 'date' and dateSortOrder as 'desc'
  it("test_sort_by_date_desc", () => {
    const comments = [
      {
        blog: {
          title: "Title 1",
        },
        createdAt: "2022-01-01T00:00:00.000Z",
      },
      {
        blog: {
          title: "Title 2",
        },
        createdAt: "2022-01-02T00:00:00.000Z",
      },
    ];
    const { result } = renderHook(() =>
      useSortedComments(comments, "date", "asc", "desc")
    );
    expect(result.current).toEqual([comments[0], comments[1]]);
  });
});
