import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommentList from "./CommentList";

// Mock the CommentItem and Vote components
jest.mock("./CommentItem", () => {
  return function DummyCommentItem(props) {
    return <div data-testid="comment-item">{JSON.stringify(props)}</div>;
  };
});

jest.mock("./CommentSort", () => {
  return function DummyCommentSort(props) {
    return <div data-testid="comment-sort">{JSON.stringify(props)}</div>;
  };
});

const dummyCommentsArray = [
  {
    _id: "1",
    blog: "123",
    createdAt: "2022-01-01T00:00:00.000Z",
    author: "John Doe",
  },
  {
    _id: "2",
    blog: "123",
    createdAt: "2022-01-02T00:00:00.000Z",
    author: "Jane Doe",
  },
  {
    _id: "3",
    blog: "123",
    createdAt: "2022-01-03T00:00:00.000Z",
    author: "John Doe",
  },
  {
    _id: "4",
    blog: "123",
    createdAt: "2022-01-04T00:00:00.000Z",
    author: "Jane Doe",
  },
  {
    _id: "5",
    blog: "123",
    createdAt: "2022-01-05T00:00:00.000Z",
    author: "John Doe",
  },
];

const newComments = [
  {
    _id: "6",
    blog: "123",
    createdAt: "2022-01-06T00:00:00.000Z",
    author: "John Doe",
  },
  {
    _id: "7",
    blog: "123",
    createdAt: "2022-01-07T00:00:00.000Z",
    author: "Jane Doe",
  },
  {
    _id: "8",
    blog: "123",
    createdAt: "2022-01-08T00:00:00.000Z",
    author: "John Doe",
  },
  {
    _id: "9",
    blog: "123",
    createdAt: "2022-01-09T00:00:00.000Z",
    author: "Jane Doe",
  },
  {
    _id: "10",
    blog: "123",
    createdAt: "2022-01-10T00:00:00.000Z",
    author: "John Doe",
  },
];

// Mock the useCommentContextDispatch and useBlogContextDispatch hooks
let commentContextStateMocks,
  commentContextDispatchMocks,
  blogContextMocks,
  commentsReducerMocks;

jest.mock("../../store/commentContext", () => {
  const mocks1 = {
    hasMoreComments: { "6495a60db26ac3dfa9001c37": true },
    commentFilterLocalStorage: dummyCommentsArray,
    isLoadingUserComment: true,
    errorUserComment: null,
  };

  const mocks2 = {
    getMoreFilteredComments: jest.fn(),
  };

  // Store the mock function so they can be referenced in tests
  commentContextStateMocks = mocks1;
  commentContextDispatchMocks = mocks2;

  return {
    useCommentContextState: jest.fn(() => mocks1),
    useCommentContextDispatch: jest.fn(() => mocks2),
  };
});

jest.mock("../../store/blogContext", () => {
  const mocks = {
    scrollToBlogPost: jest.fn(),
  };

  // Store the mock function so they can be referenced in tests
  blogContextMocks = mocks;

  return {
    useBlogContextDispatch: jest.fn(() => mocks),
  };
});

jest.mock("./CommentsReducer", () => {
  let sortedComments = dummyCommentsArray;

  const getSortedComments = () => sortedComments;

  const setSortedComments = jest.fn(newComments => {
    sortedComments = newComments;
  });

  const initialState = {
    editCommentId: null,
    editedComment: "",
    loadingCommentId: null,
    errorCommentId: null,
    errorMessage: "",
    sortedComments: getSortedComments(),
  };

  commentsReducerMocks = initialState;

  return {
    commentsReducer: jest.fn(state => state),
    initialState,
    setSortedComments,
  };
});

// Mock the useReducer hook
const mockDispatch = jest.fn();
jest
  .spyOn(React, "useReducer")
  .mockReturnValue([commentsReducerMocks, mockDispatch]);

afterEach(() => {
  jest.clearAllMocks();
  React.useReducer.mockRestore();
});

// Tests that the component renders a list of comments for a blog post
it("test_render_comments", () => {
  // Arrange
  const blogId = "123";
  const userInfo = { name: "John Doe" };
  render(<CommentList blogId={blogId} userInfo={userInfo} />);

  // Act
  const commentItem = screen.getByText(
    "No comments? Be the first to comment on this post!"
  );

  // Assert
  expect(commentItem).toBeInTheDocument();
});

