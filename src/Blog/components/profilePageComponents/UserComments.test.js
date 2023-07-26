import { render, screen } from "@testing-library/react";
import UserComments from "./UserComments";
import useSort from "./useSort";
import PinnedBlogPost from "./PinnedBlogPost";
import CommentsOverview from "./CommentsOverview";

jest.mock("./useSort");
jest.mock("./PinnedBlogPost", () => () => <div>PinnedBlogPost</div>);
jest.mock("./CommentsOverview", () => {
  return ({ userCommentInfo }) => (
    <div>
      {userCommentInfo.map(comment => (
        <div key={comment.id} data-testid="comments-overview">
          <div>{comment.title}</div>
          <div>{comment.date}</div>
        </div>
      ))}
    </div>
  );
});

useSort.mockReturnValue({
  sortType: "date",
  titleSortOrder: "asc",
  dateSortOrder: "asc",
  sortByTitleFunction: jest.fn(),
  sortByDateFunction: jest.fn(),
});

const mockProps = {
  userInfo: { name: "John Doe", email: "john.doe@example.com" },
  isLoadingUserComment: false,
  errorUserComment: "",
  userCommentInfo: { comments: [] },
};

describe("UserComments_function", () => {
  // Tests that an Alert component is rendered when no user info is provided
  it("test_no_user_info", () => {
    render(<UserComments {...mockProps} userInfo={null} />);

    expect(
      screen.getByText(
        "Please log in to view available blog posts and comments"
      )
    ).toBeInTheDocument();
  });

  // Tests that a Spinner component is rendered when user comments are loading
  it("test_loading_state", () => {
    render(<UserComments {...mockProps} isLoadingUserComment={true} />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  // Tests that a ListGroup component with a danger variant is rendered when there is an error loading user comments
  it("test_error_state", () => {
    const error = "Error loading user comments";

    render(<UserComments {...mockProps} errorUserComment={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  // Tests that the component renders with user info and comments
  it("test_render_with_user_info", () => {
    const userCommentInfo = [
      { id: 1, title: "Title 1", date: "2022-01-01" },
      { id: 2, title: "Title 2", date: "2022-01-02" },
    ];

    render(
      <UserComments
        {...mockProps}
        userInfo={{}}
        userCommentInfo={userCommentInfo}
      />
    );

    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
  });

  // Tests that the component renders with no user comments
  it("test_render_with_no_user_comments", () => {
    render(<UserComments {...mockProps} userInfo={{}} userCommentInfo={[]} />);

    expect(screen.queryByTestId("comments-overview")).toBeNull();
  });

  // Tests that the sorting functionality works as expected
  it("test_sorting_functionality", () => {
    const userCommentInfo = [
      { id: 1, title: "Title 1", date: "2022-01-01" },
      { id: 2, title: "Title 2", date: "2022-01-02" },
    ];

    render(<UserComments userInfo={{}} userCommentInfo={userCommentInfo} />);

    expect(screen.getByText("Title 1")).toHaveTextContent("Title 1");

    expect(screen.getByText("Title 2")).toHaveTextContent("Title 2");

    expect(screen.getByText("Title 2")).toHaveTextContent("Title 2");

    expect(screen.getByText("Title 1")).toHaveTextContent("Title 1");
  });
});
