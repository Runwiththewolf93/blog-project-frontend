import React, { useState, useEffect, useReducer } from "react";
import { ListGroup, Button } from "react-bootstrap";
import {
  useCommentContextState,
  useCommentContextDispatch,
} from "../../store/commentContext";
import CommentSort from "./CommentSort";
import CommentItem from "./CommentItem";
import {
  setSortedComments,
  commentsReducer,
  initialState,
} from "./CommentsReducer";

// CommentList component
const CommentList = ({ blogId, userInfo }) => {
  const { hasMoreComments, commentFilterLocalStorage } =
    useCommentContextState();
  const { getMoreFilteredComments } = useCommentContextDispatch();
  const [state, dispatch] = useReducer(commentsReducer, initialState);
  const [showComments, setShowComments] = useState(true);
  const [sortState, setSortState] = useState({
    field: "createdAt",
    order: "asc",
  });

  useEffect(() => {
    const commentsPerBlogPost = commentFilterLocalStorage.filter(
      comment => comment.blog === blogId
    );
    dispatch(setSortedComments(commentsPerBlogPost));
  }, [commentFilterLocalStorage, blogId]);

  const handleLoadMoreComments = () => {
    // Invoke the getMoreFilteredComments function from commentContext
    const skip = state.sortedComments.length;
    const limit = 5;
    const { field: sort, order } = sortState;
    getMoreFilteredComments(blogId, skip, limit, sort, order);
  };

  // Check if hasMoreComments[blogId] is undefined or true
  const shouldLoadMoreComments =
    hasMoreComments[blogId] === undefined || hasMoreComments[blogId];

  console.log("hasMoreComments[blogId]", hasMoreComments[blogId]);
  console.log("showComments", showComments);
  console.log(
    "state.sortedComments.length > 0",
    state.sortedComments.length > 0
  );
  console.log("shouldLoadMoreComments", shouldLoadMoreComments);

  return (
    <>
      {state.sortedComments.length === 0 ? (
        <ListGroup>
          <ListGroup.Item>
            No comments? Be the first to comment on this post!
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <ListGroup>
          <CommentSort {...{ state, dispatch, sortState, setSortState }} />
          {showComments &&
            state.sortedComments.map((comment, index) => (
              <React.Fragment key={comment._id}>
                <CommentItem
                  {...{
                    comment,
                    userInfo,
                    blogId,
                    state,
                    dispatch,
                  }}
                />
                {index === state.sortedComments.length - 1 &&
                  shouldLoadMoreComments && (
                    <div className="d-flex">
                      {state.sortedComments.length % 5 === 0 && (
                        <Button
                          variant="light"
                          className="w-50"
                          onClick={handleLoadMoreComments}
                        >
                          Load more comments
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        onClick={() => setShowComments(!showComments)}
                        className={
                          state.sortedComments.length % 5 === 0
                            ? "w-50"
                            : "w-100"
                        }
                      >
                        Hide comments
                      </Button>
                    </div>
                  )}
              </React.Fragment>
            ))}
          {!showComments && (
            <Button
              variant="secondary"
              onClick={() => setShowComments(!showComments)}
            >
              Show comments
            </Button>
          )}
        </ListGroup>
      )}
    </>
  );
};

export default CommentList;
