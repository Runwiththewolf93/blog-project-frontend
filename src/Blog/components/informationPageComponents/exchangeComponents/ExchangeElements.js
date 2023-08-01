import {
  Form,
  Col,
  Button,
  Alert,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

/**
 * Renders a form input component.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.label - The label for the form input.
 * @param {string} props.placeholder - The placeholder text for the form input.
 * @param {string} props.type - The type of the form input.
 * @param {string} props.value - The value of the form input.
 * @param {function} props.onChange - The event handler for when the form input value changes.
 * @return {JSX.Element} The rendered form input component.
 */
// FormInput component
const FormInput = ({ label, placeholder, type, value, onChange }) => (
  <Col>
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  </Col>
);

/**
 * Renders a form select component.
 *
 * @param {string} value - The current value of the select component.
 * @param {string} label - The label for the select component.
 * @param {function} onChange - The callback function to handle value changes.
 * @param {Array} options - The array of options to be rendered in the select component.
 * @param {string} baseExchangeRate - The value of the base exchange rate option.
 * @return {JSX.Element} - The rendered form select component.
 */
// FormSelect component
const FormSelect = ({ label, value, onChange, options, baseExchangeRate }) => (
  <Col>
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={onChange}>
        <option value={baseExchangeRate}>{baseExchangeRate}</option>
        {options}
      </Form.Select>
    </Form.Group>
  </Col>
);

/**
 * Renders a SwapButton component.
 *
 * @param {function} onClick - The function to be called when the button is clicked.
 * @return {JSX.Element} The rendered SwapButton component.
 */
// SwapButton component
const SwapButton = ({ onClick }) => (
  <Col xs="auto" className="align-self-end" type="button">
    <Button style={{ width: "100px" }} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRightArrowLeft} />
    </Button>
  </Col>
);

/**
 * Renders a button group component.
 *
 * @param {Function} onClear - The callback function to be called when the "Clear" button is clicked.
 * @param {Function} onConvert - The callback function to be called when the "Convert" button is clicked.
 * @return {ReactElement} The rendered button group component.
 */
// ButtonGroup component
const ButtonGroup = ({ onClear, onConvert }) => {
  const isLaptopScreenOrSmaller = useMediaQuery({
    query: "(max-width: 992px)",
  });

  const buttonStyle = isLaptopScreenOrSmaller
    ? { height: "40px" }
    : { height: "40px", marginTop: "auto" };

  return (
    <Col
      data-testid="col-element"
      className={`d-flex ${
        isLaptopScreenOrSmaller
          ? "justify-content-center align-items-center mt-3"
          : "justify-content-end"
      }`}
      md={isLaptopScreenOrSmaller ? 3 : 2}
    >
      <Button
        type="button"
        style={buttonStyle}
        onClick={onClear}
        className="me-3"
      >
        Clear
      </Button>
      <Button type="submit" style={buttonStyle} onClick={onConvert}>
        Convert
      </Button>
    </Col>
  );
};

/**
 * Renders a DateInput component.
 *
 * @param {object} value - The value of the date input.
 * @param {function} onChange - The function to be called when the date input changes.
 * @return {JSX.Element} - The rendered DateInput component.
 */
// DateInput component
const DateInput = ({ value, onChange }) => {
  const isLaptopScreenOrSmaller = useMediaQuery({
    query: "(max-width: 992px)",
  });

  return (
    <Col
      md={isLaptopScreenOrSmaller ? 3 : 2}
      className={isLaptopScreenOrSmaller && "d-flex align-items-center pb-3"}
    >
      <Form.Group>
        <Form.Label htmlFor="date-input">Date</Form.Label>
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="date-tooltip">
              Please select a date that is at least 48 hours ago. The API does
              not support later dates.
            </Tooltip>
          }
        >
          <Form.Control
            id="date-input"
            placeholder="$1.00"
            type="date"
            value={value}
            onChange={onChange}
          />
        </OverlayTrigger>
      </Form.Group>
    </Col>
  );
};

/**
 * Renders a component that displays the conversion result.
 *
 * @param {Object} props - The properties for the component.
 * @param {number} props.baseAmount - The base amount to be converted.
 * @param {string} props.baseCurrency - The currency of the base amount.
 * @param {number} props.convertedAmount - The converted amount.
 * @param {string} props.targetCurrency - The currency of the converted amount.
 * @param {number} props.exchangeRate - The exchange rate used for the conversion.
 * @param {boolean} props.showExchangeRate - Flag indicating whether to display the exchange rate.
 * @return {JSX.Element} The rendered component.
 */
// ConversionResult component
const ConversionResult = ({
  baseAmount,
  baseCurrency,
  convertedAmount,
  targetCurrency,
  exchangeRate,
  showExchangeRate,
}) => {
  const isLaptopScreenOrSmaller = useMediaQuery({
    query: "(max-width: 992px)",
  });

  return (
    <Col
      md={isLaptopScreenOrSmaller ? 6 : 8}
      className={`d-flex justify-content-around align-items-center ${
        isLaptopScreenOrSmaller && "flex-column text-center"
      }`}
    >
      {exchangeRate !== null &&
        exchangeRate !== undefined &&
        showExchangeRate && (
          <>
            <p className="mt-4 mb-0">
              {baseAmount} {baseCurrency} =
            </p>
            <h3 className="mt-4 mb-0">
              {convertedAmount.toFixed(2)} {targetCurrency}
            </h3>
            <p className="mt-4 mb-0">
              1 {baseCurrency} = {exchangeRate.toFixed(2)} {targetCurrency}
            </p>
          </>
        )}
    </Col>
  );
};

/**
 * Renders an error message component.
 *
 * @param {string} message - The error message to display.
 * @param {function} handleClose - The function to call when the message is closed.
 * @return {JSX.Element} The rendered error message component.
 */
// ErrorMessage component
const ErrorMessage = ({ message, handleClose }) =>
  message && (
    <Alert dismissible variant="danger" onClose={handleClose} className="mb-0">
      {message}
    </Alert>
  );

/**
 * Renders a spinner exchange component.
 *
 * @return {React.Element} The rendered spinner exchange component.
 */
// SpinnerExchange component
const SpinnerExchange = () => (
  <Col>
    <div className="d-flex justify-content-center align-items-center mt-4 pt-3">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  </Col>
);

export {
  FormInput,
  FormSelect,
  SwapButton,
  ButtonGroup,
  DateInput,
  ConversionResult,
  ErrorMessage,
  SpinnerExchange,
};
