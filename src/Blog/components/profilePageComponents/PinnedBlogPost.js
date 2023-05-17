import { Row, Col, Card } from "react-bootstrap";
import BlogPostWrapper from "../shared/BlogPostWrapper";
import Avatar from "../shared/Avatar";
import UserInfo from "../shared/UserInfo";
import PostButton from "../shared/PostButton";
import PostImages from "../shared/PostImages";

const PinnedBlogPost = ({ blogPost, getSingleBlogPost, resetBlogPost }) => (
  <>
    <h3>Pinned blog post:</h3>
    <BlogPostWrapper>
      <Row>
        <Col xs={1} className="text-end">
          <Avatar src={blogPost.avatar} alt={`${blogPost.title} Image 1`} />
        </Col>
        <Col xs={11} className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <UserInfo
              title={blogPost.title}
              date={blogPost.date}
              name={blogPost.user.name}
            />
            <PostButton
              showPostOverlay={false}
              getSingleBlogPost={getSingleBlogPost}
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
  </>
);

export default PinnedBlogPost;
