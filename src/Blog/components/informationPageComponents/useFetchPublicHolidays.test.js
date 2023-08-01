/* eslint-disable testing-library/no-unnecessary-act */
import { renderHook, screen, waitFor, act } from "@testing-library/react";
import useFetchPublicHolidays from "./useFetchPublicHolidays";
import mockAxios from "jest-mock-axios";

describe("useFetchPublicHolidays_function", () => {
  // Tests that the function returns an object with loading, error, and data properties
  it("test_happy_path_returns_object_with_loading_error_and_data_properties", async () => {
    const responseData = [{ name: "Holiday 1" }, { name: "Holiday 2" }];

    mockAxios.get.mockResolvedValue({ data: responseData });

    // Call the function
    const { result } = renderHook(() => useFetchPublicHolidays("US", 2022));

    // Use act to wait for all effects to run
    await act(async () => {
      await waitFor(() => result.current.loading === false);
    });

    // Assert the result
    expect(result.current).toEqual({
      loading: false,
      error: null,
      data: responseData,
    });
  });

  // Tests that the data property of the returned object contains an array of public holidays
  it("test_happy_path_data_property_contains_array_of_public_holidays", async () => {
    const responseData = [{ name: "Holiday 1" }, { name: "Holiday 2" }];

    mockAxios.get.mockResolvedValue({ data: responseData });

    // Call the function
    const { result } = renderHook(() => useFetchPublicHolidays("US", 2022));

    // Use act to wait for all effects to run
    await act(async () => {
      await waitFor(() => result.current.loading === false);
    });

    // Assert the data property
    expect(result.current.data).toEqual(responseData);
  });

  // Tests that the loading property of the returned object is initially true and becomes false after data is fetched
  it("test_happy_path_loading_property_is_initially_true_and_becomes_false_after_data_is_fetched", async () => {
    const responseData = [{ name: "Holiday 1" }, { name: "Holiday 2" }];

    mockAxios.get.mockResolvedValue({ data: responseData });

    // Call the function
    const { result } = renderHook(() => useFetchPublicHolidays("US", 2022));

    // Assert the loading property
    expect(result.current.loading).toBe(true);

    // Use act to wait for all effects to run
    await act(async () => {
      await waitFor(() => result.current.loading === false);
    });

    expect(result.current.loading).toBe(false);
  });

  // Tests that the function returns an object with an empty data array if no public holidays are found
  it("test_edge_case_returns_object_with_empty_data_array_if_no_public_holidays_are_found", async () => {
    const responseData = [];

    mockAxios.get.mockResolvedValue({ data: responseData });

    // Call the function
    const { result } = renderHook(() => useFetchPublicHolidays("US", 2022));

    // Use act to wait for all effects to run
    await act(async () => {
      await waitFor(() => result.current.loading === false);
    });

    // Assert the result
    expect(result.current).toEqual({
      loading: false,
      error: null,
      data: responseData,
    });
  });

  // Tests that the function sets the error property of the returned object if the API call fails
  it("test_edge_case_sets_error_property_if_API_call_fails", async () => {
    const errorMessage = "API error";
    mockAxios.get.mockRejectedValue(new Error(errorMessage));

    // Call the function
    const { result } = renderHook(() => useFetchPublicHolidays("US", 2022));

    // Use act to wait for all effects to run
    await act(async () => {
      await waitFor(() => result.current.loading === false);
    });

    // Assert the result
    expect(result.current).toEqual({
      loading: false,
      error: errorMessage,
      data: [],
    });
  });

  // Tests that the API call is made again if the countryCode or year parameters change
  it("test_general_behaviour_API_call_is_made_again_if_countryCode_or_year_parameters_change", async () => {
    const responseData = [{ name: "Holiday 1" }, { name: "Holiday 2" }];
    mockAxios.get.mockResolvedValue({ data: responseData });

    // Call the function with initial parameters
    const { result, rerender } = renderHook(
      ({ countryCode, year }) => useFetchPublicHolidays(countryCode, year),
      {
        initialProps: { countryCode: "US", year: 2022 },
      }
    );

    // Use act to wait for all effects to run
    await act(async () => {
      await waitFor(() => result.current.loading === false);
    });

    // Reset the mock to clear the previous call
    mockAxios.get.mockClear();

    // Change the parameters
    rerender({ countryCode: "UK", year: 2023 });

    // Use act to wait for all effects to run
    await act(async () => {
      await waitFor(() => result.current.loading === false);
    });

    // Assert the result
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});