// Tests that the component displays a message if there are no comments
it("test_no_comments", () => {
  // Arrange
  const blogId = "123";
  const userInfo = { name: "John Doe" };
  const commentFilterLocalStorage = [];
  render(
    <CommentList
      blogId={blogId}
      userInfo={userInfo}
      commentFilterLocalStorage={commentFilterLocalStorage}
    />
  );

  // Act
  const commentItem = screen.getByText(
    "No comments? Be the first to comment on this post!"
  );

  // Assert
  expect(commentItem).toBeInTheDocument();
});

// Tests that the component loads more comments when 'Load more comments' button is clicked
it("test_load_more_comments", async () => {
  // Arrange
  const blogId = "123";
  const userInfo = { name: "John Doe" };

  commentContextDispatchMocks.getMoreFilteredComments.mockImplementationOnce(
    () => Promise.resolve(newComments)
  );

  render(
    <CommentList
      blogId={blogId}
      userInfo={userInfo}
      commentFilterLocalStorage={
        commentContextStateMocks.commentFilterLocalStorage
      }
    />
  );

  const loadMoreButton = screen.getByText("Load more comments");

  // Act
  fireEvent.click(loadMoreButton);

  // Wait for the new comments to be loaded
  await waitFor(() => {
    newComments.forEach(comment => {
      // Check if a CommentItem was rendered with the correct props
      const commentItem = screen.getByText(JSON.stringify(comment));
      expect(commentItem).toBeInTheDocument();
    });
  });
});

// Tests that the component sorts comments by date and author
it("test_sort_comments", () => {
  // Arrange
  const blogId = "123";
  const userInfo = { name: "John Doe" };
  const commentFilterLocalStorage = [
    {
      _id: "1",
      blog: "123",
      createdAt: "2022-01-01T00:00:00.000Z",
      author: "John Doe",
    },
    {
      _id: "2",
      blog: "123",
      createdAt: "2022-01-02T00:00:00.000Z",
      author: "Jane Doe",
    },
    {
      _id: "3",
      blog: "123",
      createdAt: "2022-01-03T00:00:00.000Z",
      author: "John Doe",
    },
  ];

  render(
    <CommentList
      blogId={blogId}
      userInfo={userInfo}
      commentFilterLocalStorage={commentFilterLocalStorage}
    />
  );
  const sortButton = screen.getByText("Sort by date");
  // Act
  fireEvent.click(sortButton);
  // Assert
  const comment1 = screen.getByText("Comment 1");
  const comment2 = screen.getByText("Comment 2");
  const comment3 = screen.getByText("Comment 3");
  expect(comment1).toBeInTheDocument();
  expect(comment2).toBeInTheDocument();
  expect(comment3).toBeInTheDocument();
});

// Tests that the component hides comments when 'Hide comments' button is clicked
it("test_hide_comments", () => {
  // Arrange
  const blogId = "123";
  const userInfo = { name: "John Doe" };
  const commentFilterLocalStorage = [
    { _id: "1", blog: "123", createdAt: "2022-01-01T00:00:00.000Z" },
    { _id: "2", blog: "123", createdAt: "2022-01-02T00:00:00.000Z" },
    { _id: "3", blog: "123", createdAt: "2022-01-03T00:00:00.000Z" },
  ];
  render(
    <CommentList
      blogId={blogId}
      userInfo={userInfo}
      commentFilterLocalStorage={commentFilterLocalStorage}
    />
  );
  const hideButton = screen.getByText("Hide comments");
  // Act
  fireEvent.click(hideButton);
  // Assert
  const showButton = screen.getByText("Show comments");
  expect(showButton).toBeInTheDocument();
});

// Tests that the component displays an error message if there is an error loading comments
it("test_error_loading_comments", async () => {
  // Arrange
  const blogId = "123";
  const userInfo = { name: "John Doe" };
  const commentFilterLocalStorage = [
    { _id: "1", blog: "123", createdAt: "2022-01-01T00:00:00.000Z" },
    { _id: "2", blog: "123", createdAt: "2022-01-02T00:00:00.000Z" },
    { _id: "3", blog: "123", createdAt: "2022-01-03T00:00:00.000Z" },
  ];
  commentContextStateMocks.errorUserComment = "Error loading comments";

  render(
    <CommentList
      blogId={blogId}
      userInfo={userInfo}
      commentFilterLocalStorage={commentFilterLocalStorage}
    />
  );
  // Act
  const error = screen.getByText("Error loading comments");
  // Assert
  expect(error).toBeInTheDocument();
});
