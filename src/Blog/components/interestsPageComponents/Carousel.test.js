import { render, screen, fireEvent } from "@testing-library/react";
import CarouselComponent from "./Carousel";
import { useMediaQuery } from "react-responsive";
import { truncateContent, sortData } from "../../utils/helper";

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

jest.mock("./PostTypeSelector", () => {
  return ({ setPostType }) => (
    <button onClick={() => setPostType("upvoted")}>PostTypeSelector</button>
  );
});

jest.mock("../../utils/helper", () => ({
  truncateContent: jest.fn((content, length) => content.slice(0, length)),
  sortData: jest.fn((data, type) => data),
}));

describe("CarouselComponent_function", () => {
  // Tests that the carousel component is rendered
  it("test_render_carousel", () => {
    const mockBlogInfo = [
      {
        _id: "1",
        title: "Test Post 1",
        content: "Test Content 1",
        user: { name: "Test User 1" },
        totalVotes: 10,
        date: new Date(),
      },
    ];

    sortData.mockImplementationOnce(() => mockBlogInfo);

    render(<CarouselComponent blogInfo={mockBlogInfo} isLoadingBlog={false} />);

    const carousel = screen.getByTestId("carousel");

    expect(carousel).toBeInTheDocument();
  });

  // Tests that the carousel rotates and displays the next image for each post
  it("test_carousel_rotates", () => {
    const blogInfo = [
      {
        _id: "1",
        title: "Test Post 1",
        content: "Test Content 1",
        user: { name: "Test User 1" },
        totalVotes: 10,
        date: new Date(),
        images: ["image1", "image2"],
      },
    ];

    sortData.mockImplementationOnce(() => blogInfo);

    render(<CarouselComponent blogInfo={blogInfo} isLoadingBlog={false} />);

    const carousel = screen.getByTestId("carousel");

    fireEvent.keyDown(carousel, { key: "ArrowRight" });

    expect(screen.getByAltText("Test Post 1")).toHaveAttribute("src", "image2");
  });

  // Tests that an alert is displayed when no blog posts have been added
  it("test_no_blog_posts_added", () => {
    sortData.mockImplementationOnce(() => []);

    render(<CarouselComponent blogInfo={[]} isLoadingBlog={false} />);

    const alert = screen.getByTestId("no-posts");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(
      "Looks like no blog posts have been added. Head over to the home page to add some!"
    );
  });

  // Tests that a spinner is displayed when the blog is loading
  it("test_blog_loading", () => {
    sortData.mockImplementationOnce(() => []);

    const { container } = render(
      <CarouselComponent blogInfo={[]} isLoadingBlog={true} />
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const spinner = container.querySelector(".spinner-border");

    expect(spinner).toBeInTheDocument();
  });

  // Tests that blog posts are sorted by total votes
  it("test_sort_blog_posts", async () => {
    const blogInfo = [
      {
        _id: "1",
        title: "Test Post 1",
        content: "Test Content 1",
        user: { name: "Test User 1" },
        totalVotes: 10,
        date: new Date(),
        images: ["image1", "image2"],
      },
      {
        _id: "2",
        title: "Test Post 2",
        content: "Test Content 2",
        user: { name: "Test User 2" },
        totalVotes: 5,
        date: new Date(),
        images: ["image1", "image2"],
      },
    ];

    sortData.mockImplementationOnce((data, type) => data);

    render(<CarouselComponent blogInfo={blogInfo} isLoadingBlog={false} />);

    const testPost1Elements = await screen.findAllByText("Test Post 1");
    expect(testPost1Elements).toHaveLength(2);

    const testPost2Elements = await screen.findAllByText("Test Post 2");
    expect(testPost2Elements).toHaveLength(1);

    fireEvent.click(screen.getByText("PostTypeSelector"));

    expect(sortData).toHaveBeenCalledWith(blogInfo, "upvoted");
  });

  // Tests that top posts are updated when blog info or post type changes
  it("test_update_top_posts", async () => {
    const blogInfo = [
      {
        _id: "1",
        title: "Test Post 1",
        content: "Test Content 1",
        user: { name: "Test User 1" },
        totalVotes: 10,
        date: new Date(),
        images: ["image1", "image2"],
      },
      {
        _id: "2",
        title: "Test Post 2",
        content: "Test Content 2",
        user: { name: "Test User 2" },
        totalVotes: 5,
        date: new Date(),
        images: ["image1", "image2"],
      },
    ];

    sortData.mockImplementationOnce((data, type) => data);

    const { rerender } = render(
      <CarouselComponent blogInfo={blogInfo} isLoadingBlog={false} />
    );

    const testPost1Elements = await screen.findAllByText("Test Post 1");
    expect(testPost1Elements).toHaveLength(2);

    const testPost2Elements = await screen.findAllByText("Test Post 2");
    expect(testPost2Elements).toHaveLength(1);

    const newBlogInfo = [
      {
        _id: "3",
        title: "Test Post 3",
        content: "Test Content 3",
        user: { name: "Test User 3" },
        totalVotes: 15,
        date: new Date(),
        images: ["image1", "image2"],
      },
    ];

    sortData.mockImplementationOnce((data, type) => data);

    rerender(
      <CarouselComponent blogInfo={newBlogInfo} isLoadingBlog={false} />
    );

    const testPost3Elements = await screen.findAllByText("Test Post 3");
    expect(testPost3Elements).toHaveLength(2);
    expect(screen.queryByText("Test Post 1")).not.toBeInTheDocument();
  });
});
