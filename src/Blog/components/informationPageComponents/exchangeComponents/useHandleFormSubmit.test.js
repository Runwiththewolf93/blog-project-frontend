import { renderHook, act } from "@testing-library/react";
import { debounce } from "lodash";
import useHandleFormSubmit from "./useHandleFormSubmit";
import {
  setLoading,
  setConvertedAmount,
  setExchangeRate,
  setErrorMessage,
} from "./ExchangeReducer";
import mockAxios from "jest-mock-axios";

jest.mock("lodash");

describe("useHandleFormSubmit_function", () => {
  // Tests that form submission triggers API call and data is dispatched
  it("fetches exchange rate and updates state on form submit", async () => {
    const abstractAPIKey = "testKey";
    const state = {
      baseCurrency: "USD",
      targetCurrency: "EUR",
      date: "2023-07-26",
      baseAmount: 100,
    };
    const dispatch = jest.fn();
    const mockData = {
      converted_amount: 85,
      exchange_rate: 0.85,
    };
    mockAxios.get.mockResolvedValue({ data: mockData });
    debounce.mockImplementation(fn => fn);

    const { result } = renderHook(() =>
      useHandleFormSubmit(abstractAPIKey, state, dispatch)
    );

    await act(async () => {
      await result.current({ preventDefault: jest.fn() });
    });

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(
      setConvertedAmount(mockData.converted_amount)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setExchangeRate(mockData.exchange_rate)
    );
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  // Tests that error state is set to error message after API call
  it("test_handle_form_submit_error", async () => {
    const abstractAPIKey = "testKey";
    const state = {
      baseCurrency: "USD",
      targetCurrency: "EUR",
      date: "2023-07-26",
      baseAmount: 100,
    };
    const dispatch = jest.fn();

    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Test error"))
    );
    debounce.mockImplementation(fn => fn);

    const { result } = renderHook(() =>
      useHandleFormSubmit(abstractAPIKey, state, dispatch)
    );

    // Call the returned function
    await act(async () => {
      await result.current({ preventDefault: jest.fn() });
    });

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setErrorMessage("Test error"));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  // Tests that API call returns 429 error and error message is set to null
  it("sets error to null when status code is 429", async () => {
    const abstractAPIKey = "testKey";
    const state = {
      baseCurrency: "USD",
      targetCurrency: "EUR",
      date: "2023-07-26",
      baseAmount: 100,
    };
    const dispatch = jest.fn();

    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({ response: { status: 429 } })
    );
    debounce.mockImplementation(fn => fn);

    const { result } = renderHook(() =>
      useHandleFormSubmit(abstractAPIKey, state, dispatch)
    );

    // Call the returned function
    await act(async () => {
      await result.current({ preventDefault: jest.fn() });
    });

    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(setErrorMessage(null));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  // Tests that debounced function is called after 1000ms
  it("calls the debounce function after 1000ms", async () => {
    const abstractAPIKey = "testKey";
    const state = {
      baseCurrency: "USD",
      targetCurrency: "EUR",
      date: "2021-01-01",
      baseAmount: 100,
    };
    const dispatch = jest.fn();
    const mockDebounce = debounce;
    mockDebounce.mockImplementation((fn, delay) => {
      return fn;
    });

    const { result } = renderHook(() =>
      useHandleFormSubmit(abstractAPIKey, state, dispatch)
    );
    const handleFormSubmit = result.current;

    const mockEvent = { preventDefault: jest.fn() };
    await act(async () => {
      await handleFormSubmit(mockEvent);
    });

    expect(mockDebounce).toHaveBeenCalledTimes(1);
    expect(mockDebounce).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  // Tests that form submission is prevented
  it("test_form_submission_prevented", () => {
    const mockPreventDefault = jest.fn();
    const mockEvent = { preventDefault: mockPreventDefault };

    const abstractAPIKey = "testKey";
    const state = {
      baseCurrency: "USD",
      targetCurrency: "EUR",
      date: "2021-01-01",
      baseAmount: 100,
    };
    const dispatch = jest.fn();
    debounce.mockImplementation(fn => fn);

    const handleFormSubmit = useHandleFormSubmit(
      abstractAPIKey,
      state,
      dispatch
    );

    handleFormSubmit(mockEvent);

    expect(mockPreventDefault).toHaveBeenCalled();
  });
});
