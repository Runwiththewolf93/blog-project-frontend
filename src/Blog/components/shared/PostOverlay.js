import { useCallback } from "react";
import { Button, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import {
  useBlogContextState,
  useBlogContextDispatch,
} from "../../store/blogContext";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

/**
 * Renders a PostOverlay component.
 *
 * @param {string} postId - The ID of the post.
 * @return {ReactNode} The rendered PostOverlay component.
 */
// PostOverlay component
const PostOverlay = ({ postId }) => {
  const { isLoadingBlog, errorBlog } = useBlogContextState();
  const { getSingleBlogPost } = useBlogContextDispatch();

  const renderTooltip = useCallback(
    props => (
      <Tooltip id={`button-tooltip-${postId}`} {...props}>
        {errorBlog ? "Error: " + errorBlog : "Pin a post to your profile!"}
      </Tooltip>
    ),
    [postId, errorBlog]
  );

  const handleClick = useCallback(() => {
    getSingleBlogPost(postId);
  }, [getSingleBlogPost, postId]);

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button
        variant="light"
        className="ms-3"
        onClick={handleClick}
        disabled={isLoadingBlog}
      >
        {isLoadingBlog && <Spinner size="sm" data-testid="spinner" />}
        Pin Post
        {errorBlog && (
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-danger"
          />
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default PostOverlay;

PostOverlay.propTypes = {
  postId: PropTypes.string.isRequired,
};
