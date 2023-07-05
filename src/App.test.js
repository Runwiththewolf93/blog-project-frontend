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

// Delay due to complexity of HomePage component
jest.setTimeout(20000);

// Tests that HomePage component is rendered when the path is '/'
it("renders_homepage_on_root_path", async () => {
  render(<App />, { wrapper: MemoryRouter });
  const homePageElement = await screen.findByTestId(
    "homepage",
    {},
    { timeout: 20000 }
  );
  expect(homePageElement).toBeInTheDocument();
});

// // Tests that ProfilePage component is rendered when the path is '/profile-page'
// it("renders_profile_page", () => {
//   render(<App />, { wrapper: MemoryRouter });
//   expect(screen.getByText("Profile Page")).toBeInTheDocument();
// });

// // Tests that InterestsPage component is rendered when the path is '/interests-page'
// it("test_interests_page_rendered", () => {
//   render(<App />, { wrapper: MemoryRouter });
//   expect(screen.getByText("Interests Page")).toBeInTheDocument();
// });

// // Tests that the InformationPage component is rendered when the path is '/information-page'
// it("test_information_page_rendered", () => {
//   render(<App />, { wrapper: MemoryRouter });
//   expect(screen.getByText("Information Page")).toBeInTheDocument();
// });

// // Tests that the ResetPasswordPage component is rendered when the path is '/reset-password/:token?'
// it("renders_reset_password_page_component", () => {
//   render(
//     <MemoryRouter initialEntries={["/reset-password"]}>
//       <App />
//     </MemoryRouter>
//   );
//   expect(
//     screen.getByRole("heading", { name: "Reset Password" })
//   ).toBeInTheDocument();
// });

// // Tests that the ConfirmationPage component is rendered when the path is '/confirmation'
// it("renders_confirmation_page", () => {
//   render(
//     <MemoryRouter initialEntries={["/confirmation"]}>
//       <App />
//     </MemoryRouter>
//   );
//   expect(screen.getByText("Check your email!")).toBeInTheDocument();
//   expect(
//     screen.getByText(
//       "We've sent you an email with a link to reset your password. If you\n            don't see it, check your spam folder."
//     )
//   ).toBeInTheDocument();
// });

// // Tests that the ProtectedRoute component is rendered when the path is '/profile-page'
// it("test_behaviour", () => {
//   render(<App />, { wrapper: MemoryRouter });
//   expect(screen.getByText("Profile Page")).toBeInTheDocument();
// });

// // Tests that the ProtectedRoute component is rendered when the path is '/interests-page'
// it("test_behaviour", () => {
//   render(<App />, { wrapper: MemoryRouter });
//   expect(screen.getByText("Interests Page")).toBeInTheDocument();
// });

// // Tests that the ProtectedRoute component is rendered when the path is '/information-page'
// it("renders_protected_route_component", () => {
//   render(<App />, { wrapper: MemoryRouter });
//   expect(screen.getByText("Protected Route")).toBeInTheDocument();
// });

// // Tests that the App component renders the ConfirmationPage component with custom heading and paragraph props when the path is '/confirmation'
// it("renders_confirmation_page_with_custom_props", () => {
//   const { getByText } = render(
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/confirmation"
//           element={
//             <ConfirmationPage
//               heading="Check your email!"
//               paragraph="We've sent you an email with a link to reset your password. If you don't see it, check your spam folder."
//             />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
//   expect(getByText("Check your email!")).toBeInTheDocument();
//   expect(
//     getByText(
//       "We've sent you an email with a link to reset your password. If you don't see it, check your spam folder."
//     )
//   ).toBeInTheDocument();
// });

// // Tests that all data is fetched when the user is logged in.
// it("fetches_all_data_when_user_is_logged_in", async () => {
//   const userInfo = { username: "testuser" };
//   const getAllBlogPosts = jest.fn();
//   const getAllComments = jest.fn();
//   const getAllVotes = jest.fn();
//   const useAppContextState = jest.fn(() => ({ userInfo }));
//   const useBlogContextDispatch = jest.fn(() => ({ getAllBlogPosts }));
//   const useCommentContextDispatch = jest.fn(() => ({ getAllComments }));
//   const useVoteContextDispatch = jest.fn(() => ({ getAllVotes }));
//   jest.mock("./Blog/store/appContext", () => ({ useAppContextState }));
//   jest.mock("./Blog/store/blogContext", () => ({ useBlogContextDispatch }));
//   jest.mock("./Blog/store/commentContext", () => ({
//     useCommentContextDispatch,
//   }));
//   jest.mock("./Blog/store/voteContext", () => ({ useVoteContextDispatch }));
//   render(<App />);
//   await waitFor(() => expect(getAllBlogPosts).toHaveBeenCalled());
//   await waitFor(() => expect(getAllComments).toHaveBeenCalled());
//   await waitFor(() => expect(getAllVotes).toHaveBeenCalled());
// });

