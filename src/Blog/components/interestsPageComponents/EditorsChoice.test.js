import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import EditorsChoice from "./EditorsChoice";
import { sortData } from "../../utils/helper";
import PostTypeSelector from "./PostTypeSelector";
import { useMediaQuery } from "react-responsive";
import CardComponent from "./CardComponent";

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

jest.mock("../../utils/helper", () => ({
  sortData: jest.fn(({ data, type }) => data),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

jest.mock("./PostTypeSelector", () => {
  return ({ setPostType }) => (
    <button onClick={() => setPostType("popular")}>popular</button>
  );
});

jest.mock("./CardComponent", () => {
  return ({ comment }) => (
    <p>
      {comment.text} {comment.blogPostTitle} {comment.blogPostImage}
    </p>
  );
});

describe("EditorsChoice_function", () => {
  // Tests that the component renders with sorted comments
  it("test_render_sorted_comments", () => {
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        images: ["image1.jpg", "image2.jpg"],
      },
      {
        _id: "2",
        title: "Blog 2",
        images: ["image3.jpg", "image4.jpg"],
      },
    ];
    const commentInfo = [
      {
        _id: "1",
        blog: "1",
        text: "Comment 1",
        likes: 10,
      },
      {
        _id: "2",
        blog: "2",
        text: "Comment 2",
        likes: 5,
      },
    ];
    const isLoadingBlog = false;
    const isLoadingComment = false;

    sortData.mockImplementationOnce(() => commentInfo);

    render(
      <EditorsChoice
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
      />
    );

    expect(screen.getByText("Comment 1")).toBeInTheDocument();
    expect(screen.getByText("Comment 2")).toBeInTheDocument();
  });

  // Tests that the component renders with the default post type
  it("test_render_default_post_type", () => {
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        images: ["image1.jpg", "image2.jpg"],
      },
      {
        _id: "2",
        title: "Blog 2",
        images: ["image3.jpg", "image4.jpg"],
      },
    ];
    const commentInfo = [
      {
        _id: "1",
        blog: "1",
        text: "Comment 1",
        likes: 10,
      },
      {
        _id: "2",
        blog: "2",
        text: "Comment 2",
        likes: 5,
      },
    ];
    const isLoadingBlog = false;
    const isLoadingComment = false;

    sortData.mockImplementationOnce(() => commentInfo);

    render(
      <EditorsChoice
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
      />
    );

    expect(screen.getByText("See some of our most")).toBeInTheDocument();
  });

  // Tests that the component renders with blog and comment information
  it("test_render_blog_and_comment_info", () => {
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        images: ["image1.jpg", "image2.jpg"],
      },
      {
        _id: "2",
        title: "Blog 2",
        images: ["image3.jpg", "image4.jpg"],
      },
    ];
    const commentInfo = [
      {
        _id: "1",
        blog: "1",
        text: "Comment 1",
        likes: 10,
      },
      {
        _id: "2",
        blog: "2",
        text: "Comment 2",
        likes: 5,
      },
    ];
    const isLoadingBlog = false;
    const isLoadingComment = false;

    sortData.mockImplementationOnce(() => commentInfo);

    render(
      <EditorsChoice
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
      />
    );

    expect(screen.getByText("Comment 1 Blog 1 image2.jpg")).toBeInTheDocument();
    expect(screen.getByText("Comment 2 Blog 2 image3.jpg")).toBeInTheDocument();
  });

  // Tests that the component renders a spinner when blog or comment information is loading
  it("test_render_spinner_when_loading", () => {
    const blogInfo = [];
    const commentInfo = [];
    const isLoadingBlog = true;
    const isLoadingComment = true;

    const { container } = render(
      <EditorsChoice
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
      />
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const spinner = container.querySelector(".spinner-border");
    expect(spinner).toBeInTheDocument();
  });

  // Tests that the component renders an alert when no comments have been added
  it("test_render_alert_when_no_comments", () => {
    const blogInfo = [];
    const commentInfo = [];
    const isLoadingBlog = false;
    const isLoadingComment = false;

    sortData.mockImplementationOnce(() => []);

    render(
      <EditorsChoice
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
      />
    );

    const alert = screen.getByRole("alert");
    expect(alert.textContent).toContain(
      "Looks like no comments have been added. Head over to the home page to add some!"
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  // Tests that the component sets the post type when the user selects a different post type
  it("test_set_post_type_on_select", async () => {
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        images: ["image1.jpg", "image2.jpg"],
      },
      {
        _id: "2",
        title: "Blog 2",
        images: ["image3.jpg", "image4.jpg"],
      },
    ];
    const commentInfo = [
      {
        _id: "1",
        blog: "1",
        text: "Comment 1",
        likes: 10,
      },
      {
        _id: "2",
        blog: "2",
        text: "Comment 2",
        likes: 5,
      },
    ];
    const isLoadingBlog = false;
    const isLoadingComment = false;

    sortData.mockImplementationOnce(() => commentInfo);

    render(
      <EditorsChoice
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
      />
    );

    const element = await screen.findByText("See some of our most");

    expect(element).toBeInTheDocument();
  });
});
