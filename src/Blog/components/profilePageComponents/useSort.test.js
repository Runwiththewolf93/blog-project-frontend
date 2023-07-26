import { renderHook, act } from "@testing-library/react";
import useSort from "./useSort";

describe("useSort_function", () => {
  // Tests that initial sort type and order are set correctly
  it("test_initial_sort_type_and_order", () => {
    const { result } = renderHook(() => useSort("title", "asc"));
    expect(result.current.sortType).toBe("title");
    expect(result.current.titleSortOrder).toBe("asc");
    expect(result.current.dateSortOrder).toBe("asc");
  });

  // Tests that sortByTitleFunction updates titleSortOrder and sortType correctly
  it("test_sort_by_title_function", () => {
    const { result } = renderHook(() => useSort("title", "asc"));

    act(() => {
      result.current.sortByTitleFunction();
    });

    expect(result.current.sortType).toBe("title");
    expect(result.current.titleSortOrder).toBe("desc");
  });

  // Tests that sortByDateFunction updates dateSortOrder and sortType correctly
  it("test_sort_by_date_function", () => {
    const { result } = renderHook(() => useSort("date", "asc"));

    act(() => {
      result.current.sortByDateFunction();
    });

    expect(result.current.sortType).toBe("date");
    expect(result.current.dateSortOrder).toBe("desc");
  });

  // Tests that useSort handles null initialSortType
  it("test_initial_sort_type_null", () => {
    const { result } = renderHook(() => useSort(null, "asc"));

    expect(result.current.sortType).toBe(null);
    expect(result.current.titleSortOrder).toBe("asc");
    expect(result.current.dateSortOrder).toBe("asc");
  });

  // Tests that useSort handles null initialSortOrder
  it("test_initial_sort_order_null", () => {
    const { result } = renderHook(() => useSort("title", null));

    expect(result.current.sortType).toBe("title");
    expect(result.current.titleSortOrder).toBe(null);
    expect(result.current.dateSortOrder).toBe(null);
  });

  // Tests that useSort handles invalid initialSortType and initialSortOrder
  it("test_initial_sort_type_and_order_invalid", () => {
    const { result } = renderHook(() => useSort("invalid", "invalid"));

    expect(result.current.sortType).toBe("invalid");
    expect(result.current.titleSortOrder).toBe("invalid");
    expect(result.current.dateSortOrder).toBe("invalid");
  });
});
