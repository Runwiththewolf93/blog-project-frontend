import { Form, Col, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

// ConvertButton component
const ConvertButton = ({ onClick }) => (
  <Button
    type="submit"
    style={{ height: "40px", marginTop: "auto" }}
    onClick={onClick}
  >
    Convert
  </Button>
);

// ClearButton component
const ClearButton = ({ onClick }) => (
  <Button
    type="button"
    style={{ height: "40px", marginTop: "auto", marginRight: "1rem" }}
    onClick={onClick}
  >
    Clear
  </Button>
);

// ErrorMessage component
const ErrorMessage = ({ message, handleClose }) =>
  message && (
    <Alert dismissible variant="danger" onClose={handleClose} className="mb-0">
      {message}
    </Alert>
  );

// DateInput component
const DateInput = ({ value, onChange }) => (
  <Col md={2}>
    <Form.Group>
      <Form.Label>Date</Form.Label>
      <Form.Control
        placeholder="$1.00"
        type="date"
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  </Col>
);

// ConversionResult component
const ConversionResult = ({
  baseAmount,
  baseCurrency,
  convertedAmount,
  targetCurrency,
  exchangeRate,
  showExchangeRate,
}) => (
  <Col md={9} className="d-flex justify-content-around align-items-center">
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

export {
  FormInput,
  FormSelect,
  SwapButton,
  ConvertButton,
  ClearButton,
  ErrorMessage,
  DateInput,
  ConversionResult,
};
