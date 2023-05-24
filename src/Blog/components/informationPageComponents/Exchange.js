import {
  FormInput,
  FormSelect,
  SwapButton,
  ConvertButton,
  ClearButton,
  ErrorMessage,
  DateInput,
  ConversionResult,
} from "./exchangeComponents/ExchangeElements";
import { useReducer } from "react";
import {
  initialState,
  exchangeReducer,
  SET_BASE_AMOUNT,
  SET_BASE_CURRENCY,
  SET_TARGET_CURRENCY,
  SET_DATE,
  CLEAR_FORM,
  SET_BASE_EXCHANGE_RATE,
  SWAP_CURRENCIES,
  HIDE_EXCHANGE_RATE,
  SHOW_EXCHANGE_RATE,
  CLEAR_ERROR_MESSAGE,
} from "./exchangeComponents/ExchangeReducer";
import { Card, Form, Col, Row, Spinner } from "react-bootstrap";
import useFetchExchangeRates from "./exchangeComponents/useFetchExchangeRates";
import useHandleFormSubmit from "./exchangeComponents/useHandleFormSubmit";
import useCurrencyOptions from "./exchangeComponents/useCurrencyOptions";

const Exchange = () => {
  const [state, dispatch] = useReducer(exchangeReducer, initialState);
  const abstractAPIKey = process.env.REACT_APP_ABSTRACT_EXCHANGE_API_KEY;

  useFetchExchangeRates(abstractAPIKey, dispatch);

  const handleFormSubmit = useHandleFormSubmit(abstractAPIKey, state, dispatch);

  const baseCurrencyOptions = useCurrencyOptions(state.exchangeRates);
  const targetCurrencyOptions = useCurrencyOptions(state.exchangeRates);

  const handleClear = () => {
    dispatch({ type: CLEAR_FORM });
    dispatch({ type: SET_BASE_EXCHANGE_RATE, payload: "EUR" });
  };

  const handleSwapCurrencies = () => {
    dispatch({ type: SWAP_CURRENCIES });
  };

  const handleClose = () => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
  };

  return (
    <div className="vh-100 mt-5">
      <Card className="mb-3">
        <Form className="m-3" onSubmit={handleFormSubmit}>
          <Row>
            <FormInput
              label="Amount"
              placeholder={`${state.baseCurrency} 1.00`}
              type="number"
              value={state.baseAmount}
              onChange={e =>
                dispatch({ type: SET_BASE_AMOUNT, payload: e.target.value })
              }
            />
            <FormSelect
              label="From"
              value={state.baseCurrency}
              onChange={e => {
                dispatch({
                  type: SET_BASE_CURRENCY,
                  payload: e.target.value,
                });
                dispatch({ type: HIDE_EXCHANGE_RATE });
              }}
              options={baseCurrencyOptions}
              baseExchangeRate={state.baseExchangeRate}
            />
            <SwapButton
              onClick={() => {
                handleSwapCurrencies();
                dispatch({ type: HIDE_EXCHANGE_RATE });
              }}
            />
            <FormSelect
              label="To"
              value={state.targetCurrency}
              onChange={e => {
                dispatch({
                  type: SET_TARGET_CURRENCY,
                  payload: e.target.value,
                });
                dispatch({ type: HIDE_EXCHANGE_RATE });
              }}
              options={targetCurrencyOptions}
              baseExchangeRate={state.baseExchangeRate}
            />
          </Row>
          <div className="d-flex justify-content-between mt-3">
            <DateInput
              value={state.date}
              onChange={e =>
                dispatch({ type: SET_DATE, payload: e.target.value })
              }
            />
            {state.isLoading && state.convertedAmount ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <ConversionResult
                baseAmount={state.baseAmount}
                baseCurrency={state.baseCurrency}
                convertedAmount={state.convertedAmount}
                targetCurrency={state.targetCurrency}
                exchangeRate={state.exchangeRate}
                showExchangeRate={state.showExchangeRate}
              />
            )}
            <Col className="d-flex justify-content-end" md={1}>
              <ClearButton onClick={handleClear} />
              <ConvertButton
                onClick={() => dispatch({ type: SHOW_EXCHANGE_RATE })}
              />
            </Col>
          </div>
        </Form>
        <ErrorMessage message={state.errorMessage} handleClose={handleClose} />
      </Card>
    </div>
  );
};

export default Exchange;
