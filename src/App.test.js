// App.test.js file
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import App from "./App";

jest.mock("react-router-dom");

jest.mock("./Blog/store/appContext", () => ({
  useAppContextState: () => ({
    userInfo: {},
    users: [],
    success: false,
    error: null,
    wasLoggedOut: false,
    isLoadingReset: false,
    successMessage: "",
    errorReset: null,
  }),
  useAppContextDispatch: () => ({
    registerUser: jest.fn(),
    loginUser: jest.fn(),
    getAllUsers: jest.fn(),
    logoutUser: jest.fn(),
    resetUserError: jest.fn(),
    resetUserSuccess: jest.fn(),
    resetSuccessMessage: jest.fn(),
    resetErrorMessage: jest.fn(),
    updateUserPassword: jest.fn(),
    forgotUserPassword: jest.fn(),
    resetUserPassword: jest.fn(),
  }),
}));

jest.mock("./Blog/store/blogContext", () => ({
  useBlogContextState: () => ({
    userInfo: {},
    blogInfo: [],
    blogPost: {},
    errorBlog: null,
    isLoadingFilter: true,
    blogFilter: [],
    commentFilter: [],
    voteFilter: [],
    errorFilter: null,
  }),
  useBlogContextDispatch: () => ({
    logoutUser: jest.fn(),
    resetBlogPost: jest.fn(),
    resetBlogError: jest.fn(),
    resetFilteredBlogPosts: jest.fn(),
    resetErrorFilter: jest.fn(),
    getAllBlogPosts: jest.fn(),
    getFilteredBlogPosts: jest.fn(),
    getSingleBlogPost: jest.fn(),
    addBlogPost: jest.fn(),
    editBlogPost: jest.fn(),
    deleteBlogPost: jest.fn(),
    uploadBlogImages: jest.fn(),
    setPostUpdated: jest.fn(),
    scrollToBlogPost: jest.fn(),
    setPage: jest.fn(),
    setOrder: jest.fn(),
    setIsStateReset: jest.fn(),
  }),
}));

jest.mock("./Blog/store/commentContext", () => ({
  useCommentContextState: () => ({
    userInfo: {},
    isLoadingComment: true,
    commentFilter: [],
    commentInfo: [],
    blogCommentInfo: [],
    errorComment: null,
    isLoadingUserComment: true,
    userCommentInfo: [],
    errorUserComment: null,
  }),
  useCommentContextDispatch: () => ({
    getAllCommentsBlogPost: jest.fn(),
    getAllCommentsUser: jest.fn(),
    getAllComments: jest.fn(),
    addCommentBlogPost: jest.fn(),
    editCommentBlogPost: jest.fn(),
    deleteCommentBlogPost: jest.fn(),
    resetCommentError: jest.fn(),
    deleteAllCommentsBlogPost: jest.fn(),
    getMoreFilteredComments: jest.fn(),
  }),
}));

jest.mock("./Blog/store/voteContext", () => ({
  useVoteContextState: () => ({
    userInfo: {},
    blogFilter: [],
    commentFilter: [],
    voteFilter: [],
    isLoadingVote: true,
    voteInfo: [],
    errorVote: null,
  }),
  useVoteContextDispatch: () => ({
    getAllVotes: jest.fn(),
    updateBlogVoteCount: jest.fn(),
    updateCommentVoteCount: jest.fn(),
    deleteBlogVoteCount: jest.fn(),
    deleteCommentVoteCount: jest.fn(),
    deleteAllCommentVotesForBlogPost: jest.fn(),
  }),
}));

// Tests that the App component renders without errors.
it("renders app component", () => {
  render(<App />);
});

// Tests that all routes are rendered without errors.
it("renders all routes without errors", () => {
  const routePaths = [
    "/",
    "/profile-page",
    "/interests-page",
    "/info-page",
    "/reset-password",
    "/confirmation",
  ];

  routePaths.forEach(path => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
        <Route path="*">
          {({ location }) => {
            expect(location.pathname).toBe(path);
            return null;
          }}
        </Route>
      </MemoryRouter>
    );
  });
});
