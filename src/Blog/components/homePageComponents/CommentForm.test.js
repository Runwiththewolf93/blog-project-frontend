import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { useCommentContextDispatch } from "../../store/commentContext";

// Mock useCommentContextDispatch
const mockAddCommentBlogPost = jest.fn();

jest.mock("../../store/commentContext", () => ({
  useCommentContextDispatch: () => ({
    addCommentBlogPost: mockAddCommentBlogPost,
  }),
}));

beforeEach(() => {
  mockAddCommentBlogPost.mockClear();
});

// Tests that submitting a comment successfully adds the comment to the blog post and clears the comment field
it("test_submit_comment_successfully", () => {
  render(<CommentForm blogId="123" />);

  const commentInput = screen.getByLabelText("Leave a comment");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(commentInput, { target: { value: "This is a comment" } });
  fireEvent.click(submitButton);

  expect(mockAddCommentBlogPost).toHaveBeenCalledWith("123", {
    comment: "This is a comment",
  });

  expect(commentInput.value).toBe("");
});

// Tests that the comment field is cleared after submitting a comment
it("test_clear_comment_field_after_submission", () => {
  render(<CommentForm blogId="123" />);

  const commentInput = screen.getByLabelText("Leave a comment");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(commentInput, { target: { value: "This is a comment" } });
  fireEvent.click(submitButton);

  expect(commentInput.value).toBe("");
});

// Tests that submitting an empty comment does not add the comment to the blog post
it("test_submit_empty_comment", () => {
  render(<CommentForm blogId="123" />);

  const commentInput = screen.getByLabelText("Leave a comment");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(commentInput, { target: { value: "" } });
  fireEvent.click(submitButton);

  expect(mockAddCommentBlogPost).not.toHaveBeenCalled();
});

// Tests that submitting a comment with only whitespace characters does not add the comment to the blog post
it("test_submit_comment_with_whitespace_characters", () => {
  render(<CommentForm blogId="123" />);

  const commentInput = screen.getByLabelText("Leave a comment");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(commentInput, { target: { value: "   " } });
  fireEvent.click(submitButton);

  expect(mockAddCommentBlogPost).not.toHaveBeenCalled();
});

// Tests that the comment form is rendered with the correct props
it("test_render_comment_form_with_correct_props", () => {
  render(<CommentForm blogId="123" />);

  const commentInput = screen.getByLabelText("Leave a comment");

  expect(commentInput).toBeInTheDocument();
});

// Tests that the comment state is updated as the user types
it("test_update_comment_state_as_user_types", () => {
  render(<CommentForm blogId="123" />);
  const commentInput = screen.getByLabelText("Leave a comment");

  fireEvent.change(commentInput, { target: { value: "This is a comment" } });

  expect(commentInput.value).toBe("This is a comment");
});
