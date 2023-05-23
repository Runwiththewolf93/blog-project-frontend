import axios from "axios";
import { debounce } from "lodash";

const useHandleFormSubmit = (abstractAPIKey, state, dispatch) => {
  const handleFormSubmit = e => {
    e.preventDefault();

    const fetchExchangeRate = debounce(async () => {
      try {
        const { data } = await axios.get(
          `https://exchange-rates.abstractapi.com/v1/convert?api_key=${abstractAPIKey}&base=${state.baseCurrency}&target=${state.targetCurrency}&date=${state.date}&base_amount=${state.baseAmount}`
        );
        dispatch({
          type: "SET_CONVERTED_AMOUNT",
          payload: data.converted_amount,
        });
        dispatch({ type: "SET_EXCHANGE_RATE", payload: data.exchange_rate });
      } catch (error) {
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
      }
    }, 1000);

    fetchExchangeRate();
  };

  return handleFormSubmit;
};

export default useHandleFormSubmit;
