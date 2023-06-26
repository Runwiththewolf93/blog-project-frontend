import React, { useState, useEffect, useReducer } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useCommentContextState } from "../../store/commentContext";
import CommentSort from "./CommentSort";
import CommentItem from "./CommentItem";
import {
  setSortedComments,
  commentsReducer,
  initialState,
} from "./CommentsReducer";

// CommentList component
const CommentList = ({ blogId, userInfo }) => {
  const { commentFilterLocalStorage } = useCommentContextState();
  const [state, dispatch] = useReducer(commentsReducer, initialState);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const commentsPerBlogPost = commentFilterLocalStorage.filter(
      comment => comment.blog === blogId
    );
    dispatch(setSortedComments(commentsPerBlogPost));
  }, [commentFilterLocalStorage, blogId]);

  // Make a backend function to fetch remaining comments per blog post, but pay attention to totalVotes, createdAt or updatedAt states

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
          <CommentSort {...{ state, dispatch }} />
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
                {(index + 1) % 5 === 0 && (
                  <div className="d-flex">
                    <Button variant="light" className="w-50">
                      Load more comments
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowComments(!showComments)}
                      className="w-50"
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
