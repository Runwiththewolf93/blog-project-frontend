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

// Mocking the FormComponents
jest.mock("./FormComponents", () => ({
  FormCard: jest.fn(({ children, ...props }) => (
    <div>
      FormCard: {JSON.stringify(props)}
      {children}
    </div>
  )),
  AlertMessage: jest.fn(({ message, ...props }) => (
    <div>AlertMessage: {JSON.stringify({ ...props, message })}</div>
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
}));

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
    useAppContextDispatch.mockReturnValue({
      forgotUserPassword: mockForgotUserPassword,
    });

    render(<ForgotPasswordForm {...mockProps} />);

    const emailInput = screen.getByLabelText("Email Address");

    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });

    await waitFor(() => {
      expect(emailInput.value).toBe("validemail@test.com");
    });

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

    render(<ForgotPasswordForm {...mockProps} />);

    const emailInput = screen.getByLabelText("Email Address");

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });

    fireEvent.submit(screen.getByText("Send"));

    await waitFor(() => expect(mockForgotUserPassword).not.toHaveBeenCalled());

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
  });

  // Tests that the success message is displayed and redirects to confirmation page after 3 seconds
  it("test_display_success_message", async () => {
    jest.useFakeTimers();

    const mockResetSuccessMessage = jest.fn();
    let successMessage = "";

    const mockForgotUserPassword = jest.fn(() => {
      // Simulate the change of successMessage
      successMessage = "Success message";
    });

    useAppContextDispatch.mockReturnValue({
      resetSuccessMessage: mockResetSuccessMessage,
      forgotUserPassword: mockForgotUserPassword,
    });

    const { rerender } = render(
      <ForgotPasswordForm
        isLoadingReset={false}
        successMessage={successMessage}
        errorReset={null}
      />
    );

    const emailInput = screen.getByLabelText("Email Address");

    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });

    fireEvent.submit(screen.getByText("Send"));

    // Wait for the forgotUserPassword function to be called
    await waitFor(() => expect(mockForgotUserPassword).toHaveBeenCalled());

    // Rerender the component with the updated value of successMessage
    rerender(
      <ForgotPasswordForm
        isLoadingReset={false}
        successMessage={successMessage}
        errorReset={null}
      />
    );

    // Wait for the success message to appear in the document
    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() =>
      expect(screen.getByText(/Success message/i)).toBeInTheDocument()
    );

    jest.advanceTimersByTime(3000);

    // Wait for the resetSuccessMessage function to be called
    await waitFor(() => expect(mockResetSuccessMessage).toHaveBeenCalled());
  });

  // Tests that the error message is displayed when reset process fails
  it("test_display_error_message", async () => {
    let errorMessage = "";

    const mockForgotUserPassword = jest.fn(() => {
      // Simulate the change of successMessage
      errorMessage = "Error message";
    });

    useAppContextDispatch.mockReturnValue({
      forgotUserPassword: mockForgotUserPassword,
    });

    const { rerender } = render(
      <ForgotPasswordForm
        isLoadingReset={false}
        successMessage={null}
        errorReset={errorMessage}
      />
    );

    const emailInput = screen.getByLabelText("Email Address");

    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });

    fireEvent.submit(screen.getByText("Send"));

    // Wait for the forgotUserPassword function to be called
    await waitFor(() => expect(mockForgotUserPassword).toHaveBeenCalled());

    // Rerender the component with the updated value of successMessage
    rerender(
      <ForgotPasswordForm
        isLoadingReset={false}
        successMessage={null}
        errorReset={errorMessage}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Error message/i)).toBeInTheDocument();
    });
  });

  // Tests that the clear button clears email input field
  it("test_clear_button", async () => {
    // Mock useState
    const setEmailAddress = jest.fn();
    React.useState = jest.fn(() => ["", setEmailAddress]);

    render(<ForgotPasswordForm {...mockProps} />);

    const emailInput = screen.getByLabelText("Email Address");

    fireEvent.change(emailInput, { target: { value: "validemail@test.com" } });

    fireEvent.click(screen.getByText("Clear"));

    // Check that setEmailAddress was called with an empty string
    expect(setEmailAddress).toHaveBeenCalledWith("");
  });
});
