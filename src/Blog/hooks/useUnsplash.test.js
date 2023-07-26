import { renderHook, waitFor } from "@testing-library/react";
import useUnsplashImages from "./useUnsplash";
import mockAxios from "jest-mock-axios";

// Save the original value
let originalAccessKey;

beforeEach(() => {
  // Save the original value
  originalAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  // Set the mock value
  process.env.REACT_APP_UNSPLASH_ACCESS_KEY = "mock_access_key";
});

afterEach(() => {
  mockAxios.reset();

  // Reset the environment variable to its original value
  process.env.REACT_APP_UNSPLASH_ACCESS_KEY = originalAccessKey;
});

describe("useUnsplashImages_function", () => {
  // Tests that images are fetched successfully
  it("test_fetch_images_successfully", async () => {
    const mockData = {
      results: Array(5).fill({
        id: "1",
        urls: { small: "https://example.com" },
      }),
    };

    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() =>
      useUnsplashImages("dogs", 5, jest.fn(), jest.fn())
    );

    await waitFor(() => expect(result.current.length).toBe(5));
  });

  // Tests that loading state is set to true when fetching images
  it("test_loading_state_when_fetching_images", async () => {
    const setIsLoadingImages = jest.fn();

    renderHook(() => useUnsplashImages("dogs", 5, setIsLoadingImages));

    expect(setIsLoadingImages).toHaveBeenCalledWith(true);
  });

  // Tests that loading state is set to false after images are fetched
  it("test_loading_state_after_fetching_images", async () => {
    const mockData = {
      results: Array(5).fill({
        id: "1",
        urls: { small: "https://example.com" },
      }),
    };

    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    const setIsLoadingImages = jest.fn();

    renderHook(() => useUnsplashImages("dogs", 5, setIsLoadingImages));

    // Wait for the loading state to be set to false
    await waitFor(() =>
      expect(setIsLoadingImages).toHaveBeenLastCalledWith(false)
    );
  });

  // Tests that error state is set when there is an error fetching images
  it("test_error_state_when_fetching_images", async () => {
    const setIsLoadingImages = jest.fn();
    const setErrorImages = jest.fn();

    mockAxios.get.mockRejectedValueOnce(new Error("mock error message"));

    renderHook(() =>
      useUnsplashImages("invalid_query", 5, setIsLoadingImages, setErrorImages)
    );

    // Wait for the error state to be set
    await waitFor(() => expect(setErrorImages).toHaveBeenCalled());
  });

  // Tests that loading state is set to false when there is an error fetching images
  it("test_loading_state_when_error_fetching_images", async () => {
    const setIsLoadingImages = jest.fn();
    const setErrorImages = jest.fn();

    mockAxios.get.mockRejectedValueOnce(new Error("mock error message"));

    renderHook(() =>
      useUnsplashImages("invalid_query", 5, setIsLoadingImages, setErrorImages)
    );

    await waitFor(() =>
      expect(setIsLoadingImages).toHaveBeenLastCalledWith(false)
    );
  });

  // Tests that empty array is returned when numOfPhotos is 0
  it("test_empty_array_when_numOfPhotos_is_0", async () => {
    const mockData = { results: [] };

    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    const setIsLoadingImages = jest.fn();
    const setErrorImages = jest.fn();

    const { result } = renderHook(() =>
      useUnsplashImages("dogs", 0, setIsLoadingImages, setErrorImages)
    );

    expect(result.current.length).toBe(0);
  });
});
