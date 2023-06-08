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

const CommentList = ({ blogId, userInfo }) => {
  const { commentInfo } = useCommentContextState();
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  useEffect(() => {
    const commentsPerBlogPost = commentInfo.filter(
      comment => comment.blog === blogId
    );
    dispatch(setSortedComments(commentsPerBlogPost));
  }, [commentInfo, blogId]);

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
