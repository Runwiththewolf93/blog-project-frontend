import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommentItemControls from "./CommentItemControls";
import {
  setEditCommentId,
  setEditedComment,
  setLoadingCommentId,
  setErrorCommentId,
  setErrorMessage,
} from "./CommentsReducer";

// Mocking dispatch functions
let commentContextMocks, voteContextMocks;

jest.mock("../../store/commentContext", () => {
  const mocks = {
    editCommentBlogPost: jest.fn(),
    deleteCommentBlogPost: jest.fn(),
  };

  // Store the mock function so they can be referenced in tests
  commentContextMocks = mocks;

  return {
    useCommentContextDispatch: jest.fn(() => mocks),
  };
});

jest.mock("../../store/voteContext", () => {
  const mocks = {
    deleteCommentVoteCount: jest.fn(),
  };

  // Store the mock function so they can be referenced in tests
  voteContextMocks = mocks;

  return {
    useVoteContextDispatch: jest.fn(() => mocks),
  };
});

afterEach(jest.clearAllMocks);

// Tests that CommentItemControls renders without errors
it("renders without errors", () => {
  const comment = {
    _id: "123",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: null,
    editCommentId: null,
    editedComment: "",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );
});

// Tests that clicking the 'Edit Comment' button enters edit state
it("enters edit state", () => {
  const comment = {
    _id: "123",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: null,
    editCommentId: null,
    editedComment: "",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  fireEvent.click(screen.getByText("Edit Comment"));

  expect(dispatch).toHaveBeenCalledWith(setEditCommentId("1"));
});

// Tests that clicking the 'Cancel' button exits edit state
it("exits edit state", () => {
  const comment = {
    _id: "123",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: null,
    editCommentId: "123",
    editedComment: "",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  fireEvent.click(screen.getByText("Cancel"));

  expect(dispatch).toHaveBeenCalledWith(setEditCommentId(null));
  expect(dispatch).toHaveBeenCalledWith(setEditedComment(""));
});

// Tests that clicking the 'Save' button saves edited comment
it("saves edited comment", async () => {
  const comment = {
    _id: "1",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: null,
    editCommentId: "1",
    editedComment: "edited comment",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  fireEvent.click(screen.getByText("Save"));

  expect(dispatch).toHaveBeenCalledWith(setLoadingCommentId("1"));
  expect(commentContextMocks.editCommentBlogPost).toHaveBeenCalledWith(
    "1",
    "1",
    {
      editedComment: "edited comment",
    }
  );

  await waitFor(() =>
    expect(dispatch).toHaveBeenCalledWith(setEditCommentId(null))
  );
  await waitFor(() =>
    expect(dispatch).toHaveBeenCalledWith(setEditedComment(""))
  );
});

// Tests that clicking the 'Delete Comment' button deletes comment
it("deletes comment", () => {
  const comment = {
    _id: "1",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: null,
    editCommentId: null,
    editedComment: "",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  fireEvent.click(screen.getByText("Delete Comment"));

  expect(voteContextMocks.deleteCommentVoteCount).toHaveBeenCalledWith("1");
  expect(commentContextMocks.deleteCommentBlogPost).toHaveBeenCalledWith(
    "1",
    "1"
  );
});

// Tests that a spinner is rendered when loadingCommentId matches comment._id
it("renders spinner", () => {
  const comment = {
    _id: "1",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: "1",
    errorCommentId: null,
    editCommentId: null,
    editedComment: "",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

// Tests that an alert is rendered when errorCommentId matches comment._id
it("renders alert", () => {
  const comment = {
    _id: "1",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: "1",
    editCommentId: null,
    editedComment: "",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  expect(screen.getByTestId("alert")).toBeInTheDocument();
});

// Tests that typing in the 'edit comment' input field triggers appropriate action
it("triggers setEditedComment action on typing in the 'edit comment' input field", async () => {
  const comment = {
    _id: "1",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: null,
    editCommentId: "1",
    editedComment: "New comment text",
    errorMessage: "",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  const newComment = "New comment text";

  fireEvent.change(screen.getByTestId("edit-comment-textarea"), {
    target: { value: newComment },
  });

  // Should expect that the value of the textarea has changed to the new comment
  expect(screen.getByDisplayValue(newComment)).toBeInTheDocument();
});

// Tests that clicking the dismiss button on the error alert dismisses the error
it("dismisses the error on clicking the dismiss button on the error alert", async () => {
  const comment = {
    _id: "1",
  };
  const blogId = "1";
  const state = {
    loadingCommentId: null,
    errorCommentId: "1",
    editCommentId: null,
    editedComment: "",
    errorMessage: "Test error",
  };
  const dispatch = jest.fn();

  render(
    <CommentItemControls
      comment={comment}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  // simulate clicking the dismiss button
  fireEvent.click(screen.getByRole("button", { name: "Close alert" }));

  // assert that the appropriate actions were dispatched
  expect(dispatch).toHaveBeenCalledWith(setErrorCommentId(null));
  expect(dispatch).toHaveBeenCalledWith(setErrorMessage(""));
});
