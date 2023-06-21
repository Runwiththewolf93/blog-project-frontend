import { Button } from "react-bootstrap";
import PostOverlay from "./PostOverlay";

const PostButton = ({ showPostOverlay, postId, resetBlogPost }) => {
  if (showPostOverlay) {
    return <PostOverlay postId={postId} />;
  } else {
    return (
      <Button variant="light" onClick={() => resetBlogPost && resetBlogPost()}>
        Unpin Post
      </Button>
    );
  }
};

export default PostButton;
