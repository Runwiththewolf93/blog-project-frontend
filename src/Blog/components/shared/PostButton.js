import { Button } from "react-bootstrap";
import PostOverlay from "./PostOverlay";

/**
 * Creates a PostButton component.
 *
 * @param {boolean} showPostOverlay - A boolean indicating whether to show the post overlay.
 * @param {string} postId - The ID of the post.
 * @param {Function} resetBlogPost - A function to reset the blog post.
 * @return {JSX.Element} The rendered PostButton component.
 */
// PostButton component
const PostButton = ({ showPostOverlay, postId, resetBlogPost }) => {
  if (showPostOverlay) {
    return <PostOverlay postId={postId} data-testid="post-overlay" />;
  } else {
    return (
      <Button variant="light" onClick={() => resetBlogPost && resetBlogPost()}>
        Unpin Post
      </Button>
    );
  }
};

export default PostButton;
