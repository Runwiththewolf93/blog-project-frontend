import React, { useState, useEffect, useReducer } from "react";
import { ListGroup, Button, Alert } from "react-bootstrap";
import { useBlogContextDispatch } from "../../store/blogContext";
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
  const { scrollToBlogPost } = useBlogContextDispatch();
  const {
    hasMoreComments,
    commentFilterLocalStorage,
    isLoadingUserComment,
    errorUserComment,
  } = useCommentContextState();
  const { getMoreFilteredComments } = useCommentContextDispatch();
  const [state, dispatch] = useReducer(commentsReducer, initialState);
  const [showComments, setShowComments] = useState(true);
  const [sortState, setSortState] = useState({
    field: "createdAt",
    order: "asc",
  });

  useEffect(() => {
    console.log("blogId", blogId);
    console.log(
      "commentFilterLocalStorage",
      commentFilterLocalStorage.map(c => c._id)
    );
    // Initialize the sortedComments state with the existing comments for this blog post
    const commentsPerBlogPost = commentFilterLocalStorage.filter(
      comment => comment.blog === blogId
    );
    console.log(
      "commentsPerBlogPost",
      commentsPerBlogPost.map(c => c._id)
    );
    dispatch(setSortedComments(commentsPerBlogPost));
    // eslint-disable-next-line
  }, [blogId]); // Only re-run the useEffect hook when the blogId changes

  // handleLoadMoreComments function activated on click
  const handleLoadMoreComments = () => {
    console.log(
      "state.sortedComments",
      state.sortedComments.map(c => c._id)
    );
    const limit = 5;
    getMoreFilteredComments(
      blogId,
      state.sortedComments.map(c => c._id),
      limit,
      sortState.field,
      sortState.order
    ).then(newComments => {
      console.log("newComments:", newComments);
      // Append the new comments to the sortedComments state
      dispatch(setSortedComments([...state.sortedComments, ...newComments]));
    });
  };

  // Check if hasMoreComments[blogId] is undefined or true
  const shouldLoadMoreComments =
    hasMoreComments[blogId] === undefined || hasMoreComments[blogId];

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
                          disabled={!isLoadingUserComment}
                        >
                          {!isLoadingUserComment
                            ? "Loading comments..."
                            : "Load more comments"}
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShowComments(!showComments);
                          scrollToBlogPost(blogId);
                        }}
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
          {errorUserComment && <Alert>{errorUserComment}</Alert>}
        </ListGroup>
      )}
    </>
  );
};

export default CommentList;

// test out some more tomorrow, see about votes what can be done.
// console.log("hasMoreComments[blogId]", hasMoreComments[blogId]);
// console.log("showComments", showComments);
// console.log(
//   "state.sortedComments.length > 0",
//   state.sortedComments.length > 0
// );
// console.log("shouldLoadMoreComments", shouldLoadMoreComments);
