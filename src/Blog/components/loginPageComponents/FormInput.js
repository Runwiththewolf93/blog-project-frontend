import { Form } from "react-bootstrap";

export const FormInput = ({
  label,
  type,
  placeholder,
  autoFocus,
  required,
  value,
  onChange,
  name,
  textMuted,
}) => (
  <div className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      required={required}
      value={value}
      onChange={onChange}
      name={name}
    />
    <Form.Text className="text-muted">{textMuted}</Form.Text>
  </div>
);

export default FormInput;
