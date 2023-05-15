import { Button } from "react-bootstrap";
import PostOverlay from "./PostOverlay";

const PostButton = ({
  showPostOverlay,
  getSingleBlogPost,
  postId,
  resetBlogPost,
}) => {
  if (showPostOverlay) {
    return (
      <PostOverlay getSingleBlogPost={getSingleBlogPost} postId={postId} />
    );
  } else {
    return (
      <Button className="ms-3" variant="light" onClick={resetBlogPost}>
        Unpin Post
      </Button>
    );
  }
};

export default PostButton;
