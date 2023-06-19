import { useEffect, useReducer } from "react";
import { ListGroup } from "react-bootstrap";
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

  useEffect(() => {
    const commentsPerBlogPost = commentFilterLocalStorage.filter(
      comment => comment.blog === blogId
    );
    // console.log("Filtered comments comment:", commentsPerBlogPost);
    dispatch(setSortedComments(commentsPerBlogPost));
  }, [commentFilterLocalStorage, blogId]);

  // console.log("commentFilter comment", commentFilterLocalStorage);

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
          {state.sortedComments.map(comment => (
            <CommentItem
              key={comment._id}
              {...{
                comment,
                userInfo,
                blogId,
                state,
                dispatch,
              }}
            />
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default CommentList;
