import { render, screen } from "@testing-library/react";
import CommentsList from "./CommentsList";
import UserComment from "./UserComment";
import CustomListGroup from "../shared/CustomListGroup";
import useSortedComments from "./useSortedComments";

jest.mock("./UserComment", () =>
  jest.fn(({ comment }) => <div>{comment.title}</div>)
);
jest.mock("../shared/CustomListGroup", () =>
  jest.fn(() => <div>CustomListGroup</div>)
);
jest.mock("./useSortedComments", () =>
  jest.fn(() => [
    { _id: 1, title: "Comment 1", date: "2022-01-01" },
    { _id: 2, title: "Comment 2", date: "2022-01-02" },
    { _id: 3, title: "Comment 3", date: "2022-01-03" },
  ])
);

describe("CommentsList_function", () => {
  // Tests that the function renders a list of comments when there are comments to display
  it("test_renders_comments", () => {
    const userCommentInfo = [
      {
        _id: "1",
        title: "Comment 1",
        date: "2022-01-01",
        content: "This is comment 1",
      },
      {
        _id: "2",
        title: "Comment 2",
        date: "2022-01-02",
        content: "This is comment 2",
      },
    ];
    const sortType = "date";
    const titleSortOrder = "asc";
    const dateSortOrder = "desc";

    render(
      <CommentsList
        userCommentInfo={userCommentInfo}
        sortType={sortType}
        titleSortOrder={titleSortOrder}
        dateSortOrder={dateSortOrder}
      />
    );

    // Check that the comments are rendered
    expect(screen.getByText("Comment 1")).toBeInTheDocument();
    expect(screen.getByText("Comment 2")).toBeInTheDocument();
  });

  // Tests that the function renders a custom list group when there are no comments to display
  it("test_renders_custom_list_group", () => {
    const userCommentInfo = [];
    const sortType = "date";
    const titleSortOrder = "asc";
    const dateSortOrder = "desc";

    useSortedComments.mockReturnValue([]);

    render(
      <CommentsList
        userCommentInfo={userCommentInfo}
        sortType={sortType}
        titleSortOrder={titleSortOrder}
        dateSortOrder={dateSortOrder}
      />
    );

    expect(screen.getByText("CustomListGroup")).toBeInTheDocument();
  });
});
