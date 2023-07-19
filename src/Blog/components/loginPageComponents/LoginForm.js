import { Form, Button } from "react-bootstrap";
import FormInput from "./FormInput";

/**
 * Renders a login form with input fields for username, email, and password.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - onSubmit: A function to handle the form submission.
 *   - values: An object representing the form values.
 *   - handleChange: A function to handle input change.
 *   - formValid: A boolean indicating if the form is valid.
 *   - isLoading: A boolean indicating if the form is currently being submitted.
 *   - toggleMember: A function to toggle between login and registration mode.
 * @return {JSX.Element} The rendered login form.
 */
export const LoginForm = ({
  onSubmit,
  values,
  handleChange,
  formValid,
  isLoading,
  toggleMember,
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Group className="mb-3" controlId="ControlInput1">
      {!values.isMember && (
        <FormInput
          label="Username"
          type="text"
          placeholder="Username93"
          autoFocus
          required
          value={values.name}
          onChange={handleChange}
          name="name"
          textMuted="Be as unique as possible when creating your username. Leave your mark!"
        />
      )}
      <FormInput
        label="Email address"
        type="email"
        placeholder="name@example.com"
        autoFocus
        required
        value={values.email}
        onChange={handleChange}
        name="email"
        textMuted="We'll never share your email with anyone else."
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="ControlTextarea1">
      <FormInput
        label="Password"
        type="password"
        aria-label="Password"
        aria-required="true"
        required
        value={values.password}
        onChange={handleChange}
        name="password"
        textMuted="Your password must be at least 6 characters long and contain a combination of letters, numbers, and special characters."
      />
    </Form.Group>
    <Button
      type="submit"
      variant="secondary"
      disabled={isLoading || !formValid}
      className="mt-3 w-100 fs-5"
    >
      Submit
    </Button>
    <p className="text-center mt-3 fs-5">
      {values.isMember ? "Not a member yet?" : "Already a member?"}
      <Button
        style={{ paddingTop: "3px" }}
        variant="link"
        type="button"
        onClick={toggleMember}
        className="fs-5"
      >
        {values.isMember ? "Register" : "Login"}
      </Button>
    </p>
  </Form>
);

export default LoginForm;
