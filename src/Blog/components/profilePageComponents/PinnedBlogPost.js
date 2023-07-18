import { Row, Col, Card } from "react-bootstrap";
import BlogPostWrapper from "../shared/BlogPostWrapper";
import Avatar from "../shared/Avatar";
import UserInfo from "../shared/UserInfo";
import PostButton from "../shared/PostButton";
import PostImages from "../shared/PostImages";
import {
  useBlogContextState,
  useBlogContextDispatch,
} from "../../store/blogContext";
import CustomListGroup from "../shared/CustomListGroup";
import { useMediaQuery } from "react-responsive";

/**
 * Renders a pinned blog post component.
 *
 * @returns {JSX.Element} - The pinned blog post component.
 */
const PinnedBlogPost = () => {
  const { blogPost } = useBlogContextState();
  const { resetBlogPost } = useBlogContextDispatch();

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-width: 1199px)",
  });

  if (!blogPost || Object.keys(blogPost).length === 0) {
    return (
      <CustomListGroup
        mb={3}
        text="No favorite blog post? Got to the home page to pick one out"
      />
    );
  }

  return (
    <div className="my-4">
      <h3>Pinned blog post:</h3>
      <BlogPostWrapper>
        <Row>
          <Col xs={isTabletOrMobileDevice ? 2 : 1} className="text-end">
            <Avatar src={blogPost.avatar} alt={`${blogPost.title} Image 1`} />
          </Col>
          <Col
            xs={isTabletOrMobileDevice ? 10 : 11}
            className="d-flex justify-content-between"
          >
            <div className="d-flex align-items-center">
              <UserInfo
                title={blogPost.title}
                date={blogPost.createdAt}
                name={blogPost.user.name}
              />
              <div className="mx-2" />
              <PostButton
                showPostOverlay={false}
                postId={blogPost._id}
                resetBlogPost={resetBlogPost}
              />
            </div>
          </Col>
        </Row>
        <Card.Text className="mt-3">{blogPost.content}</Card.Text>
        {blogPost.images && (
          <PostImages images={blogPost.images} title={blogPost.title} />
        )}
      </BlogPostWrapper>
    </div>
  );
};

export default PinnedBlogPost;
