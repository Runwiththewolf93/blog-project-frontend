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

// SwapButton component
const SwapButton = ({ onClick }) => (
  <Col xs="auto" className="align-self-end" type="button">
    <Button style={{ width: "100px" }} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRightArrowLeft} />
    </Button>
  </Col>
);

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
        <Form.Label>Date</Form.Label>
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
      {exchangeRate && showExchangeRate && (
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

// ErrorMessage component
const ErrorMessage = ({ message, handleClose }) =>
  message && (
    <Alert dismissible variant="danger" onClose={handleClose} className="mb-0">
      {message}
    </Alert>
  );

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
