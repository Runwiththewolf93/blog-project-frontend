import {
  SET_BASE_CURRENCY,
  SET_TARGET_CURRENCY,
  CLEAR_FORM,
  SWAP_CURRENCIES,
  SET_ERROR_MESSAGE,
  SET_EXCHANGE_RATES,
  HIDE_EXCHANGE_RATE,
  SHOW_EXCHANGE_RATE,
  SET_BASE_EXCHANGE_RATE,
  CLEAR_ERROR_MESSAGE,
  exchangeReducer,
} from "./ExchangeReducer";

describe("exchangeReducer_function", () => {
  // Tests that SET_BASE_CURRENCY action updates baseCurrency in state
  it("updates baseCurrency in state", () => {
    const state = { baseCurrency: "USD" };
    const action = { type: SET_BASE_CURRENCY, payload: "EUR" };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.baseCurrency).toEqual("EUR");
  });

  // Tests that SET_TARGET_CURRENCY action updates targetCurrency in state
  it("updates targetCurrency in state", () => {
    const state = { targetCurrency: "USD" };
    const action = { type: SET_TARGET_CURRENCY, payload: "EUR" };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.targetCurrency).toEqual("EUR");
  });

  // Tests that CLEAR_FORM action resets state to initialState except date and exchangeRates
  it("resets state to initialState except date and exchangeRates", () => {
    const state = {
      baseCurrency: "USD",
      targetCurrency: "EUR",
      date: "2022-01-01",
      exchangeRates: { USD: 1, EUR: 0.85 },
      baseAmount: 100,
      convertedAmount: 85,
      exchangeRate: 0.85,
      showExchangeRate: true,
      baseExchangeRate: 1,
      errorMessage: null,
    };
    const action = { type: CLEAR_FORM };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState).toEqual({
      baseCurrency: "USD",
      targetCurrency: "EUR",
      date: "2022-01-01",
      exchangeRates: { USD: 1, EUR: 0.85 },
      baseAmount: "",
      convertedAmount: "",
      exchangeRate: "",
      showExchangeRate: true,
      baseExchangeRate: "",
      errorMessage: null,
    });
  });

  // Tests that SWAP_CURRENCIES action swaps baseCurrency and targetCurrency in state
  it("swaps baseCurrency and targetCurrency in state", () => {
    const state = { baseCurrency: "USD", targetCurrency: "EUR" };
    const action = { type: SWAP_CURRENCIES };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState).toEqual({
      baseCurrency: "EUR",
      targetCurrency: "USD",
    });
  });

  // Tests that SET_ERROR_MESSAGE action updates errorMessage in state
  it("updates errorMessage in state", () => {
    const state = { errorMessage: null };
    const action = { type: SET_ERROR_MESSAGE, payload: "An error occurred" };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.errorMessage).toEqual("An error occurred");
  });

  // Tests that SET_EXCHANGE_RATES action updates exchangeRates in state
  it("updates exchangeRates in state", () => {
    const state = { exchangeRates: { USD: 1, EUR: 0.85 } };
    const action = { type: SET_EXCHANGE_RATES, payload: { USD: 1, EUR: 0.9 } };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.exchangeRates).toEqual({ USD: 1, EUR: 0.9 });
  });

  // Tests that the showExchangeRate property in state is set to false when the HIDE_EXCHANGE_RATE action is dispatched
  it("sets showExchangeRate to false", () => {
    const state = { showExchangeRate: true };
    const action = { type: HIDE_EXCHANGE_RATE };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.showExchangeRate).toEqual(false);
  });

  // Tests that the showExchangeRate property in state is set to true when the SHOW_EXCHANGE_RATE action is dispatched
  it("sets showExchangeRate to true", () => {
    const state = { showExchangeRate: false };
    const action = { type: SHOW_EXCHANGE_RATE };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.showExchangeRate).toEqual(true);
  });

  // Tests that SET_BASE_EXCHANGE_RATE action updates baseExchangeRate in state
  it("updates baseExchangeRate in state", () => {
    const state = { baseExchangeRate: 1.0 };
    const action = { type: SET_BASE_EXCHANGE_RATE, payload: 1.5 };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.baseExchangeRate).toEqual(1.5);
  });

  // Tests that the CLEAR_ERROR_MESSAGE action sets errorMessage to null in state
  it("sets errorMessage to null", () => {
    const state = { errorMessage: "Error message" };
    const action = { type: CLEAR_ERROR_MESSAGE };
    const updatedState = exchangeReducer(state, action);
    expect(updatedState.errorMessage).toBeNull();
  });
});
