import { render, screen } from "@testing-library/react";
import PinnedBlogPost from "./PinnedBlogPost";
import {
  useBlogContextState,
  useBlogContextDispatch,
} from "../../store/blogContext";
import { useMediaQuery } from "react-responsive";
import CustomListGroup from "../shared/CustomListGroup";
import BlogPostWrapper from "../shared/BlogPostWrapper";
import UserInfo from "../shared/UserInfo";
import PostButton from "../shared/PostButton";
import PostImages from "../shared/PostImages";
import Avatar from "../shared/Avatar";

jest.mock("../../store/blogContext", () => ({
  useBlogContextState: jest.fn(() => ({
    blogPost: {
      _id: "1",
      title: "My First Blog Post",
      content: "This is my first blog post. I'm excited to share it with you!",
      user: {
        name: "John Doe",
      },
      createdAt: "2023-03-08T12:00:00.000Z",
      images: [
        {
          url: "https://example.com/blog-post-1.jpg",
        },
        {
          url: "https://example.com/blog-post-2.jpg",
        },
      ],
    },
  })),
  useBlogContextDispatch: jest.fn(() => ({ resetBlogPost: jest.fn() })),
}));

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

jest.mock("../shared/CustomListGroup", () => {
  return ({ text }) => <div>{text}</div>;
});
jest.mock("../shared/BlogPostWrapper", () => {
  return ({ children }) => <div>{children}</div>;
});
jest.mock("../shared/UserInfo", () => () => <div>UserInfo</div>);
jest.mock("../shared/PostButton", () => () => <div>PostButton</div>);
jest.mock("../shared/PostImages", () => () => <div>PostImages</div>);
jest.mock("../shared/Avatar", () => {
  return ({ alt }) => <img alt={alt} />;
});

describe("PinnedBlogPost_function", () => {
  // Tests that the pinned blog post component renders with valid data
  it("test_render_with_valid_data", () => {
    render(<PinnedBlogPost />);
    expect(screen.getByText("Pinned blog post:")).toBeInTheDocument();
  });

  // Tests that the pinned blog post component renders with empty data
  it("test_render_with_empty_data", () => {
    useBlogContextState.mockReturnValue({ blogPost: {} });

    render(<PinnedBlogPost />);
    expect(
      screen.getByText(
        "No favorite blog post? Got to the home page to pick one out"
      )
    ).toBeInTheDocument();
  });

  // Tests that the pinned blog post component renders with invalid data
  it("test_render_with_invalid_data", () => {
    useBlogContextState.mockReturnValue({ blogPost: null });

    render(<PinnedBlogPost />);
    expect(
      screen.getByText(
        "No favorite blog post? Got to the home page to pick one out"
      )
    ).toBeInTheDocument();
  });

  // Tests that the pinned blog post component renders with images
  it("test_render_with_images", () => {
    render(<PinnedBlogPost />);

    expect(
      screen.getByAltText("My First Blog Post Image 1")
    ).toBeInTheDocument();
  });

  // Tests that the pinned blog post component renders with long content
  it("test_render_with_long_content", () => {
    useBlogContextState.mockReturnValue({
      blogPost: {
        _id: "1",
        avatar: "avatar.png",
        title: "Test Title",
        createdAt: "2022-02-22T22:22:22.000Z",
        user: {
          name: "Test User",
        },
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien.",
      },
    });

    render(<PinnedBlogPost />);
    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien. Sed euismod, diam vel bibendum bibendum, velit sapien bibendum nunc, vel bibendum sapien sapien vel sapien."
      )
    ).toBeInTheDocument();
  });

  // Tests that the pinned blog post component renders with short content
  it("test_render_with_short_content", () => {
    useBlogContextState.mockReturnValue({
      blogPost: {
        _id: "1",
        avatar: "avatar.png",
        title: "Test Title",
        createdAt: "2022-02-22T22:22:22.000Z",
        user: {
          name: "Test User",
        },
        content: "Test Content",
      },
    });

    render(<PinnedBlogPost />);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
