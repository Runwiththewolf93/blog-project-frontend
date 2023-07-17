import { render, screen } from "@testing-library/react";
import { useAppContextState } from "../../store/appContext";
import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";
import useIntersectionObserver from "./useIntersectionObserver";
import Body from "./Body";

jest.mock("../../store/appContext", () => ({
  useAppContextState: jest.fn(),
}));

jest.mock("../../store/blogContext", () => ({
  useBlogContextState: jest.fn(),
}));

jest.mock("../../store/commentContext", () => ({
  useCommentContextState: jest.fn(),
}));

jest.mock("../../store/voteContext", () => ({
  useVoteContextState: jest.fn(),
}));

jest.mock("./useIntersectionObserver", () => ({
  __esModule: true,
  default: jest.fn(),
}));

useAppContextState.mockReturnValue({
  wasLoggedOut: false,
});

useBlogContextState.mockReturnValue({
  isLoadingFilter: false,
  errorFilter: null,
  hasMore: true,
  page: 1,
});

useCommentContextState.mockReturnValue({
  commentFilterLocalStorage: [
    {
      _id: "648b3aa8385bb271bfb930bc",
      comment: "Let's leave a comment!",
      user: {
        _id: "642da876a185c06e961be81a",
        name: "Stevan Zivanovic",
        email: "stevan@gmail.com",
      },
      blog: "648881e8882cb2ec8cc7948a",
      totalVotes: 1,
      createdAt: "2023-06-15T16:22:00.531Z",
      updatedAt: "2023-06-20T10:09:02.408Z",
      __v: 0,
    },
    {
      _id: "6495a67bb26ac3dfa9001c44",
      comment: "Hello everyone, this is my first comment!",
      user: {
        _id: "642da876a185c06e961be81a",
        name: "Stevan Zivanovic",
        email: "stevan@gmail.com",
      },
      blog: "6495a60db26ac3dfa9001c37",
      totalVotes: 1,
      createdAt: "2023-06-23T14:04:43.104Z",
      updatedAt: "2023-06-23T14:10:32.891Z",
      __v: 0,
    },
  ],
});

useVoteContextState.mockReturnValue({
  voteFilterLocalStorage: [
    {
      _id: "6478ab12298ad818f1673e0c",
      user: "642da876a185c06e961be81a",
      post: "64774060045c4f08f20147b2",
      vote: -1,
      createdAt: "2023-06-01T14:28:34.666Z",
      updatedAt: "2023-06-01T14:28:34.666Z",
      __v: 0,
    },
    {
      _id: "6480bd6e16d52e2411b1c7ee",
      user: "642da876a185c06e961be81a",
      post: "6480b9b216d52e2411b1c7b3",
      vote: 0,
      createdAt: "2023-06-07T17:25:02.371Z",
      updatedAt: "2023-06-09T10:09:34.022Z",
      __v: 0,
    },
  ],
});

useIntersectionObserver.mockReturnValue([{ current: null }, false]);

jest.mock("./BodyComponents", () => ({
  ErrorComponent: props => <div data-testid="error">{props.message}</div>,
  LoadingComponent: () => <div data-testid="loading" />,
  NoPosts: () => <div data-testid="noposts" />,
}));
jest.mock("./BlogSections", () => props => (
  <div data-testid="blogsections">{JSON.stringify(props)}</div>
));
jest.mock("./BlogPosts", () => props => (
  <div data-testid="blogposts">{JSON.stringify(props)}</div>
));
jest.mock("./ButtonOverlay", () => () => <div data-testid="scrolltotop" />);

