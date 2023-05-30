import { Button } from "react-bootstrap";

const CommentsHeader = ({
  sortByTitleFunction,
  sortByDateFunction,
  titleSortOrder,
  dateSortOrder,
}) => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h3 className="mt-3">An overview of all your submitted comments:</h3>
    <div className="mt-3">
      <Button
        variant="link"
        onClick={sortByTitleFunction}
        aria-label={`Sort by title ${
          titleSortOrder === "asc" ? "ascending" : "descending"
        }`}
      >
        Sort by title {titleSortOrder === "asc" ? "▲" : "▼"}
      </Button>
      <Button
        variant="link"
        onClick={sortByDateFunction}
        aria-label={`Sort by date ${
          dateSortOrder === "asc" ? "ascending" : "descending"
        }`}
      >
        Sort by date {dateSortOrder === "asc" ? "▲" : "▼"}
      </Button>
    </div>
  </div>
);

export default CommentsHeader;
