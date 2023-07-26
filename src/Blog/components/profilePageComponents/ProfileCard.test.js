import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";
import useFetchHighestVotedBlogComments from "./useFetchHighestVotedBlogComments";
import { getLatestAvatar } from "../../utils/helper";
import { useMediaQuery } from "react-responsive";

jest.mock("./useFetchHighestVotedBlogComments", () => jest.fn());

useFetchHighestVotedBlogComments.mockImplementation(() => ({
  isLoadingComment: false,
  blogCommentInfo: [
    {
      _id: "1",
      comment: "This is a great blog post!",
      author: "John Doe",
    },
    {
      _id: "2",
      comment: "I really enjoyed reading this!",
      author: "Jane Doe",
    },
  ],
  errorComment: null,
}));

jest.mock("../../utils/helper", () => ({
  capitalizeName: jest.fn().mockImplementation(name => name),
  getLatestAvatar: jest.fn(),
  truncateContent: jest
    .fn()
    .mockImplementation((content, length) => content.slice(0, length)),
}));

getLatestAvatar.mockImplementation(() => {});

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

useMediaQuery.mockImplementation(() => true);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("ProfileCard_function", () => {
  // Tests that the profile card is rendered with all data
  it("test_render_profile_card_with_all_data", () => {
    const userProfile = {
      name: {
        first: "John",
        last: "Doe",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      email: "johndoe@example.com",
    };
    const userInfo = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const blogInfo = {
      title: "Test Blog",
      author: "John Doe",
      upvotes: 10,
    };
    const userCommentInfo = [
      {
        comment: "Test comment 1",
        createdAt: "2022-01-01T00:00:00.000Z",
      },
      {
        comment: "Test comment 2",
        createdAt: "2022-01-02T00:00:00.000Z",
      },
    ];
    const isLoadingUserComment = false;
    const errorUserComment = false;

    render(
      <ProfileCard
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
        userCommentInfo={userCommentInfo}
        isLoadingUserComment={isLoadingUserComment}
        errorUserComment={errorUserComment}
      />
    );

    const allElements = screen.getAllByText(/JohnDoe/i);
    expect(allElements[0]).toBeInTheDocument();
    expect(screen.getByText("Test comment 2")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Below are the comments of your highest upvoted blog post. Enjoy!"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("This is a great blog post!")).toBeInTheDocument();
    expect(
      screen.getByText("I really enjoyed reading this!")
    ).toBeInTheDocument();
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  // Tests that the profile card is rendered with minimum data
  it("test_render_profile_card_with_minimum_data", () => {
    const userProfile = {
      name: {
        first: "John",
        last: "Doe",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      email: "johndoe@example.com",
    };
    const userInfo = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const blogInfo = {
      title: "Test Blog",
      author: "John Doe",
      upvotes: 10,
    };
    const userCommentInfo = [];
    const isLoadingUserComment = false;
    const errorUserComment = false;

    useFetchHighestVotedBlogComments.mockImplementation(() => ({
      isLoadingComment: false,
      blogCommentInfo: [],
      errorComment: null,
    }));

    render(
      <ProfileCard
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
        userCommentInfo={userCommentInfo}
        isLoadingUserComment={isLoadingUserComment}
        errorUserComment={errorUserComment}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("You have no comments yet.")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Below are the comments of your highest upvoted blog post. Enjoy!"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  // Tests that the profile card is rendered with no comments
  it("test_render_profile_card_with_no_comments", () => {
    const userProfile = {
      name: {
        first: "John",
        last: "Doe",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      email: "johndoe@example.com",
    };
    const userInfo = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const blogInfo = {
      title: "Test Blog",
      author: "John Doe",
      upvotes: 10,
    };
    const userCommentInfo = [
      {
        comment: "Test comment 1",
        createdAt: "2022-01-01T00:00:00.000Z",
      },
      {
        comment: "Test comment 2",
        createdAt: "2022-01-02T00:00:00.000Z",
      },
    ];
    const isLoadingUserComment = false;
    const errorUserComment = false;

    useFetchHighestVotedBlogComments.mockImplementation(() => ({
      isLoadingComment: false,
      blogCommentInfo: [],
      errorComment: null,
    }));

    render(
      <ProfileCard
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
        userCommentInfo={[]}
        isLoadingUserComment={isLoadingUserComment}
        errorUserComment={errorUserComment}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("You have no comments yet.")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Below are the comments of your highest upvoted blog post. Enjoy!"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  // Tests that an error message is displayed when there is an error fetching comments
  it("test_handle_error_fetching_comments", () => {
    const userProfile = {
      name: {
        first: "John",
        last: "Doe",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      email: "johndoe@example.com",
    };
    const userInfo = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const blogInfo = {
      title: "Test Blog",
      author: "John Doe",
      upvotes: 10,
    };
    const userCommentInfo = [
      {
        comment: "Test comment 1",
        createdAt: "2022-01-01T00:00:00.000Z",
      },
      {
        comment: "Test comment 2",
        createdAt: "2022-01-02T00:00:00.000Z",
      },
    ];
    const isLoadingUserComment = false;
    const errorUserComment = true;

    render(
      <ProfileCard
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
        userCommentInfo={userCommentInfo}
        isLoadingUserComment={isLoadingUserComment}
        errorUserComment={errorUserComment}
      />
    );

    expect(screen.getByText("Error fetching comments")).toBeInTheDocument();
  });

  // Tests that a message is displayed when the user has no comments
  it("test_handle_no_user_comments", () => {
    const userProfile = {
      name: {
        first: "John",
        last: "Doe",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      email: "johndoe@example.com",
    };
    const userInfo = {
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const blogInfo = {
      title: "Test Blog",
      author: "John Doe",
      upvotes: 10,
    };
    const userCommentInfo = [];
    const isLoadingUserComment = false;
    const errorUserComment = false;

    useFetchHighestVotedBlogComments.mockImplementation(() => ({
      isLoadingComment: false,
      blogCommentInfo: [],
      errorComment: null,
    }));

    render(
      <ProfileCard
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
        userCommentInfo={userCommentInfo}
        isLoadingUserComment={isLoadingUserComment}
        errorUserComment={errorUserComment}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("You have no comments yet.")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Below are the comments of your highest upvoted blog post. Enjoy!"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("No comments yet.")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  // Tests that when there are no blog comments, the component renders the correct message
  it("test_no_blog_comments", () => {
    const blogInfo = {};
    const userCommentInfo = [];
    const isLoadingUserComment = false;
    const errorUserComment = false;
    const userInfo = {};
    const userProfile = {};

    useFetchHighestVotedBlogComments.mockImplementation(() => ({
      isLoadingComment: false,
      blogCommentInfo: [],
      errorComment: null,
    }));

    render(
      <ProfileCard
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
        userCommentInfo={userCommentInfo}
        isLoadingUserComment={isLoadingUserComment}
        errorUserComment={errorUserComment}
      />
    );

    const noCommentsMessage = screen.getByText("No comments yet.");
    expect(noCommentsMessage).toBeInTheDocument();
  });
});
