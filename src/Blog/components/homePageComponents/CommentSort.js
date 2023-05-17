import { ListGroup, Button } from "react-bootstrap";
import { useState } from "react";

const CommentSort = ({ sortedComments, setSortedComments }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortByCreatedAt = () => {
    const sortedByCreatedAt = [...sortedComments].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setSortedComments(sortedByCreatedAt);
    // toggle sort order
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByUpdatedAt = () => {
    const sortedByUpdatedAt = [...sortedComments].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      } else {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });
    setSortedComments(sortedByUpdatedAt);
    // toggle sort order
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

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
