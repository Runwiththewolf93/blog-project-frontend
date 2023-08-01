import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonGroup, DateInput, ConversionResult } from "./ExchangeElements";
import { useMediaQuery } from "react-responsive";

// Mock the useMediaQuery hook
jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

describe("ButtonGroup_function", () => {
  // Tests that two buttons are rendered with correct text
  it("renders two buttons with correct text", () => {
    render(<ButtonGroup onClear={() => {}} onConvert={() => {}} />);

    const clearButton = screen.getByText(/Clear/i);
    const convertButton = screen.getByText(/Convert/i);

    expect(clearButton).toBeInTheDocument();
    expect(convertButton).toBeInTheDocument();
  });

  // Tests that onClear and onConvert callbacks are passed to buttons
  it("calls onClear and onConvert callbacks when buttons are clicked", () => {
    const onClearMock = jest.fn();
    const onConvertMock = jest.fn();

    render(<ButtonGroup onClear={onClearMock} onConvert={onConvertMock} />);

    fireEvent.click(screen.getByText("Clear"));
    expect(onClearMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Convert"));
    expect(onConvertMock).toHaveBeenCalled();
  });

  // Tests that button style is set correctly based on screen size
  it("applies correct styling depending on screen size", () => {
    const onClear = jest.fn();
    const onConvert = jest.fn();

    // Mock useMediaQuery to return true (screen is laptop size or smaller)
    useMediaQuery.mockImplementation(() => true);

    const { rerender } = render(
      <ButtonGroup onClear={onClear} onConvert={onConvert} />
    );

    let clearButton = screen.getByText("Clear");
    let convertButton = screen.getByText("Convert");

    // Check that the correct styling is applied
    expect(clearButton).toHaveStyle({ height: "40px" });
    expect(convertButton).toHaveStyle({ height: "40px" });

    // Mock useMediaQuery to return false (screen is larger than laptop size)
    useMediaQuery.mockImplementation(() => false);

    // Rerender the component
    rerender(<ButtonGroup onClear={onClear} onConvert={onConvert} />);

    // Get the buttons again after the second render
    clearButton = screen.getByText("Clear");
    convertButton = screen.getByText("Convert");

    // Check that the correct styling is applied
    expect(clearButton).toHaveStyle({ height: "40px", marginTop: "auto" });
    expect(convertButton).toHaveStyle({ height: "40px", marginTop: "auto" });
  });

  // Tests that onClear callback is not defined
  it("does not call onClear callback if not defined", () => {
    // Render the ButtonGroup component without passing the onClear prop
    render(<ButtonGroup onConvert={jest.fn()} />);

    // Get the "Clear" button
    const clearButton = screen.getByRole("button", { name: /clear/i });

    // Simulate a click event on the "Clear" button
    fireEvent.click(clearButton);
  });

  // Tests that onConvert callback is not defined
  it("does not call onConvert callback if not defined", () => {
    // Render the ButtonGroup component without passing the onClear prop
    render(<ButtonGroup onClear={jest.fn()} />);

    // Get the "Clear" button
    const convertButton = screen.getByRole("button", { name: /convert/i });

    // Simulate a click event on the "Clear" button
    fireEvent.click(convertButton);
  });

  // Tests that screen size is exactly 992px
  it("checks if screen size is exactly 992px", () => {
    useMediaQuery.mockImplementation(() => false);
    const { rerender } = render(<ButtonGroup />);
    let colElement = screen.getByTestId("col-element");
    expect(colElement).toHaveClass("col-md-2");

    useMediaQuery.mockImplementation(() => true);
    rerender(<ButtonGroup />);
    colElement = screen.getByTestId("col-element");
    expect(colElement).toHaveClass("col-md-3");
  });
});

describe("DateInput_function", () => {
  // Tests that the DateInput component renders with default props
  it("renders default DateInput component", () => {
    render(<DateInput value="" onChange={() => {}} />);
    const dateInput = screen.getByLabelText("Date");
    expect(dateInput).toBeInTheDocument();
  });

  // Tests that the DateInput component renders with a value prop
  it("renders DateInput component with value prop", () => {
    const value = "2022-01-01";
    render(<DateInput value={value} onChange={() => {}} />);
    const dateInput = screen.getByLabelText("Date");
    expect(dateInput).toHaveValue(value);
  });

  // Tests that the DateInput component renders with an onChange prop
  it("renders DateInput component with onChange prop", () => {
    const onChange = jest.fn();
    render(<DateInput value="" onChange={onChange} />);
    const dateInput = screen.getByLabelText("Date");
    fireEvent.change(dateInput, { target: { value: "2022-01-01" } });
    expect(onChange).toHaveBeenCalled();
  });

  // Tests that the DateInput component renders with a value prop that is not a string
  it("renders DateInput component with invalid value prop", () => {
    const value = 123;
    render(<DateInput value={value} onChange={() => {}} />);
    const dateInput = screen.getByLabelText("Date");
    expect(dateInput).not.toHaveValue(value);
  });

  // Tests that the DateInput component doesn't crash when onChange is not a function
  it("renders DateInput component with invalid onChange prop", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<DateInput value="" onChange={"not a function"} />);
    }).not.toThrow();

    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });

  // Tests that the DateInput component renders with a value prop that is not a valid date
  it("renders DateInput component with invalid date value prop", () => {
    const value = "not a date";
    render(<DateInput value={value} onChange={() => {}} />);
    const dateInput = screen.getByLabelText("Date");
    expect(dateInput).not.toHaveValue(value);
  });
});

