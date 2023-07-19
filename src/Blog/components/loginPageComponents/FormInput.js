import { Form } from "react-bootstrap";

/**
 * Renders a form input component.
 *
 * @param {Object} props - The props object containing the input properties.
 * @param {string} props.label - The label text for the input.
 * @param {string} props.type - The type of the input.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {boolean} props.autoFocus - Indicates if the input should be focused on load.
 * @param {boolean} props.required - Indicates if the input is required.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - The event handler for the input change event.
 * @param {string} props.name - The name attribute for the input.
 * @param {string} props.textMuted - The text to display below the input.
 * @return {JSX.Element} The rendered form input component.
 */
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
