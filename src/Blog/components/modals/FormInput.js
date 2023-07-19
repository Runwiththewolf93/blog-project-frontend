import { Form, Button } from "react-bootstrap";

/**
 * Renders a form input component.
 *
 * @param {Object} props - The props object containing the input properties.
 * @param {string} props.controlId - The ID of the form control.
 * @param {string} props.label - The label for the form control.
 * @param {string} props.type - The type of the input.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {boolean} props.autoFocus - Determines if the input should be automatically focused.
 * @param {string} props.value - The value of the input.
 * @param {function} props.onChange - The event handler for input change.
 * @param {string} props.name - The name of the input.
 * @param {string} props.as - The HTML tag to use for the input.
 * @param {number} props.rows - The number of rows for a textarea input.
 * @param {number} props.dataIndex - The index of the data.
 * @param {function} props.handleFileChange - The event handler for file input change.
 * @param {boolean} props.isFileInput - Determines if the input is a file input.
 * @param {function} props.handleToggle - The event handler for toggling input.
 * @param {boolean} props.fileUpload - Determines if file upload is enabled.
 * @return {JSX.Element} A React JSX element representing the form input component.
 */
// FormInput component
const FormInput = ({
  controlId,
  label,
  type,
  placeholder,
  autoFocus,
  value,
  onChange,
  name,
  as,
  rows,
  dataIndex,
  handleFileChange,
  isFileInput,
  handleToggle,
  fileUpload,
}) => {
  const uniqueControlId = `${controlId}-${
    dataIndex !== undefined ? dataIndex : new Date().getTime()
  }`;

  return (
    <Form.Group className="mb-3" controlId={uniqueControlId}>
      <Form.Label className="mb-0">{label}</Form.Label>
      {isFileInput ? (
        <>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            name={name}
            data-index={dataIndex}
          />
          {fileUpload && (
            <Button
              onClick={() => handleToggle(name, dataIndex)}
              variant="link"
              className="ps-0 pt-0 text-white text-decoration-none"
            >
              {"Switch to URL input"}
            </Button>
          )}
        </>
      ) : (
        <>
          <Form.Control
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={value || ""}
            onChange={onChange}
            name={name}
            as={as}
            rows={rows}
            data-index={dataIndex}
          />
          {fileUpload && (
            <Button
              onClick={() => handleToggle(name, dataIndex)}
              variant="link"
              className="ps-0 pt-0 text-white text-decoration-none"
            >
              {"Switch to file upload"}
            </Button>
          )}
        </>
      )}
    </Form.Group>
  );
};

export default FormInput;
