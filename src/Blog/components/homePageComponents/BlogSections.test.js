/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import BlogSections from "./BlogSections";
import { useMediaQuery } from "react-responsive";

let blogContextMocks;

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

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

describe("BlogSections_function", () => {
  // Tests that the blog sections are rendered with correct header and list items
  it("test_render_blog_sections", () => {
    const blogDataToShow = [
      {
        _id: "1",
        title: "Title 1",
        content: "Content 1",
      },
      {
        _id: "2",
        title: "Title 2",
        content: "Content 2",
      },
    ];
    render(<BlogSections blogDataToShow={blogDataToShow} />);
    expect(screen.getByText("Blog Sections")).toBeInTheDocument();
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
  });

  // Tests that the blog sections are rendered with correct title length
  it("test_render_blog_sections_title_length", () => {
    const blogDataToShow = [
      {
        _id: "1",
        title: "Title with more than 20 characters",
        content: "Content 1",
      },
      {
        _id: "2",
        title: "Small Title",
        content: "Content 2",
      },
    ];

    render(<BlogSections blogDataToShow={blogDataToShow} />);

    expect(screen.getByText("Title with more than...")).toBeInTheDocument();
    expect(screen.getByText("Small Title")).toBeInTheDocument();
  });

  // Tests that the blog sections are rendered with correct styles
  it("test_render_blog_sections_styles", () => {
    // Mock the return value of the useMediaQuery hook
    useMediaQuery.mockReturnValue(true);

    const blogDataToShow = [
      {
        _id: "1",
        title: "Title 1",
        content: "Content 1",
      },
      {
        _id: "2",
        title: "Title 2",
        content: "Content 2",
      },
    ];

    render(<BlogSections blogDataToShow={blogDataToShow} />);

    expect(screen.getByText("Blog Sections")).toHaveClass("fw-bold", "fs-3");
    expect(screen.getByText("Title 1")).toHaveClass("fw-bold", "fs-5");
    expect(screen.getByText("Title 2")).toHaveClass("fw-bold", "fs-5");
  });

  // Tests that the blog sections are not rendered when blogDataToShow is an empty array
  it("test_render_empty_blog_sections", () => {
    const blogDataToShow = [];

    render(<BlogSections blogDataToShow={blogDataToShow} />);

    expect(screen.queryAllByTestId("blog-section")).toHaveLength(0);
  });

  // Tests that the blog sections are not rendered when blogDataToShow is not an array
  it("test_render_invalid_blog_sections", () => {
    const blogDataToShow = {};
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { container } = render(
      <BlogSections blogDataToShow={blogDataToShow} />
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Invalid prop: blogDataToShow should be an array")
    );
    expect(container.firstChild).toBeNull();

    consoleSpy.mockRestore();
  });

  // Tests that the blog sections are rendered with an ellipsis when post.title is an empty string
  it("test_render_blog_sections_empty_title", () => {
    const blogDataToShow = [
      {
        _id: "1",
        title: "",
        content: "Content 1",
      },
    ];
    render(<BlogSections blogDataToShow={blogDataToShow} />);
    expect(screen.getByText("...")).toBeInTheDocument();
  });
});
