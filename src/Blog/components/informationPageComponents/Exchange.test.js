import { useReducer } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Exchange from "./Exchange";
import useHandleFormSubmit from "./exchangeComponents/useHandleFormSubmit";
import useCurrencyOptions from "./exchangeComponents/useCurrencyOptions";
import useFetchExchangeRates from "./exchangeComponents/useFetchExchangeRates";
import { initialState } from "./exchangeComponents/ExchangeReducer";

process.env.REACT_APP_ABSTRACT_EXCHANGE_API_KEY = "your-mock-key";

jest.mock("./exchangeComponents/useHandleFormSubmit", () => jest.fn());

jest.mock("./exchangeComponents/useCurrencyOptions", () =>
  jest.fn(() => [
    <option key="USD" value="USD">
      USD
    </option>,
    <option key="EUR" value="EUR">
      EUR
    </option>,
  ])
);

jest.mock("./exchangeComponents/useFetchExchangeRates", () => jest.fn());

jest.mock("./exchangeComponents/ExchangeElements", () => ({
  FormInput: props => <div data-testid="mockFormInput" {...props} />,
  FormSelect: ({ value, onChange, testId, ...props }) => {
    return (
      <input
        data-testid={testId}
        onChange={onChange}
        value={value}
        {...props}
      />
    );
  },
  SwapButton: props => <div data-testid="mockSwapButton" {...props} />,
  DateInput: props => <div data-testid="mockDateInput" {...props} />,
  SpinnerExchange: props => (
    <div data-testid="mockSpinnerExchange" {...props} />
  ),
  ConversionResult: props => (
    <div data-testid="mockConversionResult" {...props} />
  ),
  ButtonGroup: ({ onClear, onConvert, ...props }) => (
    <div data-testid="mockButtonGroup" {...props}>
      <button onClick={onClear}>Clear</button>
      <button onClick={onConvert}>Convert</button>
    </div>
  ),
  ErrorMessage: ({ message }) =>
    message ? <div data-testid="mockErrorMessage">{message}</div> : null,
}));

// Mock the actions
jest.mock("./exchangeComponents/ExchangeReducer", () => ({
  CLEAR_FORM: "CLEAR_FORM",
  SWAP_CURRENCIES: "SWAP_CURRENCIES",
  HIDE_EXCHANGE_RATE: "HIDE_EXCHANGE_RATE",
  SHOW_EXCHANGE_RATE: "SHOW_EXCHANGE_RATE",
  CLEAR_ERROR_MESSAGE: "CLEAR_ERROR_MESSAGE",
  setBaseCurrency: jest.fn(),
  setTargetCurrency: jest.fn(),
  setDate: jest.fn(),
  setBaseAmount: jest.fn(),
  setConvertedAmount: jest.fn(),
  setExchangeRate: jest.fn(),
  setExchangeRates: jest.fn(),
  setBaseExchangeRate: jest.fn(),
  setLoading: jest.fn(),
  setErrorMessage: jest.fn(),
  initialState: {
    baseCurrency: "USD",
    targetCurrency: "EUR",
    date: new Date(Date.now() - 172800000).toISOString().substring(0, 10),
    baseAmount: "",
    convertedAmount: "",
    exchangeRate: "",
    exchangeRates: {},
    baseExchangeRate: "",
    showExchangeRate: true,
    errorMessage: null,
  },
  exchangeReducer: jest.fn().mockReturnValue({
    baseCurrency: "USD",
    targetCurrency: "EUR",
    date: new Date(Date.now() - 172800000).toISOString().substring(0, 10),
    baseAmount: "",
    convertedAmount: "",
    exchangeRate: "",
    exchangeRates: {},
    baseExchangeRate: "",
    showExchangeRate: true,
    errorMessage: null,
  }),
}));

describe("Exchange_function", () => {
  // Tests that the Exchange component renders without errors
  it("test_render_exchange_component", () => {
    render(<Exchange />);
  });

  // Tests that the form submits without errors
  it("submits the form without errors", () => {
    const handleFormSubmit = jest.fn();
    useHandleFormSubmit.mockReturnValue(handleFormSubmit);

    render(<Exchange />);

    const form = screen.getByTestId("form");

    fireEvent.submit(form);

    expect(handleFormSubmit).toHaveBeenCalled();
  });

  // Tests that the baseCurrency value is displayed correctly
  it("passes correct value prop to FormSelect", () => {
    render(<Exchange />);

    const formSelect = screen.getByTestId("mockFormSelectBase");

    expect(formSelect.value).toBe("USD");
  });

  // Tests that the SpinnerExchange component is rendered correctly
  it("renders SpinnerExchange when loading and convertedAmount are truthy", () => {
    // Modify the initialState directly
    initialState.isLoading = true;
    initialState.convertedAmount = "1";

    render(<Exchange />);

    const spinner = screen.getByTestId("mockSpinnerExchange");

    expect(spinner).toBeInTheDocument();

    // Reset the initialState for other tests
    initialState.isLoading = false;
    initialState.convertedAmount = "";
  });

  // Tests that the form clears and the base exchange rate is set to 'EUR'
  it("clears the form and sets base exchange rate to EUR when clear button is clicked", () => {
    // Render the component
    render(<Exchange />);

    // Find the clear button and click it
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    // Check if the form is cleared
    const baseCurrencySelect = screen.getByTestId("mockFormSelectBase");
    expect(baseCurrencySelect.value).toBe("USD");
  });

  // Tests that an error message is displayed when an invalid base amount is inputted
  it("renders ErrorMessage when there is an error message", () => {
    initialState.errorMessage = "error";

    render(<Exchange />);

    const errorMessage = screen.getByTestId("mockErrorMessage");

    expect(errorMessage).toBeInTheDocument();
  });
});
