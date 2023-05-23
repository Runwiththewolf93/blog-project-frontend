import { useEffect } from "react";
import axios from "axios";
import {
  SET_LOADING,
  SET_EXCHANGE_RATES,
  SET_BASE_EXCHANGE_RATE,
  SET_ERROR_MESSAGE,
} from "./ExchangeReducer";

const useFetchExchangeRates = (abstractAPIKey, dispatch) => {
  useEffect(() => {
    const fetchExchangeRates = async () => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
        const { data } = await axios.get(
          `https://exchange-rates.abstractapi.com/v1/live?api_key=${abstractAPIKey}&base=EUR`
        );
        dispatch({ type: SET_EXCHANGE_RATES, payload: data.exchange_rates });
        dispatch({
          type: SET_BASE_EXCHANGE_RATE,
          payload: data.base,
        });
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Handle rate limit error
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: null,
          });
        } else {
          dispatch({
            type: SET_ERROR_MESSAGE,
            payload: error.message,
          });
        }
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
    };

    fetchExchangeRates();
  }, [abstractAPIKey, dispatch]);
};

export default useFetchExchangeRates;
