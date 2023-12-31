import { useMemo } from "react";
import { ListGroup } from "react-bootstrap";
import Vote from "../shared/Vote";
import CommentItemControls from "./CommentItemControls";

/**
 * Render a single comment item.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.comment - The comment object.
 * @param {Object} props.userInfo - The user information object.
 * @param {string} props.blogId - The blog ID.
 * @param {Object} props.state - The component state.
 * @param {Function} props.dispatch - The state dispatch function.
 * @returns {JSX.Element} The rendered comment item.
 */
// CommentItem component
const CommentItem = ({ comment, userInfo, blogId, state, dispatch }) => {
  const controlsProps = useMemo(
    () => ({
      comment,
      blogId,
      state,
      dispatch,
    }),
    [comment, blogId, state, dispatch]
  );

  return (
    <ListGroup.Item key={comment._id}>
      <div>
        <div className="d-flex align-items-center">
          <Vote type="comment" itemId={comment._id} userInfo={userInfo} />
          <div className="ms-3">
            <h5>{comment.user.name || userInfo.name}</h5>
            <p className="mb-1">{comment.comment}</p>
          </div>
        </div>
        <CommentItemControls {...controlsProps} />
      </div>
      <small>createdAt: {new Date(comment.createdAt).toLocaleString()}</small>
      <br />
      <small>updatedAt: {new Date(comment.updatedAt).toLocaleString()}</small>
    </ListGroup.Item>
  );
};

export default CommentItem;
