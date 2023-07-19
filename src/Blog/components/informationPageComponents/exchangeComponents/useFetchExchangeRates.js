import { useEffect } from "react";
import axios from "axios";
import {
  setLoading,
  setExchangeRates,
  setBaseExchangeRate,
  setErrorMessage,
} from "./ExchangeReducer";

/**
 * Fetches exchange rates from the abstractAPI and updates the state.
 *
 * @param {string} abstractAPIKey - The API key for the abstractAPI.
 * @param {function} dispatch - The dispatch function from the state.
 * @return {void} This function does not return anything.
 */
// useFetchExchangeRates hook
const useFetchExchangeRates = (abstractAPIKey, dispatch) => {
  useEffect(() => {
    /**
     * Fetches exchange rates from the API and updates the state.
     *
     * @return {Promise<void>} A promise that resolves once the exchange rates have been fetched and the state has been updated.
     */
    const fetchExchangeRates = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await axios.get(
          `https://exchange-rates.abstractapi.com/v1/live?api_key=${abstractAPIKey}&base=EUR`
        );
        dispatch(setExchangeRates(data.exchange_rates));
        dispatch(setBaseExchangeRate(data.base));
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
    };

    fetchExchangeRates();
  }, [abstractAPIKey, dispatch]);
};

export default useFetchExchangeRates;
