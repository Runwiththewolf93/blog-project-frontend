import axios from "axios";
import { debounce } from "lodash";
import {
  setLoading,
  setConvertedAmount,
  setExchangeRate,
  setErrorMessage,
} from "./ExchangeReducer";

/**
 * Generates a function comment for the given function body.
 *
 * @param {string} abstractAPIKey - the abstract API key
 * @param {object} state - the state object
 * @param {function} dispatch - the dispatch function
 * @return {function} the handleFormSubmit function
 */
// useHandleFormSubmit hook
const useHandleFormSubmit = (abstractAPIKey, state, dispatch) => {
  const handleFormSubmit = e => {
    e.preventDefault();

    const fetchExchangeRate = debounce(async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await axios.get(
          `https://exchange-rates.abstractapi.com/v1/convert?api_key=${abstractAPIKey}&base=${state.baseCurrency}&target=${state.targetCurrency}&date=${state.date}&base_amount=${state.baseAmount}`
        );
        dispatch(setConvertedAmount(data.converted_amount));
        dispatch(setExchangeRate(data.exchange_rate));
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Handle rate limit error
          dispatch(setErrorMessage(null));
        } else {
          dispatch(setErrorMessage(error.message));
        }
      } finally {
        dispatch(setLoading(false));
      }
    }, 1000);

    fetchExchangeRate();
  };

  return handleFormSubmit;
};

export default useHandleFormSubmit;
