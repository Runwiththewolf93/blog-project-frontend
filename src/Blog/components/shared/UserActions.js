import ModalEdit from "../modals/ModalEdit";
import { Button } from "react-bootstrap";

const UserActions = ({
  userInfo,
  post,
  deleteBlogPost,
  commentInfo,
  deleteAllCommentsBlogPost,
}) => (
  <div className="d-flex align-items-center">
    {userInfo._id === post.user._id && (
      <>
        <ModalEdit post={post} />
        <Button
          variant="light"
          className="ms-3"
          onClick={() => {
            deleteBlogPost(post._id);
            if (commentInfo.blog === post._id) {
              deleteAllCommentsBlogPost(post._id);
            }
          }}
        >
          Delete Post
        </Button>
      </>
    )}
  </div>
);

export default UserActions;
