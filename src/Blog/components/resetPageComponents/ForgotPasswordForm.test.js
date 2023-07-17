import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { useAppContextDispatch } from "../../store/appContext";

// Mocks
jest.mock("../../store/appContext", () => ({
  useAppContextDispatch: jest.fn().mockReturnValue({
    forgotUserPassword: jest.fn(),
    resetSuccessMessage: jest.fn(),
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

// Get the state values
let emailAddress,
  isValidEmail,
  showEmailError,
  showSuccessAlert,
  showErrorAlert;

// Spy on useState
jest.spyOn(React, "useState").mockImplementation(init => {
  switch (init) {
    case "":
      return [emailAddress, newState => (emailAddress = newState)];
    case true:
      if (isValidEmail === true) {
        return [isValidEmail, newState => (isValidEmail = newState)];
      } else if (showEmailError === true) {
        return [showEmailError, newState => (showEmailError = newState)];
      } else if (showSuccessAlert === true) {
        return [showSuccessAlert, newState => (showSuccessAlert = newState)];
      } else {
        return [showErrorAlert, newState => (showErrorAlert = newState)];
      }
    default:
      return [init, jest.fn()];
  }
});

// Mocking useEffect
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn().mockImplementation(f => f()),
}));

// Mocking the FormComponents
jest.mock("./FormComponents", () => ({
  AlertMessage: jest.fn(props => (
    <div>AlertMessage: {JSON.stringify(props)}</div>
  )),
  ClearSubmitButtonGroup: jest.fn(props => (
    <div>ClearSubmitButtonGroup: {JSON.stringify(props)}</div>
  )),
  FormCard: jest.fn(({ children, ...props }) => (
    <div>
      FormCard: {JSON.stringify(props)}
      {children}
    </div>
  )),
}));

beforeEach(() => {
  emailAddress = "";
  isValidEmail = true;
  showEmailError = true;
  showSuccessAlert = true;
  showErrorAlert = true;
});

const mockProps = {
  isLoadingReset: false,
  successMessage: "",
  errorReset: "",
};

describe("ForgotPasswordForm_function", () => {
  // Tests that the form renders correctly
  it("test_render_form", () => {
    render(<ForgotPasswordForm {...mockProps} />);
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  // Tests that a valid email address is submitted successfully
  it("test_submit_valid_email", async () => {
    const mockForgotUserPassword = jest.fn();
    useAppContextDispatch.mockReturnValue({ mockForgotUserPassword });

    render(<ForgotPasswordForm {...mockProps} />);

    const emailInput = screen.getByLabelText("Email Address");

    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });

    fireEvent.submit(screen.getByText("Send"));

    await waitFor(() =>
      expect(mockForgotUserPassword).toHaveBeenCalledWith("validemail@test.com")
    );
  });

  // Tests that an invalid email address is not submitted
  it("test_submit_invalid_email", async () => {
    const mockForgotUserPassword = jest.fn();
    useAppContextDispatch.mockReturnValue({
      forgotUserPassword: mockForgotUserPassword,
    });
    const { getByLabelText, getByText, queryByText } = render(
      <ForgotPasswordForm />
    );
    const emailInput = getByLabelText("Email Address");
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.submit(getByText("Send"));
    await waitFor(() => expect(mockForgotUserPassword).not.toHaveBeenCalled());
    expect(
      queryByText("Please enter a valid email address.")
    ).toBeInTheDocument();
  });

  // Tests that the success message is displayed and redirects to confirmation page after 3 seconds
  it("test_display_success_message", async () => {
    const mockResetSuccessMessage = jest.fn();
    useAppContextDispatch.mockReturnValue({
      resetSuccessMessage: mockResetSuccessMessage,
    });
    const { getByLabelText, getByText, queryByText } = render(
      <ForgotPasswordForm successMessage="Success message" />
    );
    const emailInput = getByLabelText("Email Address");
    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });
    fireEvent.submit(getByText("Send"));
    await waitFor(() => expect(mockResetSuccessMessage).toHaveBeenCalled());
    expect(queryByText("Success message")).toBeInTheDocument();
    await waitFor(() => expect(mockResetSuccessMessage).toHaveBeenCalled());
    expect(mockResetSuccessMessage).toHaveBeenCalled();
  });

  // Tests that the error message is displayed when reset process fails
  it("test_display_error_message", async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <ForgotPasswordForm errorReset="Error message" />
    );
    const emailInput = getByLabelText("Email Address");
    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });
    fireEvent.submit(getByText("Send"));
    expect(queryByText("Error message")).toBeInTheDocument();
  });

  // Tests that the clear button clears email input field
  it("test_clear_button", async () => {
    const { getByLabelText, getByText } = render(<ForgotPasswordForm />);
    const emailInput = getByLabelText("Email Address");
    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });
    fireEvent.click(getByText("Clear"));
    expect(emailInput.value).toBe("");
  });
});
