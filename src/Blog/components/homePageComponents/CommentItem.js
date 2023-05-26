import { ListGroup } from "react-bootstrap";
import Vote from "../shared/Vote";
import CommentItemControls from "./CommentItemControls";

const CommentItem = ({
  comment,
  loadingCommentId,
  errorCommentId,
  editCommentId,
  handleSaveComment,
  handleCancelEditComment,
  handleDismissError,
  handleEditComment,
  handleDeleteComment,
  userInfo,
  editedComment,
  setEditedComment,
  errorMessage,
}) => (
  <ListGroup.Item key={comment._id}>
    <div>
      <div className="d-flex align-items-center">
        <Vote type="comment" itemId={comment._id} userInfo={userInfo} />
        <div className="ms-3">
          <h5>{comment.user.name || userInfo.name}</h5>
          <p className="mb-1">{comment.comment}</p>
        </div>
      </div>
      <CommentItemControls
        {...{
          comment,
          loadingCommentId,
          errorCommentId,
          editCommentId,
          handleSaveComment,
          handleCancelEditComment,
          handleDismissError,
          handleEditComment,
          handleDeleteComment,
          editedComment,
          setEditedComment,
          errorMessage,
        }}
      />
    </div>
    <small>createdAt: {new Date(comment.createdAt).toLocaleString()}</small>
    <br />
    <small>updatedAt: {new Date(comment.updatedAt).toLocaleString()}</small>
  </ListGroup.Item>
);

export default CommentItem;
