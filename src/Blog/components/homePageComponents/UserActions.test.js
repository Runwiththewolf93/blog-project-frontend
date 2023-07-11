import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import UserActions from "./UserActions";
import { useBlogContextDispatch } from "../../store/blogContext";
import { useCommentContextDispatch } from "../../store/commentContext";
import { useVoteContextDispatch } from "../../store/voteContext";
import ModalEdit from "../modals/ModalEdit";

// mocks
jest.mock("../../store/blogContext", () => ({
  useBlogContextDispatch: jest.fn(),
}));

jest.mock("../../store/commentContext", () => ({
  useCommentContextDispatch: jest.fn(),
}));

jest.mock("../../store/voteContext", () => ({
  useVoteContextDispatch: jest.fn(),
}));

jest.mock("../modals/ModalEdit", () =>
  jest.fn(() => <div data-testid="modal-edit-mock" />)
);

// Mock the async functions
const deleteBlogPost = jest.fn();
const deleteAllCommentsBlogPost = jest.fn();
const deleteBlogVoteCount = jest.fn();
const deleteAllCommentVotesForBlogPost = jest.fn();

// Mock the return values
useBlogContextDispatch.mockReturnValue({
  deleteBlogPost,
});

useCommentContextDispatch.mockReturnValue({
  deleteAllCommentsBlogPost,
});

useVoteContextDispatch.mockReturnValue({
  deleteBlogVoteCount,
  deleteAllCommentVotesForBlogPost,
});

beforeEach(() => {
  // Reset the mock function calls
  deleteBlogPost.mockReset();
  deleteAllCommentsBlogPost.mockReset();
  deleteBlogVoteCount.mockReset();
  deleteAllCommentVotesForBlogPost.mockReset();

  useBlogContextDispatch.mockReturnValue({
    deleteBlogPost,
  });

  useCommentContextDispatch.mockReturnValue({
    deleteAllCommentsBlogPost,
  });

  useVoteContextDispatch.mockReturnValue({
    deleteBlogVoteCount,
    deleteAllCommentVotesForBlogPost,
  });
});

// Tests that the owner of the post can edit it
it("test_owner_can_edit_post", () => {
  const userInfo = {
    _id: "123",
    name: "John Doe",
  };
  const post = {
    _id: "456",
    title: "Test Post",
    body: "This is a test post",
    user: {
      _id: "123",
      name: "John Doe",
    },
  };

  render(<UserActions userInfo={userInfo} post={post} />);

  expect(screen.getByTestId("modal-edit-mock")).toBeInTheDocument();
});

// Tests that a non-owner of the post cannot edit it
it("test_non_owner_cannot_edit_post", () => {
  const userInfo = {
    _id: "123",
    name: "John Doe",
  };
  const post = {
    _id: "456",
    title: "Test Post",
    body: "This is a test post",
    user: {
      _id: "789",
      name: "Jane Doe",
    },
  };

  render(<UserActions userInfo={userInfo} post={post} />);

  expect(screen.queryByTestId("modal-edit-mock")).not.toBeInTheDocument();
});

