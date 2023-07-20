import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResetPasswordForm from "./ResetPasswordForm";

global.alert = jest.fn();

// Mocks
jest.mock("../../store/appContext", () => ({
  useAppContextDispatch: jest.fn().mockReturnValue({
    resetUserPassword: jest.fn(),
    resetSuccessMessage: jest.fn(),
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

const mockOnClose = jest.fn();

// Mocking the FormComponents
jest.mock("./FormComponents", () => ({
  AlertMessage: jest.fn(({ message, onClose, ...props }) => {
    // Call the mock function when the close button is clicked
    const handleClose = () => {
      mockOnClose();
      onClose();
    };

    return (
      <div role="alert">
        AlertMessage: <span>{message}</span>
        <button role="button" onClick={handleClose}>
          Close
        </button>
      </div>
    );
  }),
  PasswordField: jest.fn(({ label, onChange, ...props }) => (
    <div>
      <div>PasswordField: {JSON.stringify({ ...props })}</div>
      <label htmlFor={label.split(" ")[0]}>{label}</label>
      <input id={label.split(" ")[0]} onChange={e => onChange(e)} />
    </div>
  )),
  ClearSubmitButtonGroup: jest.fn(
    ({ clearLabel, submitLabel, handleClear, ...props }) => {
      // Call handleClear when the "Clear" button is clicked
      const handleClick = () => {
        handleClear();
      };

      return (
        <div>
          ClearSubmitButtonGroup: {JSON.stringify(props)}
          <button>{submitLabel}</button>
          <button onClick={handleClick}>{clearLabel}</button>
        </div>
      );
    }
  ),
  FormCard: jest.fn(({ children, ...props }) => (
    <div>
      FormCard: {JSON.stringify(props)}
      {children}
    </div>
  )),
}));

describe("ResetPasswordForm_function", () => {
  // Tests that the form renders without crashing
  it("test_form_renders_without_crashing", () => {
    const props = {
      isLoadingReset: false,
      successMessage: "",
      errorReset: "",
      token: "12345",
    };

    render(<ResetPasswordForm {...props} />);
  });

  // Tests that the new password input field renders
  it("test_new_password_input_field_renders", () => {
    const props = {
      isLoadingReset: false,
      successMessage: "",
      errorReset: "",
      token: "12345",
    };

    render(<ResetPasswordForm {...props} />);

    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
  });

  // Tests that the clear button clears the input field
  it("test_clear_button_clears_input_field", () => {
    const props = {
      isLoadingReset: false,
      successMessage: "",
      errorReset: "",
      token: "12345",
    };

    let newPassword = "";

    // Mock useState
    const setNewPassword = jest.fn(value => (newPassword = value));
    React.useState = jest.fn(() => [newPassword, setNewPassword]);

    render(<ResetPasswordForm {...props} />);

    const inputField = screen.getByLabelText("New Password");
    const clearButton = screen.getByText("Clear");

    fireEvent.change(inputField, { target: { value: "password" } });
    expect(newPassword).toBe("password");

    fireEvent.click(clearButton);
    expect(newPassword).toBe("");
  });

  // Tests that an alert is displayed if the password length is less than six characters
  it("test_password_length_less_than_six_characters", () => {
    const props = {
      isLoadingReset: false,
      successMessage: "",
      errorReset: "",
      token: "12345",
    };

    render(<ResetPasswordForm {...props} />);

    const inputField = screen.getByLabelText("New Password");
    const submitButton = screen.getByText("Update");

    fireEvent.change(inputField, { target: { value: "12345" } });
    fireEvent.click(submitButton);

    expect(alert).toHaveBeenCalledWith(
      "Passwords should have a length of at least six characters!"
    );
  });

  // Tests that an error message is displayed if the token is missing
  it("test_token_is_missing", () => {
    const props = {
      isLoadingReset: false,
      successMessage: "",
      errorReset: "Token is missing",
      token: "",
    };

    render(<ResetPasswordForm {...props} />);

    expect(screen.getByText(/Token is missing/i)).toBeInTheDocument();
  });

  // Tests that the success message disappears after three seconds
  it("test_success_message_disappears_after_three_seconds", async () => {
    jest.useFakeTimers();
    const props = {
      isLoadingReset: false,
      successMessage: "Password updated successfully",
      errorReset: "",
      token: "12345",
    };

    // Mock the useAppContextDispatch hook to return the resetSuccessMessage function
    jest.mock("../../store/appContext", () => {
      const resetSuccessMessage = jest.fn();
      return {
        useAppContextDispatch: jest.fn().mockReturnValue({
          resetUserPassword: jest.fn(),
          resetSuccessMessage,
        }),
      };
    });

    render(<ResetPasswordForm {...props} />);

    expect(
      screen.getByText(/Password updated successfully/i)
    ).toBeInTheDocument();

    jest.advanceTimersByTime(3000);

    // Check that the resetSuccessMessage function was called
    expect(
      require("../../store/appContext").useAppContextDispatch()
        .resetSuccessMessage
    ).toHaveBeenCalled();

    jest.useRealTimers();
  });

  // Tests that the error message disappears after closing the alert
  it("error_message_disappears_after_closing_alert", () => {
    const props = {
      isLoadingReset: false,
      successMessage: null,
      errorReset: "Error message",
      token: "12345",
    };
    render(<ResetPasswordForm {...props} />);

    const alertMessage = screen.getByRole("alert");

    expect(alertMessage).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    // Check if the mock function was called
    expect(mockOnClose).toHaveBeenCalled();
  });

  // Tests that the success message is displayed after the password is updated
  it("success_message_displays_after_password_update", () => {
    const successMessage = "Password updated successfully!";
    const errorReset = "";
    const isLoadingReset = false;
    const token = "123456789";

    render(
      <ResetPasswordForm
        isLoadingReset={isLoadingReset}
        successMessage={successMessage}
        errorReset={errorReset}
        token={token}
      />
    );

    expect(screen.getByText(successMessage)).toBeInTheDocument();
  });
});
