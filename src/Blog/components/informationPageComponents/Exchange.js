import { useEffect, useReducer, useMemo } from "react";
import { initialState, exchangeReducer } from "./ExchangeReducer";
import { Card, Form, Col, Row, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { debounce } from "lodash";

const Exchange = () => {
  const [state, dispatch] = useReducer(exchangeReducer, initialState);

  const abstractAPIKey = process.env.REACT_APP_ABSTRACT_EXCHANGE_API_KEY;

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

  const handleClear = () => {
    dispatch({ type: "CLEAR_FORM" });
    dispatch({ type: "SET_BASE_EXCHANGE_RATE", payload: "EUR" });
  };

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
  }, [abstractAPIKey]);

  const handleSwapCurrencies = () => {
    dispatch({ type: "SWAP_CURRENCIES" });
  };

  const baseCurrencyOptions = useMemo(() => {
    return Object.keys(state.exchangeRates).map(currency => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));
  }, [state.exchangeRates]);

  const targetCurrencyOptions = useMemo(() => {
    return Object.keys(state.exchangeRates).map(currency => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));
  }, [state.exchangeRates]);

  return (
    <Card className="mb-3">
      <Form className="m-3" onSubmit={handleFormSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                placeholder={`${state.baseCurrency} 1.00`}
                type="number"
                value={state.baseAmount}
                onChange={e =>
                  dispatch({ type: "SET_BASE_AMOUNT", payload: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>From</Form.Label>
              <Form.Select
                value={state.baseCurrency}
                onChange={e => {
                  dispatch({
                    type: "SET_BASE_CURRENCY",
                    payload: e.target.value,
                  });
                  dispatch({ type: "HIDE_EXCHANGE_RATE" });
                }}
              >
                <option value={state.baseExchangeRate}>
                  {state.baseExchangeRate}
                </option>
                {baseCurrencyOptions}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs="auto" className="align-self-end" type="button">
            <Button
              style={{ width: "100px" }}
              onClick={() => {
                handleSwapCurrencies();
                dispatch({ type: "HIDE_EXCHANGE_RATE" });
              }}
            >
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
            </Button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>To</Form.Label>
              <Form.Select
                value={state.targetCurrency}
                onChange={e => {
                  dispatch({
                    type: "SET_TARGET_CURRENCY",
                    payload: e.target.value,
                  });
                  dispatch({ type: "HIDE_EXCHANGE_RATE" });
                }}
              >
                <option value={state.baseExchangeRate}>
                  {state.baseExchangeRate}
                </option>
                {targetCurrencyOptions}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-3">
          <Col md={2}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                placeholder="$1.00"
                type="date"
                value={state.date}
                onChange={e =>
                  dispatch({ type: "SET_DATE", payload: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col
            md={9}
            className="d-flex justify-content-around align-items-center"
          >
            {state.exchangeRate && state.showExchangeRate && (
              <>
                <p className="mt-4 mb-0">
                  {state.baseAmount} {state.baseCurrency} =
                </p>
                <h3 className="mt-4 mb-0">
                  {state.convertedAmount.toFixed(2)} {state.targetCurrency}
                </h3>
                <p className="mt-4 mb-0">
                  1 {state.baseCurrency} = {state.exchangeRate.toFixed(2)}{" "}
                  {state.targetCurrency}
                </p>
              </>
            )}
          </Col>
          <Col className="d-flex justify-content-end" md={1}>
            <Button
              type="button"
              style={{ height: "40px", marginTop: "auto", marginRight: "1rem" }}
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              type="submit"
              style={{ height: "40px", marginTop: "auto" }}
              onClick={() => dispatch({ type: "SHOW_EXCHANGE_RATE" })}
            >
              Convert
            </Button>
          </Col>
        </div>
      </Form>
      {state.errorMessage && (
        <Alert dismissible variant="danger" className="mb-0">
          {state.errorMessage}
        </Alert>
      )}
    </Card>
  );
};

export default Exchange;
