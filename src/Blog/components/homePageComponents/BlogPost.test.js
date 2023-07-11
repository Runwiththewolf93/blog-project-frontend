import { render, screen } from "@testing-library/react";
import BlogPost from "./BlogPost";
import Vote from "../shared/Vote";
import Avatar from "../shared/Avatar";
import UserInfo from "../shared/UserInfo";
import PostButton from "../shared/PostButton";
import UserActions from "./UserActions";
import PostImages from "../shared/PostImages";
import { useMediaQuery } from "react-responsive";

jest.mock("../shared/Vote", () => jest.fn(() => null));
jest.mock("../shared/Avatar", () => jest.fn(() => null));
jest.mock("../shared/UserInfo", () => jest.fn(() => null));
jest.mock("../shared/PostButton", () => jest.fn(() => null));
jest.mock("./UserActions", () => jest.fn(() => null));
jest.mock("../shared/PostImages", () => jest.fn(() => null));

describe("BlogPost component", () => {
  const mockPost = {
    _id: "123",
    title: "Test Post",
    createdAt: "2023-07-07",
    content: "Test Content",
    user: {
      name: "Test User",
    },
    avatar: "image1",
    images: ["image1", "image2"],
  };

  const mockUserInfo = {
    _id: "456",
    name: "Test User",
    avatar: "image2",
  };

  beforeEach(() => {
    // clear the mock call info before each test
    Vote.mockClear();
    Avatar.mockClear();
    UserInfo.mockClear();
    PostButton.mockClear();
    UserActions.mockClear();
    PostImages.mockClear();
  });

  it("renders Vote component with correct props", () => {
    useMediaQuery.mockImplementation(() => false);

    render(<BlogPost post={mockPost} userInfo={mockUserInfo} />);

    expect(Vote).toHaveBeenCalledWith(
      {
        type: "blog",
        itemId: mockPost._id,
        userInfo: mockUserInfo,
      },
      expect.any(Object)
    );
  });

  it("renders Avatar component when isDesktopOrLaptop is true", () => {
    useMediaQuery.mockImplementation(
      query => query.query === "(min-width: 1280px)"
    );

    render(<BlogPost post={mockPost} userInfo={mockUserInfo} />);

    expect(Avatar).toHaveBeenCalledWith(
      {
        src: mockPost.avatar,
        alt: `${mockPost.title} Image 1`,
      },
      expect.any(Object)
    );
  });

  it("renders UserInfo component with correct props", () => {
    useMediaQuery.mockImplementation(() => false);

    render(<BlogPost post={mockPost} userInfo={mockUserInfo} />);

    expect(UserInfo).toHaveBeenCalledWith(
      {
        title: mockPost.title,
        date: mockPost.createdAt,
        name: mockPost.user.name,
      },
      expect.any(Object)
    );
  });

  it("renders PostButton component with correct props", () => {
    useMediaQuery.mockImplementation(() => false);

    render(<BlogPost post={mockPost} userInfo={mockUserInfo} />);

    expect(PostButton).toHaveBeenCalledWith(
      {
        showPostOverlay: true,
        postId: mockPost._id,
      },
      expect.any(Object)
    );
  });

  it("renders UserActions component with correct props", () => {
    useMediaQuery.mockImplementation(() => false);

    render(<BlogPost post={mockPost} userInfo={mockUserInfo} />);

    expect(UserActions).toHaveBeenCalledWith(
      {
        userInfo: mockUserInfo,
        post: mockPost,
      },
      expect.any(Object)
    );
  });

  it("renders PostImages component with correct props", () => {
    useMediaQuery.mockImplementation(() => false);

    render(<BlogPost post={mockPost} userInfo={mockUserInfo} />);

    expect(PostImages).toHaveBeenCalledWith(
      {
        images: mockPost.images,
        title: mockPost.title,
      },
      expect.any(Object)
    );
  });
});