// Tests that the owner of the post can delete it
it("test_owner_can_delete_post", async () => {
  const userInfo = {
    _id: "123",
    name: "John Doe",
  };
  const post = {
    _id: "456",
    title: "Test Post",
    body: "This is a test post",
    user: {
      _id: "123",
      name: "John Doe",
    },
  };

  render(<UserActions userInfo={userInfo} post={post} />);

  fireEvent.click(screen.getByText("Delete Post"));

  await waitFor(() =>
    expect(deleteAllCommentVotesForBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() =>
    expect(deleteAllCommentsBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() => expect(deleteBlogVoteCount).toHaveBeenCalledWith("456"));
  await waitFor(() => expect(deleteBlogPost).toHaveBeenCalledWith("456"));
});

// Tests that an error message is displayed when an error occurs while deleting a post
it("test_error_occurs_while_deleting_post", async () => {
  const userInfo = {
    _id: "123",
    name: "John Doe",
  };
  const post = {
    _id: "456",
    title: "Test Post",
    body: "This is a test post",
    user: {
      _id: "123",
      name: "John Doe",
    },
  };

  const deleteBlogPost = jest
    .fn()
    .mockRejectedValue(new Error("Error deleting post"));
  const deleteAllCommentsBlogPost = jest.fn();
  const deleteBlogVoteCount = jest.fn();
  const deleteAllCommentVotesForBlogPost = jest.fn();
  useBlogContextDispatch.mockReturnValue({ deleteBlogPost });
  useCommentContextDispatch.mockReturnValue({ deleteAllCommentsBlogPost });
  useVoteContextDispatch.mockReturnValue({
    deleteBlogVoteCount,
    deleteAllCommentVotesForBlogPost,
  });

  render(<UserActions userInfo={userInfo} post={post} />);

  const deleteButton = screen.getByText("Delete Post");

  // Fire the click event
  fireEvent.click(deleteButton);

  await waitFor(() =>
    expect(deleteAllCommentVotesForBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() =>
    expect(deleteAllCommentsBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() => expect(deleteBlogVoteCount).toHaveBeenCalledWith("456"));
  await waitFor(() => expect(deleteBlogPost).toHaveBeenCalledWith("456"));

  // Fire the mouse over event on the button
  fireEvent.mouseOver(deleteButton);

  // Use findByTestId which returns a promise that resolves when the element is found
  const errorOverlay = await screen.findByTestId("error-overlay");

  expect(errorOverlay).toHaveTextContent("Delete Post");
});

// Tests that a post with no comments or votes can be deleted
it("test_post_has_no_comments_or_votes_to_delete", async () => {
  const userInfo = {
    _id: "123",
    name: "John Doe",
  };
  const post = {
    _id: "456",
    title: "Test Post",
    body: "This is a test post",
    user: {
      _id: "123",
      name: "John Doe",
    },
  };

  const deleteBlogPost = jest.fn();
  const deleteAllCommentsBlogPost = jest.fn();
  const deleteBlogVoteCount = jest.fn();
  const deleteAllCommentVotesForBlogPost = jest.fn();
  useBlogContextDispatch.mockReturnValue({ deleteBlogPost });
  useCommentContextDispatch.mockReturnValue({ deleteAllCommentsBlogPost });
  useVoteContextDispatch.mockReturnValue({
    deleteBlogVoteCount,
    deleteAllCommentVotesForBlogPost,
  });

  render(<UserActions userInfo={userInfo} post={post} />);

  fireEvent.click(screen.getByText("Delete Post"));

  await waitFor(() =>
    expect(deleteAllCommentVotesForBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() =>
    expect(deleteAllCommentsBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() => expect(deleteBlogVoteCount).toHaveBeenCalledWith("456"));
  await waitFor(() => expect(deleteBlogPost).toHaveBeenCalledWith("456"));
});

// Tests that a post is deleted from the blog, comment, and vote contexts
it("test_post_deleted_from_contexts", async () => {
  const userInfo = {
    _id: "123",
    name: "John Doe",
  };
  const post = {
    _id: "456",
    title: "Test Post",
    body: "This is a test post",
    user: {
      _id: "123",
      name: "John Doe",
    },
  };

  const deleteBlogPost = jest.fn();
  const deleteAllCommentsBlogPost = jest.fn();
  const deleteBlogVoteCount = jest.fn();
  const deleteAllCommentVotesForBlogPost = jest.fn();
  useBlogContextDispatch.mockReturnValue({ deleteBlogPost });
  useCommentContextDispatch.mockReturnValue({ deleteAllCommentsBlogPost });
  useVoteContextDispatch.mockReturnValue({
    deleteBlogVoteCount,
    deleteAllCommentVotesForBlogPost,
  });

  render(<UserActions userInfo={userInfo} post={post} />);

  fireEvent.click(screen.getByText("Delete Post"));

  await waitFor(() =>
    expect(deleteAllCommentVotesForBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() =>
    expect(deleteAllCommentsBlogPost).toHaveBeenCalledWith("456")
  );
  await waitFor(() => expect(deleteBlogVoteCount).toHaveBeenCalledWith("456"));
  await waitFor(() => expect(deleteBlogPost).toHaveBeenCalledWith("456"));

  expect(deleteAllCommentVotesForBlogPost).toHaveBeenCalledTimes(1);
  expect(deleteAllCommentsBlogPost).toHaveBeenCalledTimes(1);
  expect(deleteBlogVoteCount).toHaveBeenCalledTimes(1);
  expect(deleteBlogPost).toHaveBeenCalledTimes(1);
});
