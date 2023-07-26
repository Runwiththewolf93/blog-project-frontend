import { render, screen } from "@testing-library/react";
import Information from "./Information";
import { useVoteContextState } from "../../store/voteContext";
import {
  findMostPopularItem,
  truncateContent,
  countUserVoteObjects,
} from "../../utils/helper";

jest.mock("../../store/voteContext", () => ({
  useVoteContextState: jest.fn(() => ({
    voteInfo: [
      {
        _id: "vote1",
        user: "user1",
        blogPost: "blogPost1",
        comment: "comment1",
        vote: 1,
      },
      {
        _id: "vote2",
        user: "user2",
        blogPost: "blogPost2",
        comment: "comment2",
        vote: -1,
      },
    ],
  })),
}));

jest.mock("../../utils/helper", () => ({
  findMostPopularItem: jest.fn(() => ({
    title: "Most Popular Item",
    content: "This is the most popular item.",
    comment: "This is the most popular comment.",
    totalVotes: 10,
  })),
  truncateContent: jest.fn(content => content),
  countUserVoteObjects: jest.fn(() => ({
    user1: 5,
    user2: 10,
  })),
}));

describe("Information_function", () => {
  // Tests that mostPopularBlogPost is undefined when userBlogs is empty
  it("test_empty_user_blogs", () => {
    const userCommentInfo = [];
    const userInfo = {
      _id: "1",
      name: "John Doe",
    };
    const blogInfo = [];

    countUserVoteObjects.mockReturnValue({
      1: 10, // userVoteCount
      2: 5, // other user's vote count
    });

    render(
      <Information
        userCommentInfo={userCommentInfo}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(screen.getByText("Most Popular Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Most Popular Comment")).toBeInTheDocument();
    expect(screen.getByText("Interesting Fact")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Congratulations! You are our most prolific voter! Keep it up!"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "You are not our most prolific voter, but you are getting there. Keep it up!"
      )
    ).not.toBeInTheDocument();
  });

  // Tests that mostPopularComment is undefined when userCommentInfo is empty
  it("test_empty_user_comment_info", () => {
    const userCommentInfo = [];
    const userInfo = {
      _id: "1",
      name: "John Doe",
    };
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        user: {
          _id: "1",
          name: "John Doe",
        },
        totalVotes: 5,
      },
    ];

    render(
      <Information
        userCommentInfo={userCommentInfo}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(screen.getByText("Most Popular Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Most Popular Comment")).toBeInTheDocument();
    expect(screen.getByText("Interesting Fact")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Congratulations! You are our most prolific voter! Keep it up!"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "You are not our most prolific voter, but you are getting there. Keep it up!"
      )
    ).toBeInTheDocument();
  });

  // Tests that userVoteCounts is an empty object when voteInfo is empty
  it("test_empty_vote_info", () => {
    const userCommentInfo = [
      {
        _id: "1",
        comment: "Comment 1",
        user: {
          _id: "1",
          name: "John Doe",
        },
        totalVotes: 5,
      },
    ];
    const userInfo = {
      _id: "1",
      name: "John Doe",
    };
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        user: {
          _id: "1",
          name: "John Doe",
        },
        totalVotes: 5,
      },
    ];

    render(
      <Information
        userCommentInfo={userCommentInfo}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(screen.getByText("Most Popular Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Most Popular Comment")).toBeInTheDocument();
    expect(screen.getByText("Interesting Fact")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Congratulations! You are our most prolific voter! Keep it up!"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "You are not our most prolific voter, but you are getting there. Keep it up!"
      )
    ).toBeInTheDocument();
  });

  // Tests that userBlogs is undefined when blogInfo is undefined
  it("test_undefined_blog_info", () => {
    const userCommentInfo = [
      {
        _id: "1",
        comment: "Comment 1",
        user: {
          _id: "1",
          name: "John Doe",
        },
        totalVotes: 5,
      },
    ];
    const userInfo = {
      _id: "1",
      name: "John Doe",
    };

    render(
      <Information userCommentInfo={userCommentInfo} userInfo={userInfo} />
    );

    expect(screen.getByText("Most Popular Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Most Popular Comment")).toBeInTheDocument();
    expect(screen.getByText("Interesting Fact")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Congratulations! You are our most prolific voter! Keep it up!"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "You are not our most prolific voter, but you are getting there. Keep it up!"
      )
    ).toBeInTheDocument();
  });

  // Tests that mostPopularComment is undefined when userCommentInfo is undefined
  it("test_undefined_user_comment_info", () => {
    const userInfo = {
      _id: "1",
      name: "John Doe",
    };
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        user: {
          _id: "1",
          name: "John Doe",
        },
        totalVotes: 5,
      },
    ];

    render(<Information userInfo={userInfo} blogInfo={blogInfo} />);

    expect(screen.getByText("Most Popular Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Most Popular Comment")).toBeInTheDocument();
    expect(screen.getByText("Interesting Fact")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Congratulations! You are our most prolific voter! Keep it up!"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "You are not our most prolific voter, but you are getting there. Keep it up!"
      )
    ).toBeInTheDocument();
  });

  // Tests that prolificVoterMessage is undefined when voteInfo is undefined
  it("test_undefined_vote_info", () => {
    const userCommentInfo = [
      {
        _id: "1",
        comment: "Comment 1",
        user: {
          _id: "1",
          name: "John Doe",
        },
        totalVotes: 5,
      },
    ];
    const userInfo = {
      _id: "1",
      name: "John Doe",
    };
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        user: {
          _id: "1",
          name: "John Doe",
        },
        totalVotes: 5,
      },
    ];

    render(
      <Information
        userCommentInfo={userCommentInfo}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(screen.getByText("Most Popular Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Most Popular Comment")).toBeInTheDocument();
    expect(screen.getByText("Interesting Fact")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Congratulations! You are our most prolific voter! Keep it up!"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "You are not our most prolific voter, but you are getting there. Keep it up!"
      )
    ).toBeInTheDocument();
  });
});
