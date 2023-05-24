export const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";
export const SET_TARGET_CURRENCY = "SET_TARGET_CURRENCY";
export const SET_DATE = "SET_DATE";
export const SET_BASE_AMOUNT = "SET_BASE_AMOUNT";
export const SET_CONVERTED_AMOUNT = "SET_CONVERTED_AMOUNT";
export const SET_EXCHANGE_RATE = "SET_EXCHANGE_RATE";
export const SET_EXCHANGE_RATES = "SET_EXCHANGE_RATES";
export const CLEAR_FORM = "CLEAR_FORM";
export const SWAP_CURRENCIES = "SWAP_CURRENCIES";
export const HIDE_EXCHANGE_RATE = "HIDE_EXCHANGE_RATE";
export const SHOW_EXCHANGE_RATE = "SHOW_EXCHANGE_RATE";
export const SET_BASE_EXCHANGE_RATE = "SET_BASE_EXCHANGE_RATE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";

export const initialState = {
  baseCurrency: "USD",
  targetCurrency: "EUR",
  date: new Date(Date.now() - 172800000).toISOString().substring(0, 10),
  baseAmount: "",
  convertedAmount: "",
  exchangeRate: "",
  exchangeRates: {},
  baseExchangeRate: "",
  showExchangeRate: true,
  errorMessage: null,
};

export const exchangeReducer = (state, action) => {
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.payload,
      };
    case SET_TARGET_CURRENCY:
      return {
        ...state,
        targetCurrency: action.payload,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_BASE_AMOUNT:
      return {
        ...state,
        baseAmount: action.payload,
      };
    case SET_CONVERTED_AMOUNT:
      return {
        ...state,
        convertedAmount: action.payload,
      };
    case SET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload,
      };
    case SET_EXCHANGE_RATES:
      return {
        ...state,
        exchangeRates: action.payload,
      };
    case CLEAR_FORM:
      return {
        ...initialState,
        date: state.date,
        exchangeRates: state.exchangeRates,
      };
    case SWAP_CURRENCIES:
      return {
        ...state,
        baseCurrency: state.targetCurrency,
        targetCurrency: state.baseCurrency,
      };
    case HIDE_EXCHANGE_RATE:
      return {
        ...state,
        showExchangeRate: false,
      };
    case SHOW_EXCHANGE_RATE:
      return {
        ...state,
        showExchangeRate: true,
      };
    case SET_BASE_EXCHANGE_RATE:
      return {
        ...state,
        baseExchangeRate: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};