// // Tests that no data is fetched when the user is not logged in.
// it("test_does_not_fetch_data_when_user_not_logged_in", () => {
//   const { getByText } = render(<App />);
//   expect(getByText("Home Page")).toBeInTheDocument();
//   expect(getAllBlogPosts).not.toHaveBeenCalled();
//   expect(getAllComments).not.toHaveBeenCalled();
//   expect(getAllVotes).not.toHaveBeenCalled();
// });

// // Tests that no component is rendered when the path is not defined.
// it("test_does_not_render_any_component_when_path_not_defined", () => {
//   render(<App />, { wrapper: MemoryRouter });
//   expect(screen.queryByText("Home Page")).toBeInTheDocument();
//   expect(screen.queryByText("Profile Page")).not.toBeInTheDocument();
//   expect(screen.queryByText("Interests Page")).not.toBeInTheDocument();
//   expect(screen.queryByText("Information Page")).not.toBeInTheDocument();
//   expect(screen.queryByText("Reset Password Page")).not.toBeInTheDocument();
//   expect(screen.queryByText("Check your email!")).not.toBeInTheDocument();
// });

// // Tests that no component is rendered when an invalid path is provided.
// it("test_invalid_path", () => {
//   render(<App />, { wrapper: MemoryRouter, initialEntries: ["/invalid-path"] });
//   expect(screen.queryByText(/home page/i)).not.toBeInTheDocument();
//   expect(screen.queryByText(/profile page/i)).not.toBeInTheDocument();
//   expect(screen.queryByText(/interests page/i)).not.toBeInTheDocument();
//   expect(screen.queryByText(/information page/i)).not.toBeInTheDocument();
//   expect(screen.queryByText(/reset password/i)).not.toBeInTheDocument();
//   expect(screen.queryByText(/check your email!/i)).not.toBeInTheDocument();
// });

// // Tests that the correct component is rendered when a token is provided in the path.
// it("renders_correct_component_with_token", () => {
//   const { getByText } = render(
//     <MemoryRouter initialEntries={["/reset-password/token"]}>
//       {" "}
//       // replace 'token' with a valid token
//       <App />
//     </MemoryRouter>
//   );
//   expect(getByText("Reset Password")).toBeInTheDocument();
// });

// // Tests that when user info is available but getAllBlogPosts, getAllComments, and getAllVotes are undefined, no data is fetched
// it('test_does_not_fetch_data_when_getAllBlogPosts_getAllComments_and_getAllVotes_are_undefined', () => {
//   const mockGetAllBlogPosts = jest.fn();
//   const mockGetAllComments = jest.fn();
//   const mockGetAllVotes = jest.fn();
//   const mockUseAppContextState = jest.fn().mockReturnValue({ userInfo: {} });
//   const mockUseBlogContextDispatch = jest.fn().mockReturnValue({ getAllBlogPosts: undefined });
//   const mockUseCommentContextDispatch = jest.fn().mockReturnValue({ getAllComments: undefined });
//   const mockUseVoteContextDispatch = jest.fn().mockReturnValue({ getAllVotes: undefined });
//   jest.mock('./Blog/store/appContext', () => ({ useAppContextState: mockUseAppContextState }));
//   jest.mock('./Blog/store/blogContext', () => ({ useBlogContextDispatch: mockUseBlogContextDispatch }));
//   jest.mock('./Blog/store/commentContext', () => ({ useCommentContextDispatch: mockUseCommentContextDispatch }));
//   jest.mock('./Blog/store/voteContext', () => ({ useVoteContextDispatch: mockUseVoteContextDispatch }));
//   require('./App');
//   expect(mockGetAllBlogPosts).not.toHaveBeenCalled();
//   expect(mockGetAllComments).not.toHaveBeenCalled();
//   expect(mockGetAllVotes).not.toHaveBeenCalled();
// });

