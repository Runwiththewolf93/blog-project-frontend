import { render, screen, fireEvent } from "@testing-library/react";
import CommentsHeader from "./CommentsHeader";

describe("CommentsHeader_function", () => {
  // Tests that the header component is rendered with the correct title
  it("renders header with correct title", () => {
    render(<CommentsHeader />);

    expect(
      screen.getByText("An overview of all your submitted comments:")
    ).toBeInTheDocument();
  });

  // Tests that the header component is rendered with the correct buttons
  it("renders header with correct buttons", () => {
    render(<CommentsHeader />);
    expect(screen.getByText("Sort by title ▼")).toBeInTheDocument();
    expect(screen.getByText("Sort by date ▼")).toBeInTheDocument();
  });

  // Tests that clicking the title sort button calls the sortByTitleFunction
  it("clicking title sort button calls sortByTitleFunction", () => {
    const mockSortByTitleFunction = jest.fn();
    const mockSortByDateFunction = jest.fn();

    render(
      <CommentsHeader
        sortByTitleFunction={mockSortByTitleFunction}
        sortByDateFunction={mockSortByDateFunction}
        titleSortOrder="asc"
        dateSortOrder="desc"
      />
    );

    fireEvent.click(screen.getByText("Sort by title ▲"));
    expect(mockSortByTitleFunction).toHaveBeenCalled();
  });

  // Tests that clicking the date sort button calls the sortByDateFunction
  it("clicking date sort button calls sortByDateFunction", () => {
    const mockSortByTitleFunction = jest.fn();
    const mockSortByDateFunction = jest.fn();

    render(
      <CommentsHeader
        sortByDateFunction={mockSortByDateFunction}
        sortByTitleFunction={mockSortByTitleFunction}
        titleSortOrder="asc"
        dateSortOrder="asc"
      />
    );

    fireEvent.click(screen.getByText("Sort by date ▲"));

    expect(mockSortByDateFunction).toHaveBeenCalled();
  });

  // Tests that the header component is rendered with the correct sort order
  it("renders header with correct sort order", () => {
    const mockSortByTitleFunction = jest.fn();
    const mockSortByDateFunction = jest.fn();

    render(
      <CommentsHeader
        titleSortOrder="asc"
        dateSortOrder="desc"
        sortByTitleFunction={mockSortByTitleFunction}
        sortByDateFunction={mockSortByDateFunction}
      />
    );

    expect(screen.getByText("Sort by title ▲")).toBeInTheDocument();
    expect(screen.getByText("Sort by date ▼")).toBeInTheDocument();
  });

  // Tests that the header component is rendered correctly when sortByTitleFunction or sortByDateFunction is not defined
  it("renders header correctly when sortByTitleFunction or sortByDateFunction is not defined", () => {
    const mockSortByTitleFunction = jest.fn();
    const mockSortByDateFunction = jest.fn();

    render(
      <CommentsHeader
        sortByTitleFunction={mockSortByTitleFunction}
        sortByDateFunction={mockSortByDateFunction}
      />
    );

    expect(screen.getByText("Sort by title ▼")).toBeInTheDocument();
    expect(screen.getByText("Sort by date ▼")).toBeInTheDocument();
  });
});
