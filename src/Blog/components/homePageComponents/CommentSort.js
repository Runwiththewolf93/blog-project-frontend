import { ListGroup, Button } from "react-bootstrap";
import useCommentSort from "./useCommentSort";
import { useMediaQuery } from "react-responsive";

// CommentSort component
const CommentSort = ({ state, dispatch }) => {
  const {
    sortState,
    handleSortByCreatedAt,
    handleSortByUpdatedAt,
    handleSortByVotes,
  } = useCommentSort(state.sortedComments, dispatch);

  const getSortOrder = field => {
    return sortState.field === field ? sortState.order : null;
  };

  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <ListGroup className="mb-2">
      <ListGroup.Item
        className={isTabletOrMobileDevice && "d-flex justify-content-around"}
      >
        <Button
          variant="secondary"
          onClick={handleSortByCreatedAt}
          className="my-2 mx-2"
        >
          Created at {getSortOrder("createdAt")}
        </Button>
        <Button
          variant="secondary"
          onClick={handleSortByUpdatedAt}
          className="my-2 mx-2"
        >
          Updated at {getSortOrder("updatedAt")}
        </Button>
        <Button
          variant="secondary"
          onClick={handleSortByVotes}
          className="my-2 mx-2"
        >
          Total votes {getSortOrder("totalVotes")}
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default CommentSort;
