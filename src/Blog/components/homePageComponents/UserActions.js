import { useState } from "react";
import ModalEdit from "../modals/ModalEdit";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useBlogContextDispatch } from "../../store/blogContext";
import { useCommentContextDispatch } from "../../store/commentContext";
import { useVoteContextDispatch } from "../../store/voteContext";

/**
 * Renders the UserActions component.
 *
 * @param {Object} userInfo - The user information.
 * @param {Object} post - The post information.
 * @return {JSX.Element} The rendered UserActions component.
 */
// UserActions component
const UserActions = ({ userInfo, post }) => {
  const { deleteBlogPost } = useBlogContextDispatch();
  const { deleteAllCommentsBlogPost } = useCommentContextDispatch();
  const { deleteBlogVoteCount, deleteAllCommentVotesForBlogPost } =
    useVoteContextDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteAllCommentVotesForBlogPost(post._id);
      await deleteAllCommentsBlogPost(post._id);
      await deleteBlogVoteCount(post._id);
      await deleteBlogPost(post._id);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      {error}
    </Tooltip>
  );

  return (
    <div className="d-flex align-items-center">
      {userInfo._id === post.user._id && (
        <>
          <ModalEdit post={post} />
          {error ? (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <span className="d-inline-block" data-testid="error-overlay">
                <Button
                  variant="light"
                  className="ms-3"
                  disabled={isLoading}
                  onClick={deletePost}
                >
                  {isLoading ? "Deleting..." : "Delete Post"}
                </Button>
              </span>
            </OverlayTrigger>
          ) : (
            <Button
              variant="light"
              className="ms-3"
              disabled={isLoading}
              onClick={deletePost}
            >
              {isLoading ? "Deleting..." : "Delete Post"}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default UserActions;
