import { useMemo } from "react";

/**
 * The function "useCurrencyOptions" takes in an object of exchange rates and returns an array of
 * options for a select input, where each option represents a currency.
 * @returns The function `useCurrencyOptions` returns a memoized array of `<option>` elements. Each
 * `<option>` element represents a currency and has a key attribute set to the currency code and a
 * value attribute set to the currency code. The text content of each `<option>` element is the
 * currency code.
 */
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
