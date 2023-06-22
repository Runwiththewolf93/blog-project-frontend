import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const CommentsHeader = ({
  sortByTitleFunction,
  sortByDateFunction,
  titleSortOrder,
  dateSortOrder,
}) => {
  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <div
      className={`d-flex mb-3 ${
        isTabletOrMobileDevice
          ? "flex-column"
          : "justify-content-between align-items-center"
      }`}
    >
      <h3 className={`mt-3 ${isTabletOrMobileDevice && "text-center"}`}>
        An overview of all your submitted comments:
      </h3>
      <div className="mt-3 d-flex justify-content-around">
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
};

export default CommentsHeader;
