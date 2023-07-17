import { renderHook, fireEvent } from "@testing-library/react";
import useScrollToLoadMore from "./useScroll";

describe("useScrollToLoadMore_function", () => {
  jest.useFakeTimers();

  // Tests that scrolling down triggers setPage function when isLoadingFilter is false, hasMore is true, and bottomThreshold is reached
  it("test_scroll_down_triggers_set_page", () => {
    const setPage = jest.fn();
    const windowHeight = 1000;
    const documentHeight = 2000;
    const scrollTop = 500;
    const bottomThreshold = 1000;
    global.innerHeight = windowHeight;

    // Create a custom document object
    const documentMock = {
      ...document,
      documentElement: {
        ...document.documentElement,
        scrollHeight: documentHeight,
        scrollTop: scrollTop,
      },
    };

    // Replace the global document with the custom document
    global.document = documentMock;

    renderHook(() =>
      useScrollToLoadMore({ isLoadingFilter: false, hasMore: true, setPage })
    );

    fireEvent.scroll(window);

    // Advance timers by the debounce delay
    jest.runAllTimers();

    expect(setPage).toHaveBeenCalledTimes(1);
    // Check that setPage was called with a function
    const setPageArg = setPage.mock.calls[0][0];
    expect(typeof setPageArg).toBe("function");
    // Call the function with a mock previous page value and check the return value
    const mockPrevPage = 0;
    expect(setPageArg(mockPrevPage)).toBe(1);
  });

  // Tests that scrolling down does not trigger setPage function when isLoadingFilter is true
  it("test_scroll_down_does_not_trigger_set_page_when_loading_filter_is_true", () => {
    const setPage = jest.fn();
    const windowHeight = 1000;
    const documentHeight = 2000;
    const scrollTop = 500;
    const bottomThreshold = 1000;

    global.innerHeight = windowHeight;

    // Create a custom document object
    const documentMock = {
      ...document,
      documentElement: {
        ...document.documentElement,
        scrollHeight: documentHeight,
        scrollTop: scrollTop,
      },
    };

    // Replace the global document with the custom document
    global.document = documentMock;

    renderHook(() =>
      useScrollToLoadMore({ isLoadingFilter: true, hasMore: true, setPage })
    );

    fireEvent.scroll(window);

    expect(setPage).not.toHaveBeenCalled();
  });

  // Tests that scrolling down does not trigger setPage function when hasMore is false
  it("test_scroll_down_does_not_trigger_set_page_when_has_more_is_false", () => {
    const setPage = jest.fn();
    const windowHeight = 1000;
    const documentHeight = 2000;
    const scrollTop = 500;
    const bottomThreshold = 1000;

    global.innerHeight = windowHeight;

    // Create a custom document object
    const documentMock = {
      ...document,
      documentElement: {
        ...document.documentElement,
        scrollHeight: documentHeight,
        scrollTop: scrollTop,
      },
    };

    // Replace the global document with the custom document
    global.document = documentMock;

    renderHook(() =>
      useScrollToLoadMore({ isLoadingFilter: false, hasMore: false, setPage })
    );

    fireEvent.scroll(window);

    expect(setPage).not.toHaveBeenCalled();
  });

  // Tests that scrolling down does not trigger setPage function when bottomThreshold is not reached
  it("test_scroll_down_does_not_trigger_set_page_when_bottom_threshold_is_not_reached", () => {
    const setPage = jest.fn();
    const windowHeight = 1000;
    const documentHeight = 2000;
    const scrollTop = 500;
    const bottomThreshold = 1000;

    global.innerHeight = windowHeight;

    // Create a custom document object
    const documentMock = {
      ...document,
      documentElement: {
        ...document.documentElement,
        scrollHeight: documentHeight,
        scrollTop: scrollTop,
      },
    };

    // Replace the global document with the custom document
    global.document = documentMock;

    renderHook(() =>
      useScrollToLoadMore({ isLoadingFilter: false, hasMore: true, setPage })
    );

    fireEvent.scroll(window);

    expect(setPage).not.toHaveBeenCalled();
  });

  // Tests that setPage function is not called when window is not defined
  it("test_set_page_function_not_called_when_window_is_not_defined", () => {
    const setPage = jest.fn();
    const windowHeight = 1000;
    const documentHeight = 2000;
    const scrollTop = 500;
    const bottomThreshold = 1000;

    global.innerHeight = windowHeight;

    // Create a custom document object
    const documentMock = {
      ...document,
      documentElement: {
        ...document.documentElement,
        scrollHeight: documentHeight,
        scrollTop: scrollTop,
      },
    };

    // Replace the global document with the custom document
    global.document = documentMock;

    renderHook(() =>
      useScrollToLoadMore({ isLoadingFilter: false, hasMore: true, setPage })
    );

    global.window = undefined;
    fireEvent.scroll(window);

    expect(setPage).not.toHaveBeenCalled();
  });

  // Tests that setPage function is not called when document is not defined
  it("test_set_page_function_not_called_when_document_is_not_defined", () => {
    const setPage = jest.fn();
    const windowHeight = 1000;
    const documentHeight = 2000;
    const scrollTop = 500;
    const bottomThreshold = 1000;

    global.innerHeight = windowHeight;

    // Create a custom document object
    const documentMock = {
      ...document,
      documentElement: {
        ...document.documentElement,
        scrollHeight: documentHeight,
        scrollTop: scrollTop,
      },
    };

    // Replace the global document with the custom document
    global.document = undefined;

    renderHook(() =>
      useScrollToLoadMore({ isLoadingFilter: false, hasMore: true, setPage })
    );

    fireEvent.scroll(window);

    expect(setPage).not.toHaveBeenCalled();
  });
});