const userInfo = {
  _id: "642da876a185c06e961be81a",
  name: "Stevan Zivanovic",
  email: "stevan@gmail.com",
};
const blogDataToShow = [
  {
    _id: "6495a60db26ac3dfa9001c37",
    title: "Let's add whatever post",
    avatar: "https://www.mocks.com",
    content: "Does this work properly still?",
    images: [
      "https://www.mocks.com",
      "https://www.mocks.com",
      "https://www.mocks.com",
    ],
    user: {
      _id: "642da876a185c06e961be81a",
      name: "Stevan Zivanovic",
      email: "stevan@gmail.com",
    },
    totalVotes: 0,
    createdAt: "2023-06-23T14:02:53.815Z",
    updatedAt: "2023-06-23T14:29:46.718Z",
    __v: 0,
  },
  {
    _id: "648881e8882cb2ec8cc7948a",
    title: "Blog Post 15",
    avatar: "https://www.mocks.com",
    content:
      "This is Blog Post 15, just running tests! Lets see what will break first, your spirit, or your body!",
    images: [
      "https://www.mocks.com",
      "https://www.mocks.com",
      "https://www.mocks.com",
    ],
    user: {
      _id: "642da876a185c06e961be81a",
      name: "Stevan Zivanovic",
      email: "stevan@gmail.com",
    },
    totalVotes: 0,
    createdAt: "2023-06-13T14:49:12.766Z",
    updatedAt: "2023-06-20T09:54:32.082Z",
    __v: 0,
  },
];
const isFiltering = true;

describe("Body_function", () => {
  // Tests that the component renders without crashing
  it("renders without crashing", () => {
    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );
  });

  // Tests that the correct error message is rendered if there is an error in the filter
  it("renders error message if there is an error in the filter", () => {
    useBlogContextState.mockReturnValue({
      errorFilter: "Error in filter",
    });

    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(screen.getByText("Error in filter")).toBeInTheDocument();
  });

  // Tests that the correct loading component is rendered if the data is still loading
  it("renders loading component if data is still loading", () => {
    useBlogContextState.mockReturnValue({
      isLoadingFilter: true,
      page: 1,
    });

    useCommentContextState.mockReturnValue({
      commentFilterLocalStorage: null,
    });

    useVoteContextState.mockReturnValue({
      voteFilterLocalStorage: null,
    });

    const blogDataToShow = null;

    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  // Tests that the correct message is rendered if there are no posts to show
  it("renders no posts message if there are no posts to show", () => {
    useBlogContextState.mockReturnValue({
      isLoadingFilter: false,
    });
    const blogDataToShow = [];
    const isFiltering = false;

    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(screen.getByTestId("noposts")).toBeInTheDocument();
  });

  // Tests that the correct components are rendered if there are posts to show
  it("renders correct components if there are posts to show", () => {
    useBlogContextState.mockReturnValue({
      isLoadingFilter: false,
      hasMore: true,
      page: 1,
    });

    const isFiltering = false;

    useCommentContextState.mockReturnValue({
      commentFilterLocalStorage: [],
    });
    useVoteContextState.mockReturnValue({
      voteFilterLocalStorage: [],
    });

    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(screen.getByTestId("scrolltotop")).toBeInTheDocument();
  });

  // Tests that the overflow style of the body is set correctly depending on whether the loader is visible or not
  it("sets overflow style of body correctly depending on whether loader is visible or not", () => {
    useIntersectionObserver.mockReturnValue([{ current: null }, true]);

    const { container } = render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(container.firstChild).toHaveStyle("overflow: hidden");
  });

  // Tests that the Body function renders the NoPosts component when there are no posts to show and the user is not filtering
  it("test_renders_correct_components_no_posts", () => {
    const blogDataToShow = [];
    const isFiltering = false;

    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(screen.getByTestId("noposts")).toBeInTheDocument();
  });

  // Tests that the Body function renders the correct components when there are no posts to show and the data is not loading
  it("test_renders_correct_components_no_posts_not_loading", () => {
    useCommentContextState.mockReturnValue({
      commentFilterLocalStorage: [],
    });
    useVoteContextState.mockReturnValue({
      voteFilterLocalStorage: [],
    });
    const blogDataToShow = [];
    const isFiltering = false;

    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(screen.getByTestId("noposts")).toBeInTheDocument();
  });

  // Tests that the Body function renders the correct loading component when the data is still loading and the page is not 1
  it("test_renders_correct_loading_component_page_not_1", () => {
    useBlogContextState.mockReturnValue({
      isLoadingFilter: true,
      page: 2,
      hasMore: true,
    });

    render(
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
