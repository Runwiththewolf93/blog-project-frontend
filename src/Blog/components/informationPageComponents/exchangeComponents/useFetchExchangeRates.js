import { useEffect } from "react";
import axios from "axios";

const useFetchExchangeRates = (abstractAPIKey, dispatch) => {
  useEffect(() => {
    axios
      .get(
        `https://exchange-rates.abstractapi.com/v1/live?api_key=${abstractAPIKey}&base=EUR`
      )
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: "SET_EXCHANGE_RATES", payload: data.exchange_rates });
        dispatch({
          type: "SET_BASE_EXCHANGE_RATE",
          payload: data.base,
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 429) {
          // Handle rate limit error
          dispatch({
            type: "SET_ERROR_MESSAGE",
            payload: null,
          });
        } else {
          dispatch({
            type: "SET_ERROR_MESSAGE",
            payload: error.message,
          });
        }
      });
  }, [abstractAPIKey, dispatch]);
};

export default useFetchExchangeRates;
