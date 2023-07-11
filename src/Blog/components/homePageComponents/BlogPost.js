import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Vote from "../shared/Vote";
import Avatar from "../shared/Avatar";
import UserInfo from "../shared/UserInfo";
import PostButton from "../shared/PostButton";
import UserActions from "./UserActions";
import PostImages from "../shared/PostImages";
import BlogPostWrapper from "../shared/BlogPostWrapper";
import { useMediaQuery } from "react-responsive";

/**
 * Renders a blog post component.
 *
 * @param {Object} post - The blog post object.
 * @param {Object} userInfo - The user information object.
 * @return {JSX.Element} The rendered blog post component.
 */
// BlogPost component
const BlogPost = ({ post, userInfo }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <BlogPostWrapper>
      <Row>
        <Col
          xs={isDesktopOrLaptop ? 1 : 2}
          className="d-flex justify-content-center align-items-center"
        >
          <Vote type="blog" itemId={post._id} userInfo={userInfo} />
        </Col>
        {isDesktopOrLaptop && (
          <Col xs={1} className="text-end">
            <Avatar src={post.avatar} alt={`${post.title} Image 1`} />
          </Col>
        )}
        <Col xs={10} className="d-flex justify-content-between">
          <div
            className={
              isTabletOrMobileDevice
                ? "d-flex align-items-center me-3"
                : "d-flex align-items-center"
            }
          >
            <UserInfo
              title={post.title}
              date={post.createdAt}
              name={post.user?.name}
            />
            <PostButton showPostOverlay={true} postId={post._id} />
          </div>
          <UserActions userInfo={userInfo} post={post} />
        </Col>
      </Row>
      <Card.Text className="mt-3">{post.content}</Card.Text>
      {post.images && (
        <PostImages images={post.images || []} title={post.title} />
      )}
    </BlogPostWrapper>
  );
};

export default BlogPost;
