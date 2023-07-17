import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationPage from "./ConfirmationPage";
import { useNavigate } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

describe("ConfirmationPage_function", () => {
  // Tests that the confirmation page is rendered with heading and paragraph
  it("test_render_confirmation_page", () => {
    render(
      <ConfirmationPage heading="Test Heading" paragraph="Test Paragraph" />
    );
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Paragraph")).toBeInTheDocument();
  });

  // Tests that clicking the 'Go to Home Page' button navigates to home page
  it("test_click_go_to_home_page_button", () => {
    render(
      <ConfirmationPage heading="Test Heading" paragraph="Test Paragraph" />
    );
    fireEvent.click(screen.getByText("Go to Home Page"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  // Tests that the confirmation page is rendered with empty heading and paragraph props
  it("test_empty_heading_and_paragraph_props", () => {
    render(<ConfirmationPage heading="" paragraph="" />);

    const headingElement = screen.getByTestId("heading");
    const paragraphElement = screen.getByTestId("paragraph");

    expect(headingElement.textContent).toBe("");
    expect(paragraphElement.textContent).toBe("");
  });

  // Tests that the confirmation page is rendered with long heading and paragraph props
  it("test_long_heading_and_paragraph_props", () => {
    const longHeading = "a".repeat(100);
    const longParagraph = "b".repeat(200);

    render(
      <ConfirmationPage heading={longHeading} paragraph={longParagraph} />
    );
    expect(screen.getByText(longHeading)).toBeInTheDocument();
    expect(screen.getByText(longParagraph)).toBeInTheDocument();
  });
});
