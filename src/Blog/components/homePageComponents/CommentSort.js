import { ListGroup, Button } from "react-bootstrap";
import useCommentSort from "./useCommentSort";

const CommentSort = ({ state, dispatch }) => {
  const { sortOrder, handleSortByCreatedAt, handleSortByUpdatedAt } =
    useCommentSort(state.sortedComments, dispatch);

  return (
    <ListGroup className="mb-2">
      <ListGroup.Item>
        <Button
          variant="secondary"
          onClick={handleSortByCreatedAt}
          className="my-2 mx-2"
        >
          Sort by createdAt {sortOrder}
        </Button>
        <Button
          variant="secondary"
          onClick={handleSortByUpdatedAt}
          className="my-2 mx-2"
        >
          Sort by updatedAt {sortOrder}
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default CommentSort;
