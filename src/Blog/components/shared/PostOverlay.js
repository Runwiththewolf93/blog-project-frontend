import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAppContextDispatch } from "../../store/appContext";

const PostOverlay = ({ postId }) => {
  const { getSingleBlogPost } = useAppContextDispatch();

  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      Pin a post to your profile!
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button
        variant="light"
        className="ms-3"
        onClick={() => getSingleBlogPost(postId)}
      >
        Pin Post
      </Button>
    </OverlayTrigger>
  );
};

export default PostOverlay;
