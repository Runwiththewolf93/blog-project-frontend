import React from "react";
import { Card, Image, Row, Col, Button } from "react-bootstrap";
import placeholderImage from "../images/placeholder-image.png";
import PostOverlay from "./PostOverlay";
import ModalEdit from "./modals/ModalEdit";

const BlogPost = ({
  post,
  userInfo,
  deleteBlogPost,
  getSingleBlogPost,
  showPostOverlay,
  resetBlogPost,
}) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={1}>
            <Image
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
              src={post.avatar || placeholderImage}
              alt={`${post.title} Image 1`}
              fluid
              rounded
            />
          </Col>
          <Col xs={11} className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {post.date.slice(0, 10)}
                </Card.Subtitle>
              </div>
              {showPostOverlay ? (
                <PostOverlay
                  getSingleBlogPost={getSingleBlogPost}
                  postId={post._id}
                />
              ) : (
                <Button
                  className="ms-3 mb-1"
                  variant="light"
                  onClick={resetBlogPost}
                >
                  Unpin Post
                </Button>
              )}
            </div>
            <div className="d-flex align-items-center">
              {userInfo._id === post.user._id && (
                <>
                  <ModalEdit post={post} />
                  <Button
                    variant="light"
                    className="ms-3"
                    onClick={() => deleteBlogPost(post._id)}
                  >
                    Delete Post
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
        <Card.Text className="mt-3">{post.content}</Card.Text>
        {post.images && (
          <Row>
            {post.images.map((image, idx) => (
              <Col key={idx} xs={12} md={4} className="text-center">
                <Image
                  src={image || placeholderImage}
                  alt={`${post.title} Image ${idx + 2}`}
                  fluid
                  rounded
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default BlogPost;
