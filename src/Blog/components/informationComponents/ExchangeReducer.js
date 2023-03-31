export const initialState = {
  baseCurrency: "USD",
  targetCurrency: "EUR",
  date: new Date(Date.now() - 86400000).toISOString().substring(0, 10),
  baseAmount: "",
  convertedAmount: "",
  exchangeRate: "",
  exchangeRates: {},
};

export const exchangeReducer = (state, action) => {
  switch (action.type) {
    case "SET_BASE_CURRENCY":
      return {
        ...state,
        baseCurrency: action.payload,
      };
    case "SET_TARGET_CURRENCY":
      return {
        ...state,
        targetCurrency: action.payload,
      };
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "SET_BASE_AMOUNT":
      return {
        ...state,
        baseAmount: action.payload,
      };
    case "SET_CONVERTED_AMOUNT":
      return {
        ...state,
        convertedAmount: action.payload,
      };
    case "SET_EXCHANGE_RATE":
      return {
        ...state,
        exchangeRate: action.payload,
      };
    case "SET_EXCHANGE_RATES":
      return {
        ...state,
        exchangeRates: action.payload,
      };
    case "CLEAR_FORM":
      return {
        ...initialState,
        date: state.date,
        exchangeRates: state.exchangeRates,
      };
    case "SWAP_CURRENCIES":
      return {
        ...state,
        baseCurrency: state.targetCurrency,
        targetCurrency: state.baseCurrency,
      };
    default:
      break;
  }
};
