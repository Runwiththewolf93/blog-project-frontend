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
import { initialState, exchangeReducer } from "./ExchangeReducer";
import { Card, Form, Col, Row } from "react-bootstrap";
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
    dispatch({ type: "CLEAR_FORM" });
    dispatch({ type: "SET_BASE_EXCHANGE_RATE", payload: "EUR" });
  };

  const handleSwapCurrencies = () => {
    dispatch({ type: "SWAP_CURRENCIES" });
  };

  return (
    <Card className="mb-3">
      <Form className="m-3" onSubmit={handleFormSubmit}>
        <Row>
          <FormInput
            label="Amount"
            placeholder={`${state.baseCurrency} 1.00`}
            type="number"
            value={state.baseAmount}
            onChange={e =>
              dispatch({ type: "SET_BASE_AMOUNT", payload: e.target.value })
            }
          />
          <FormSelect
            label="From"
            value={state.baseCurrency}
            onChange={e => {
              dispatch({
                type: "SET_BASE_CURRENCY",
                payload: e.target.value,
              });
              dispatch({ type: "HIDE_EXCHANGE_RATE" });
            }}
            options={baseCurrencyOptions}
            baseExchangeRate={state.baseExchangeRate}
          />
          <SwapButton
            onClick={() => {
              handleSwapCurrencies();
              dispatch({ type: "HIDE_EXCHANGE_RATE" });
            }}
          />
          <FormSelect
            label="To"
            value={state.targetCurrency}
            onChange={e => {
              dispatch({
                type: "SET_TARGET_CURRENCY",
                payload: e.target.value,
              });
              dispatch({ type: "HIDE_EXCHANGE_RATE" });
            }}
            options={targetCurrencyOptions}
            baseExchangeRate={state.baseExchangeRate}
          />
        </Row>
        <div className="d-flex justify-content-between mt-3">
          <DateInput
            value={state.date}
            onChange={e =>
              dispatch({ type: "SET_DATE", payload: e.target.value })
            }
          />
          <ConversionResult
            baseAmount={state.baseAmount}
            baseCurrency={state.baseCurrency}
            convertedAmount={state.convertedAmount}
            targetCurrency={state.targetCurrency}
            exchangeRate={state.exchangeRate}
            showExchangeRate={state.showExchangeRate}
          />
          <Col className="d-flex justify-content-end" md={1}>
            <ClearButton onClick={handleClear} />
            <ConvertButton
              onClick={() => dispatch({ type: "SHOW_EXCHANGE_RATE" })}
            />
          </Col>
        </div>
      </Form>
      <ErrorMessage message={state.errorMessage} />
    </Card>
  );
};

export default Exchange;
