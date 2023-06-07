import { Form, Button } from "react-bootstrap";

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
      <Form.Label>{label}</Form.Label>
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
