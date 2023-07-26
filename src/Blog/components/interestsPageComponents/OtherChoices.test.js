import { render, screen } from "@testing-library/react";
import OtherChoices from "./OtherChoices";

describe("OtherChoices_function", () => {
  // Tests that the component renders with all props provided
  it("test_render_component_with_all_props_provided", () => {
    // Arrange
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        images: ["image1.jpg"],
        totalVotes: 10,
      },
    ];
    const commentInfo = [{ _id: "1", blog: "1", comment: "Comment 1" }];
    const voteInfo = [{ _id: "1", post: "1", vote: 1 }];
    const isLoadingBlog = false;
    const isLoadingComment = false;
    const isLoadingVote = false;

    // Act
    render(
      <OtherChoices
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        voteInfo={voteInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
        isLoadingVote={isLoadingVote}
      />
    );

    // Assert
    expect(
      screen.getByText("Other topics that might interest you...")
    ).toBeInTheDocument();
  });

  // Tests that the component renders with empty props
  it("test_render_component_with_empty_props", () => {
    // Arrange
    const blogInfo = [];
    const commentInfo = [];
    const voteInfo = [];
    const isLoadingBlog = false;
    const isLoadingComment = false;
    const isLoadingVote = false;

    // Act
    render(
      <OtherChoices
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        voteInfo={voteInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
        isLoadingVote={isLoadingVote}
      />
    );

    // Assert
    expect(
      screen.getByText("Other topics that might interest you...")
    ).toBeInTheDocument();
  });

  // Tests that the component renders with only one of the props provided
  it("test_render_component_with_one_prop_provided", () => {
    // Arrange
    const blogInfo = [];
    const commentInfo = [];
    const voteInfo = [];
    const isLoadingBlog = false;
    const isLoadingComment = false;
    const isLoadingVote = true;

    // Act
    const { container } = render(
      <OtherChoices
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        voteInfo={voteInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
        isLoadingVote={isLoadingVote}
      />
    );

    // Assert
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const spinner = container.querySelector(".spinner-border");
    expect(spinner).toBeInTheDocument();
  });

  // Tests that the component renders with all props provided but empty arrays
  it("test_render_component_with_all_props_provided_but_empty_arrays", () => {
    // Arrange
    const blogInfo = [];
    const commentInfo = [];
    const voteInfo = [];
    const isLoadingBlog = false;
    const isLoadingComment = false;
    const isLoadingVote = false;

    // Act
    render(
      <OtherChoices
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        voteInfo={voteInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
        isLoadingVote={isLoadingVote}
      />
    );

    // Assert
    expect(
      screen.getByText("Other topics that might interest you...")
    ).toBeInTheDocument();
  });

  // Tests that the component renders with all props provided but with one empty array
  it("test_render_component_with_all_props_provided_but_one_empty_array", () => {
    // Arrange
    const blogInfo = [
      {
        _id: "1",
        title: "Blog 1",
        content: "Content 1",
        images: ["image1.jpg"],
        totalVotes: 10,
      },
    ];
    const commentInfo = [];
    const voteInfo = [];
    const isLoadingBlog = false;
    const isLoadingComment = false;
    const isLoadingVote = false;

    // Act
    render(
      <OtherChoices
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        voteInfo={voteInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
        isLoadingVote={isLoadingVote}
      />
    );

    // Assert
    expect(
      screen.getByText("Other topics that might interest you...")
    ).toBeInTheDocument();
  });

  // Tests that the component renders with all categories having no data available
  it("test_render_component_with_all_categories_having_no_data_available", () => {
    // Arrange
    const blogInfo = [];
    const commentInfo = [];
    const voteInfo = [];
    const isLoadingBlog = false;
    const isLoadingComment = false;
    const isLoadingVote = false;

    // Act
    render(
      <OtherChoices
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        voteInfo={voteInfo}
        isLoadingBlog={isLoadingBlog}
        isLoadingComment={isLoadingComment}
        isLoadingVote={isLoadingVote}
      />
    );

    // Assert
    expect(
      screen.getByText("Other topics that might interest you...")
    ).toBeInTheDocument();
    const noDataElements = screen.getAllByTestId("no-data");
    expect(noDataElements.length).toBeGreaterThan(0);
  });
});
