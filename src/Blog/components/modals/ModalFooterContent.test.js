import { render, screen, fireEvent } from "@testing-library/react";
import ModalFooterContent from "./ModalFooterContent";

describe("ModalFooterContent_function", () => {
  // Tests that the footer is rendered with cancel and submit buttons
  it("test_render_footer_with_cancel_and_submit_buttons", () => {
    const onClose = jest.fn();
    render(
      <ModalFooterContent
        isLoading={false}
        error={null}
        onClose={onClose}
        buttonText="Submit"
      />
    );
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  // Tests that the footer is rendered with custom button text
  it("test_render_footer_with_custom_button_text", () => {
    render(
      <ModalFooterContent
        isLoading={false}
        error={null}
        onClose={() => {}}
        buttonText="Custom Text"
      />
    );
    expect(screen.getByText("Custom Text")).toBeInTheDocument();
  });

  // Tests that the footer is rendered with an error message
  it("test_render_footer_with_error_message", () => {
    render(
      <ModalFooterContent
        isLoading={false}
        error="Error message"
        onClose={() => {}}
        buttonText="Submit"
      />
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  // Tests that the footer is rendered while loading
  it("test_render_footer_while_loading", () => {
    render(
      <ModalFooterContent
        isLoading={true}
        error={null}
        onClose={() => {}}
        buttonText="Submit"
      />
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  // Tests that the button click calls the onClose function
  it("test_button_click_calls_on_close_function", () => {
    const onClose = jest.fn();
    render(
      <ModalFooterContent
        isLoading={false}
        error={null}
        onClose={onClose}
        buttonText="Submit"
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  // Tests that the footer is rendered with a custom spinner size
  it("test_render_footer_with_custom_spinner_size", () => {
    render(
      <ModalFooterContent
        isLoading={true}
        error={null}
        onClose={() => {}}
        buttonText="Submit"
      />
    );
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toHaveClass("spinner-border", "spinner-border-sm");
  });
});
