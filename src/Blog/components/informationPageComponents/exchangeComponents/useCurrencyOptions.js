import { useMemo } from "react";

const useCurrencyOptions = exchangeRates => {
  return useMemo(() => {
    return Object.keys(exchangeRates).map(currency => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));
  }, [exchangeRates]);
};

export default useCurrencyOptions;
