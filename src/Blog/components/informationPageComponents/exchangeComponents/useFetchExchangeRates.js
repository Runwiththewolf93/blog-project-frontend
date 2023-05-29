import { useEffect } from "react";
import axios from "axios";
import {
  setLoading,
  setExchangeRates,
  setBaseExchangeRate,
  setErrorMessage,
} from "./ExchangeReducer";

// useFetchExchangeRates hook
const useFetchExchangeRates = (abstractAPIKey, dispatch) => {
  useEffect(() => {
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
