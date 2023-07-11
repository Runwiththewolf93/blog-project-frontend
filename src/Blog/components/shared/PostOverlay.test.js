import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PostOverlay from "./PostOverlay";
import {
  useBlogContextState,
  useBlogContextDispatch,
} from "../../store/blogContext";

jest.mock("../../store/blogContext", () => ({
  useBlogContextState: jest.fn(),
  useBlogContextDispatch: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

// Tests that the PostOverlay component renders a button with the text "Pin Post" and a tooltip with the text "Pin a post to your profile!".
it("test_render_post_overlay", async () => {
  useBlogContextState.mockReturnValue({
    isLoadingBlog: false,
    errorBlog: null,
  });

  useBlogContextDispatch.mockReturnValue({
    getSingleBlogPost: jest.fn(),
  });

  const postId = "6480b9b216d52e2411b1c7b3";
  render(<PostOverlay postId={postId} />);

  const button = screen.getByRole("button", { name: "Pin Post" });
  expect(button).toBeInTheDocument();

  // Fire the mouse over event
  fireEvent.mouseOver(button);

  // Wait for the tooltip to appear and then check its text content
  await waitFor(() => {
    expect(screen.getByText("Pin a post to your profile!")).toBeInTheDocument();
  });
});

// Tests that clicking the "Pin Post" button calls the getSingleBlogPost function with the correct postId.
it("test_click_pin_post_button", () => {
  useBlogContextState.mockReturnValue({
    isLoadingBlog: false,
    errorBlog: null,
  });

  const getSingleBlogPost = jest.fn();

  useBlogContextDispatch.mockReturnValue({
    getSingleBlogPost,
  });

  const postId = "6480b9b216d52e2411b1c7b3";
  render(<PostOverlay postId={postId} />);

  fireEvent.click(screen.getByText("Pin Post"));
  expect(getSingleBlogPost).toHaveBeenCalledWith(postId);
});

// Tests that the 'Pin Post' button is not disabled when the PostOverlay component is rendered with a valid postId.
it("test_button_enabled", () => {
  useBlogContextState.mockReturnValue({
    isLoadingBlog: false,
    errorBlog: null,
  });

  useBlogContextDispatch.mockReturnValue({
    getSingleBlogPost: jest.fn(),
  });

  render(<PostOverlay postId="6480b9b216d52e2411b1c7b3" />);

  const button = screen.getByRole("button", { name: /Pin Post/i });
  expect(button).not.toBeDisabled();
});

// Tests that clicking the "Pin Post" button calls the getSingleBlogPost function with the correct postId parameter. Also tests that the spinner is not displayed and the button is enabled.
it("test_button_click", () => {
  useBlogContextState.mockReturnValue({
    isLoadingBlog: false,
    errorBlog: null,
  });

  const getSingleBlogPost = jest.fn();

  useBlogContextDispatch.mockReturnValue({
    getSingleBlogPost,
  });

  render(<PostOverlay postId="6480b9b216d52e2411b1c7b3" />);

  const button = screen.getByRole("button", { name: /Pin Post/i });
  expect(button).toBeInTheDocument();

  const spinner = screen.queryByRole("status");
  expect(spinner).not.toBeInTheDocument();

  fireEvent.click(button);
  expect(getSingleBlogPost).toHaveBeenCalledWith("6480b9b216d52e2411b1c7b3");
});

// Tests that the spinner is displayed when isLoadingBlog prop is true.
it("test_spinner_displayed", () => {
  useBlogContextState.mockReturnValue({
    isLoadingBlog: true,
    errorBlog: null,
  });

  useBlogContextDispatch.mockReturnValue({
    getSingleBlogPost: jest.fn(),
  });

  render(<PostOverlay postId="6480b9b216d52e2411b1c7b3" />);

  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

// Tests that the error message is displayed in the tooltip when the PostOverlay component is rendered with an errorBlog prop.
it("test_error_message_displayed", async () => {
  useBlogContextState.mockReturnValue({
    isLoadingBlog: false,
    errorBlog: "Error message",
  });

  useBlogContextDispatch.mockReturnValue({
    getSingleBlogPost: jest.fn(),
  });

  render(<PostOverlay postId="6480b9b216d52e2411b1c7b3" />);

  // Fire the mouse over event
  fireEvent.mouseOver(screen.getByText("Pin Post"));

  // Wait for the tooltip to appear and then check its text content
  await waitFor(() => {
    expect(screen.getByText("Error: Error message")).toBeInTheDocument();
  });
});