// Generated by CodiumAI

describe("ConversionResult_function", () => {
  // Tests that the component renders correctly with all props provided and showExchangeRate=true
  it("renders correctly with all props provided and showExchangeRate=true", () => {
    render(
      <ConversionResult
        baseAmount={100}
        baseCurrency="USD"
        convertedAmount={75}
        targetCurrency="EUR"
        exchangeRate={0.75}
        showExchangeRate={true}
      />
    );

    expect(screen.getByText("100 USD =")).toBeInTheDocument();
    expect(screen.getByText("75.00 EUR")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 0.75 EUR")).toBeInTheDocument();
  });

  // Tests that the component renders correctly with all props provided and showExchangeRate=false
  it("renders correctly with all props provided and showExchangeRate=false", () => {
    render(
      <ConversionResult
        baseAmount={100}
        baseCurrency="USD"
        convertedAmount={75}
        targetCurrency="EUR"
        exchangeRate={0.75}
        showExchangeRate={false}
      />
    );

    expect(screen.queryByText("75.00 EUR")).not.toBeInTheDocument();
    expect(screen.queryByText("100 USD =")).toBeNull();
    expect(screen.queryByText("1 USD = 0.75 EUR")).toBeNull();
  });

  // Tests that the component renders correctly with isLaptopScreenOrSmaller=true
  it("renders correctly with isLaptopScreenOrSmaller=true", () => {
    useMediaQuery.mockReturnValue(true);

    render(
      <ConversionResult
        baseAmount={100}
        baseCurrency="USD"
        convertedAmount={75}
        targetCurrency="EUR"
        exchangeRate={0.75}
        showExchangeRate={true}
      />
    );

    expect(screen.getByText("100 USD =")).toBeInTheDocument();
    expect(screen.getByText("75.00 EUR")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 0.75 EUR")).toBeInTheDocument();
  });

  // Tests that the component renders correctly with isLaptopScreenOrSmaller=false
  it("renders correctly with isLaptopScreenOrSmaller=false", () => {
    useMediaQuery.mockReturnValue(false);

    render(
      <ConversionResult
        baseAmount={100}
        baseCurrency="USD"
        convertedAmount={75}
        targetCurrency="EUR"
        exchangeRate={0.75}
        showExchangeRate={true}
      />
    );

    expect(screen.getByText("100 USD =")).toBeInTheDocument();
    expect(screen.getByText("75.00 EUR")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 0.75 EUR")).toBeInTheDocument();
  });

  // Tests that the component renders correctly with exchangeRate=0
  it("renders correctly with exchangeRate=0", () => {
    render(
      <ConversionResult
        baseAmount={100}
        baseCurrency="USD"
        convertedAmount={0}
        targetCurrency="EUR"
        exchangeRate={0}
        showExchangeRate={true}
      />
    );

    expect(screen.getByText("100 USD =")).toBeInTheDocument();
    expect(screen.getByText("0.00 EUR")).toBeInTheDocument();
    expect(screen.getByText("1 USD = 0.00 EUR")).toBeInTheDocument();
  });

  // Tests that the component renders correctly with showExchangeRate=true and exchangeRate=null
  it("renders correctly with showExchangeRate=true and exchangeRate=null", () => {
    render(
      <ConversionResult
        baseAmount={100}
        baseCurrency="USD"
        convertedAmount={0}
        targetCurrency="EUR"
        exchangeRate={null}
        showExchangeRate={true}
      />
    );

    expect(screen.queryByText("100 USD =")).not.toBeInTheDocument();
    expect(screen.queryByText("0.00 EUR")).not.toBeInTheDocument();
    expect(screen.queryByText("1 USD = NaN EUR")).not.toBeInTheDocument();
  });
});