// // Tests that blog data is not fetched when user info is not available
// it('test_does_not_fetch_blog_data_when_user_info_is_not_available', () => {
//   const getAllBlogPosts = jest.fn();
//   const getAllComments = jest.fn();
//   const getAllVotes = jest.fn();
//   const userInfo = null;
//   useAppContextState.mockReturnValue({ userInfo });
//   useBlogContextDispatch.mockReturnValue({ getAllBlogPosts });
//   useCommentContextDispatch.mockReturnValue({ getAllComments });
//   useVoteContextDispatch.mockReturnValue({ getAllVotes });
//   render(<App />);
//   expect(getAllBlogPosts).not.toHaveBeenCalled();
//   expect(getAllComments).not.toHaveBeenCalled();
//   expect(getAllVotes).not.toHaveBeenCalled();
// });

// // Tests that comment and vote data is not fetched when user info is not available
// it('test_does_not_fetch_comment_and_vote_data_when_user_info_is_not_available', () => {
//   const getAllBlogPosts = jest.fn();
//   const getAllComments = jest.fn();
//   const getAllVotes = jest.fn();
//   const userInfo = null;
//   useAppContextState.mockReturnValue({ userInfo });
//   useBlogContextDispatch.mockReturnValue({ getAllBlogPosts });
//   useCommentContextDispatch.mockReturnValue({ getAllComments });
//   useVoteContextDispatch.mockReturnValue({ getAllVotes });
//   render(<App />);
//   expect(getAllBlogPosts).not.toHaveBeenCalled();
//   expect(getAllComments).not.toHaveBeenCalled();
//   expect(getAllVotes).not.toHaveBeenCalled();
// });

// // Tests that no data is fetched when user info is not available
// it('test_does_not_fetch_data_when_user_info_not_available', () => {
//   const mockGetAllBlogPosts = jest.fn();
//   const mockGetAllComments = jest.fn();
//   const mockGetAllVotes = jest.fn();
//   const mockUseAppContextState = jest.spyOn(appContext, 'useAppContextState');
//   mockUseAppContextState.mockReturnValue({ userInfo: null });
//   const mockUseBlogContextDispatch = jest.spyOn(blogContext, 'useBlogContextDispatch');
//   mockUseBlogContextDispatch.mockReturnValue({ getAllBlogPosts: mockGetAllBlogPosts });
//   const mockUseCommentContextDispatch = jest.spyOn(commentContext, 'useCommentContextDispatch');
//   mockUseCommentContextDispatch.mockReturnValue({ getAllComments: mockGetAllComments });
//   const mockUseVoteContextDispatch = jest.spyOn(voteContext, 'useVoteContextDispatch');
//   mockUseVoteContextDispatch.mockReturnValue({ getAllVotes: mockGetAllVotes });

//   render(<App />);

//   expect(mockGetAllBlogPosts).not.toHaveBeenCalled();
//   expect(mockGetAllComments).not.toHaveBeenCalled();
//   expect(mockGetAllVotes).not.toHaveBeenCalled();

//   mockUseAppContextState.mockRestore();
//   mockUseBlogContextDispatch.mockRestore();
//   mockUseCommentContextDispatch.mockRestore();
//   mockUseVoteContextDispatch.mockRestore();
// });

// Tests that all blog, comment, and vote data is fetched when user info is available
// it('test_fetch_all_data_when_user_info_available', async () => {
//   const userInfo = { name: 'John Doe' };
//   const getAllBlogPosts = jest.fn();
//   const getAllComments = jest.fn();
//   const getAllVotes = jest.fn();
//   const useAppContextState = jest.fn(() => ({ userInfo }));
//   const useBlogContextDispatch = jest.fn(() => ({ getAllBlogPosts }));
//   const useCommentContextDispatch = jest.fn(() => ({ getAllComments }));
//   const useVoteContextDispatch = jest.fn(() => ({ getAllVotes }));
//   jest.mock('./Blog/store/appContext', () => ({ useAppContextState }));
//   jest.mock('./Blog/store/blogContext', () => ({ useBlogContextDispatch }));
//   jest.mock('./Blog/store/commentContext', () => ({ useCommentContextDispatch }));
//   jest.mock('./Blog/store/voteContext', () => ({ useVoteContextDispatch }));
//   const { default: App } = await import('./App');
//   render(<App />);
//   expect(getAllBlogPosts).toHaveBeenCalledTimes(1);
//   expect(getAllComments).toHaveBeenCalledTimes(1);
//   expect(getAllVotes).toHaveBeenCalledTimes(1);
// });
