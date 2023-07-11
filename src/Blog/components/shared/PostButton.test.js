import { render, screen, fireEvent } from "@testing-library/react";
import PostButton from "./PostButton";
import PostOverlay from "./PostOverlay";

jest.mock("./PostOverlay", () => {
  return jest.fn(() => <div data-testid="post-overlay">Mock PostOverlay</div>);
});

// Tests that the PostButton component renders the PostOverlay component when the showPostOverlay prop is true.
it("test_show_post_overlay_true", () => {
  render(
    <PostButton showPostOverlay={true} postId="1" resetBlogPost={() => {}} />
  );

  const postOverlay = screen.getByTestId("post-overlay");

  expect(postOverlay).toBeInTheDocument();
});

// Tests that the PostButton component renders a button with the text "Unpin Post" when the showPostOverlay prop is false.
it("test_show_post_overlay_false", () => {
  render(
    <PostButton showPostOverlay={false} postId="1" resetBlogPost={() => {}} />
  );

  const buttonElement = screen.getByRole("button", { name: "Unpin Post" });

  expect(buttonElement).toBeInTheDocument();
});

// Tests that the "Unpin Post" button is rendered and clickable, and that the resetBlogPost function is called when the button is clicked.
it("test_reset_blog_post_defined", () => {
  const mockResetBlogPost = jest.fn();

  render(
    <PostButton
      showPostOverlay={false}
      postId="1"
      resetBlogPost={mockResetBlogPost}
    />
  );

  const buttonElement = screen.getByText("Unpin Post");

  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);

  // Check if the resetBlogPost function has been called
  expect(mockResetBlogPost).toHaveBeenCalled();
});

// Tests that the PostButton component renders a button with the text "Unpin Post" when the showPostOverlay prop is false and the resetBlogPost prop is not a function.
it("test_reset_blog_post_not_function", () => {
  const resetBlogPost = jest.fn();

  render(
    <PostButton
      showPostOverlay={false}
      postId="1"
      resetBlogPost={resetBlogPost}
    />
  );

  fireEvent.click(screen.getByText(/Unpin Post/i));

  expect(resetBlogPost).toHaveBeenCalled();
});

// Tests that the PostButton component renders a button with the correct text and class when showPostOverlay is false.
it("test_button_component_properties", () => {
  render(
    <PostButton showPostOverlay={false} postId="1" resetBlogPost={() => {}} />
  );

  const button = screen.getByRole("button", { name: "Unpin Post" });

  expect(button).toHaveClass("btn-light");
  expect(button).toHaveTextContent("Unpin Post");
});
