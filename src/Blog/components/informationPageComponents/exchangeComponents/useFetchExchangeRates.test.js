import { renderHook, waitFor } from "@testing-library/react";
import useFetchExchangeRates from "./useFetchExchangeRates";
import {
  setLoading,
  setExchangeRates,
  setBaseExchangeRate,
  setErrorMessage,
} from "./ExchangeReducer";
import mockAxios from "jest-mock-axios";

describe("useFetchExchangeRates_function", () => {
  // Tests that exchange rates are fetched successfully and state is updated accordingly
  it("fetches exchange rates successfully and updates state", async () => {
    const dispatch = jest.fn();
    const abstractAPIKey = "test-key";
    const mockData = {
      data: {
        exchange_rates: { USD: 1.2, GBP: 0.9 },
        base: "EUR",
      },
    };

    mockAxios.get.mockResolvedValueOnce(mockData);

    renderHook(() => useFetchExchangeRates(abstractAPIKey, dispatch));

    await waitFor(() => expect(dispatch).toHaveBeenCalledTimes(4));

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(
      setExchangeRates(mockData.data.exchange_rates)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setBaseExchangeRate(mockData.data.base)
    );
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  // Tests that error message is not set when rate limit error occurs
  it("does not set error message when rate limit error occurs", async () => {
    const dispatch = jest.fn();
    const abstractAPIKey = "test-key";

    mockAxios.get.mockRejectedValue({ response: { status: 429 } });

    renderHook(() => useFetchExchangeRates(abstractAPIKey, dispatch));

    await waitFor(() => expect(dispatch).toHaveBeenCalledTimes(3));

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setErrorMessage(null));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  // Tests that error message is set when other error occurs
  it("sets error message when other error occurs", async () => {
    const dispatch = jest.fn();
    const abstractAPIKey = "test-key";

    mockAxios.get.mockRejectedValue({
      response: { status: 400 },
      message: "Bad Request",
    });

    renderHook(() => useFetchExchangeRates(abstractAPIKey, dispatch));

    await waitFor(() => expect(dispatch).toHaveBeenCalledTimes(3));

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setErrorMessage("Bad Request"));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  // Tests that loading is set to true before fetching exchange rates and false afterwards
  it("sets loading to true before fetching and to false after fetching", async () => {
    const abstractAPIKey = "testKey";
    const dispatch = jest.fn();

    // Mock successful API response
    mockAxios.get.mockResolvedValueOnce({
      data: {
        exchange_rates: { USD: 1.2 },
        base: "EUR",
      },
    });

    renderHook(() => useFetchExchangeRates(abstractAPIKey, dispatch));

    await waitFor(() => expect(dispatch).toHaveBeenCalledTimes(4));

    // Check that loading is set to true before fetching
    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  // Tests that exchange rates are fetched again when abstractAPIKey changes
  it("fetches exchange rates again when abstractAPIKey changes", () => {
    const dispatch = jest.fn();

    // Mock the API response
    const mockResponse = {
      data: {
        exchange_rates: { USD: 1.2 },
        base: "EUR",
      },
    };

    const { rerender } = renderHook(abstractAPIKey =>
      useFetchExchangeRates(abstractAPIKey, dispatch)
    );

    // Initial render
    rerender("testKey1");

    // Mock the API response
    mockAxios.mockResponse(mockResponse);

    // Check that the API was called
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    // Rerender with a new abstractAPIKey
    rerender("testKey2");

    // Mock the API response
    mockAxios.mockResponse(mockResponse);

    // Check that the API was called again
    expect(mockAxios.get).toHaveBeenCalledTimes(3);
  });
});
