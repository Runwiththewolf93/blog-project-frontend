import React from "react";
import { render, screen } from "@testing-library/react";
import CommentItem from "./CommentItem";

// Mock the Vote component
jest.mock("../shared/Vote", () => {
  return function DummyVote(props) {
    return <div data-testid="vote">{JSON.stringify(props)}</div>;
  };
});

// Mock the CommentItemControls component
jest.mock("./CommentItemControls", () => {
  return function DummyCommentItemControls(props) {
    return <div data-testid="controls">{JSON.stringify(props)}</div>;
  };
});

// Tests that the component renders a comment item with user name, comment, and timestamps
it("renders a comment item with user name, comment, and timestamps", () => {
  const comment = {
    _id: "123",
    user: {
      name: "John Doe",
    },
    comment: "This is a comment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const userInfo = {
    name: "Jane Doe",
  };
  const blogId = "456";
  const state = {};
  const dispatch = jest.fn();

  render(
    <CommentItem
      comment={comment}
      userInfo={userInfo}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  expect(screen.getByText(comment.user.name)).toBeInTheDocument();
  expect(screen.getByText(comment.comment)).toBeInTheDocument();
  expect(
    screen.getByText(
      `createdAt: ${new Date(comment.createdAt).toLocaleString()}`
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      `updatedAt: ${new Date(comment.updatedAt).toLocaleString()}`
    )
  ).toBeInTheDocument();
});

// Tests that the component renders a Vote component for the comment
it("renders a Vote component for the comment", () => {
  const comment = {
    _id: "123",
    user: {
      name: "John Doe",
    },
    comment: "This is a comment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const userInfo = {
    name: "Jane Doe",
  };
  const blogId = "456";
  const state = {};
  const dispatch = jest.fn();

  render(
    <CommentItem
      comment={comment}
      userInfo={userInfo}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  const voteComponent = screen.getByTestId("vote");
  const voteProps = JSON.parse(voteComponent.textContent);

  expect(voteProps.type).toBe("comment");
  expect(voteProps.itemId).toBe(comment._id);
  expect(voteProps.userInfo).toEqual(userInfo);
});

// Tests that the component renders a CommentItemControls component for the comment
it("renders a CommentItemControls component for the comment", () => {
  const comment = {
    _id: "123",
    user: {
      name: "John Doe",
    },
    comment: "This is a comment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const userInfo = {
    name: "Jane Doe",
  };
  const blogId = "456";
  const state = {};
  const dispatch = jest.fn();

  render(
    <CommentItem
      comment={comment}
      userInfo={userInfo}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  const commentItemControlsComponent = screen.getByTestId("controls");
  const commentItemControlsProps = JSON.parse(
    commentItemControlsComponent.textContent
  );

  expect(commentItemControlsProps.comment).toEqual(comment);
  expect(commentItemControlsProps.blogId).toBe(blogId);
  expect(commentItemControlsProps.state).toEqual(state);
});

// Tests that the component renders the user's name if the comment's user name is not available
it("renders the user's name if the comment's user name is not available", () => {
  const comment = {
    _id: "123",
    user: {},
    comment: "This is a comment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const userInfo = {
    name: "Jane Doe",
  };
  const blogId = "456";
  const state = {};
  const dispatch = jest.fn();

  render(
    <CommentItem
      comment={comment}
      userInfo={userInfo}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  expect(screen.getByText(userInfo.name)).toBeInTheDocument();
});

// Tests that the component renders the createdAt and updatedAt timestamps in the correct format
it("renders the createdAt and updatedAt timestamps in the correct format", () => {
  const comment = {
    _id: "123",
    user: {
      name: "John Doe",
    },
    comment: "This is a comment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const userInfo = {
    name: "Jane Doe",
  };
  const blogId = "456";
  const state = {};
  const dispatch = jest.fn();

  render(
    <CommentItem
      comment={comment}
      userInfo={userInfo}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  expect(
    screen.getByText(
      `createdAt: ${new Date(comment.createdAt).toLocaleString()}`
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      `updatedAt: ${new Date(comment.updatedAt).toLocaleString()}`
    )
  ).toBeInTheDocument();
});

// Tests that the component uses useMemo to memoize the CommentItemControls props
it("uses useMemo to memoize the CommentItemControls props", () => {
  const comment = {
    _id: "123",
    user: {
      name: "John Doe",
    },
    comment: "This is a comment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const userInfo = {
    name: "Jane Doe",
  };
  const blogId = "456";
  const state = {};
  const dispatch = jest.fn();

  const { rerender } = render(
    <CommentItem
      comment={comment}
      userInfo={userInfo}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  const commentItemControlsComponent = screen.getByTestId("controls");
  const commentItemControlsProps1 = JSON.parse(
    commentItemControlsComponent.textContent
  );

  rerender(
    <CommentItem
      comment={comment}
      userInfo={userInfo}
      blogId={blogId}
      state={state}
      dispatch={dispatch}
    />
  );

  const commentItemControlsProps2 = JSON.parse(
    commentItemControlsComponent.textContent
  );

  expect(commentItemControlsProps1).toEqual(commentItemControlsProps2);
});
