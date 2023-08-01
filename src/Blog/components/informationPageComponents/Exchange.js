import {
  FormInput,
  FormSelect,
  SwapButton,
  ButtonGroup,
  DateInput,
  ConversionResult,
  ErrorMessage,
  SpinnerExchange,
} from "./exchangeComponents/ExchangeElements";
import { useReducer } from "react";
import {
  initialState,
  exchangeReducer,
  setBaseExchangeRate,
  setBaseAmount,
  setBaseCurrency,
  setTargetCurrency,
  setDate,
  CLEAR_FORM,
  SWAP_CURRENCIES,
  HIDE_EXCHANGE_RATE,
  SHOW_EXCHANGE_RATE,
  CLEAR_ERROR_MESSAGE,
} from "./exchangeComponents/ExchangeReducer";
import { Card, Form, Row, Col } from "react-bootstrap";
import useFetchExchangeRates from "./exchangeComponents/useFetchExchangeRates";
import useHandleFormSubmit from "./exchangeComponents/useHandleFormSubmit";
import useCurrencyOptions from "./exchangeComponents/useCurrencyOptions";

/**
 * Renders the Exchange component.
 *
 * @return {JSX.Element} The rendered Exchange component.
 */
// Exchange component
const Exchange = () => {
  const [state, dispatch] = useReducer(exchangeReducer, initialState);
  const abstractAPIKey = process.env.REACT_APP_ABSTRACT_EXCHANGE_API_KEY;

  useFetchExchangeRates(abstractAPIKey, dispatch);

  const handleFormSubmit = useHandleFormSubmit(abstractAPIKey, state, dispatch);

  const baseCurrencyOptions = useCurrencyOptions(state.exchangeRates);
  const targetCurrencyOptions = useCurrencyOptions(state.exchangeRates);

  /**
   * Clears the form and sets the base exchange rate to "EUR".
   *
   * @return {void} - No return value.
   */
  const handleClear = () => {
    dispatch({ type: CLEAR_FORM });
    dispatch(setBaseExchangeRate("EUR"));
  };

  /**
   * Handles the swapping of currencies.
   *
   * @return {void} - No return value.
   */
  const handleSwapCurrencies = () => {
    dispatch({ type: SWAP_CURRENCIES });
  };

  /**
   * Closes the handle.
   *
   * @return {void} - No return value.
   */
  const handleClose = () => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
  };

  return (
    <Col className="vh-100 mt-5">
      <Card className="mb-3">
        <Form className="m-3" onSubmit={handleFormSubmit} data-testid="form">
          <Row>
            <FormInput
              label="Amount"
              placeholder={`${state.baseCurrency} 1.00`}
              type="number"
              value={state.baseAmount}
              onChange={e => dispatch(setBaseAmount(e.target.value))}
            />
            <FormSelect
              label="From"
              value={state.baseCurrency}
              onChange={e => {
                dispatch(setBaseCurrency(e.target.value));
                dispatch({ type: HIDE_EXCHANGE_RATE });
              }}
              options={baseCurrencyOptions}
              baseExchangeRate={state.baseExchangeRate}
              testId="mockFormSelectBase"
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
                dispatch(setTargetCurrency(e.target.value));
                dispatch({ type: HIDE_EXCHANGE_RATE });
              }}
              options={targetCurrencyOptions}
              baseExchangeRate={state.baseExchangeRate}
              testId="mockFormSelectTarget"
            />
          </Row>
          <Col className="d-flex justify-content-between mt-3">
            <DateInput
              value={state.date}
              onChange={e => dispatch(setDate(e.target.value))}
            />
            {state.isLoading && state.convertedAmount ? (
              <SpinnerExchange />
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
            <ButtonGroup
              onClear={handleClear}
              onConvert={() => dispatch({ type: SHOW_EXCHANGE_RATE })}
            />
          </Col>
        </Form>
        <ErrorMessage message={state.errorMessage} handleClose={handleClose} />
      </Card>
    </Col>
  );
};

export default Exchange;
