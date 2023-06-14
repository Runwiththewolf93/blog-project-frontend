import { useEffect, useReducer } from "react";
import { ListGroup } from "react-bootstrap";
import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import CommentSort from "./CommentSort";
import CommentItem from "./CommentItem";
import {
  setSortedComments,
  commentsReducer,
  initialState,
} from "./CommentsReducer";

const CommentList = ({ blogId, userInfo }) => {
  const { commentFilter } = useBlogContextState();
  const { commentInfo } = useCommentContextState();
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  useEffect(() => {
    const commentsPerBlogPost = commentFilter?.filter(
      comment => comment.blog === blogId
    );
    dispatch(setSortedComments(commentsPerBlogPost));
  }, [commentFilter, blogId]);

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
