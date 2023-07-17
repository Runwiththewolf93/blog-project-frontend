import { render, screen } from "@testing-library/react";
import BlogPosts from "./BlogPosts";

jest.mock("./BlogPost", () => {
  return function DummyBlogPost(props) {
    return <div data-testid="blog-post">{JSON.stringify(props)}</div>;
  };
});

jest.mock("./CommentForm", () => {
  return function DummyCommentForm(props) {
    return <div data-testid="comment-form">{JSON.stringify(props)}</div>;
  };
});

jest.mock("./CommentList", () => {
  return function DummyCommentList(props) {
    return <div data-testid="comment-list">{JSON.stringify(props)}</div>;
  };
});

describe("BlogPosts_function", () => {
  // Tests if the function renders all components with correct props
  it("renders the BlogPost, CommentForm, and CommentList components with the correct props", () => {
    const blogDataToShow = [
      { _id: "1", title: "Post 1" },
      // Add more blog posts as needed
    ];
    const userInfo = { name: "John Doe" };

    render(<BlogPosts blogDataToShow={blogDataToShow} userInfo={userInfo} />);

    blogDataToShow.forEach(post => {
      const blogPost = screen.getByTestId("blog-post");
      expect(blogPost.textContent).toBe(JSON.stringify({ post, userInfo }));

      const commentForm = screen.getByTestId("comment-form");
      expect(commentForm.textContent).toBe(
        JSON.stringify({ blogId: post._id })
      );

      const commentList = screen.getByTestId("comment-list");
      expect(commentList.textContent).toBe(
        JSON.stringify({ blogId: post._id, userInfo })
      );
    });
  });

  // Tests that the function renders the correct number of blog posts
  it("renders the correct number of blog posts", () => {
    const blogDataToShow = [
      {
        _id: 1,
        title: "Test Blog Post 1",
      },
      {
        _id: 2,
        title: "Test Blog Post 2",
      },
    ];
    const userInfo = {
      name: "Test User",
      email: "testuser@example.com",
    };

    render(<BlogPosts blogDataToShow={blogDataToShow} userInfo={userInfo} />);

    expect(screen.getAllByTestId("blog-post")).toHaveLength(
      blogDataToShow.length
    );
  });

  // Tests that the function returns null if blogDataToShow is empty
  it("returns null if blogDataToShow is empty", () => {
    const blogDataToShow = [];
    const userInfo = {
      name: "Test User",
      email: "testuser@example.com",
    };

    const { container } = render(
      <BlogPosts blogDataToShow={blogDataToShow} userInfo={userInfo} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("assigns correct keys to each blog post", () => {
    const blogDataToShow = [
      {
        _id: 1,
        title: "Test Blog Post 1",
      },
      {
        _id: 2,
        title: "Test Blog Post 2",
      },
    ];
    const userInfo = { name: "Test User", email: "testuser@example.com" };

    render(<BlogPosts blogDataToShow={blogDataToShow} userInfo={userInfo} />);

    blogDataToShow.forEach(post => {
      const postDiv = screen.getByTestId(`post-${post._id}`);
      expect(postDiv).toBeInTheDocument();
    });
  });
});
