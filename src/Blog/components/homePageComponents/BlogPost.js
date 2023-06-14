import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Vote from "../shared/Vote";
import Avatar from "../shared/Avatar";
import UserInfo from "../shared/UserInfo";
import PostButton from "../shared/PostButton";
import UserActions from "./UserActions";
import PostImages from "../shared/PostImages";
import BlogPostWrapper from "../shared/BlogPostWrapper";

const BlogPost = ({ post, userInfo }) => {
  return (
    <BlogPostWrapper>
      <Row>
        <Col
          xs={1}
          className="d-flex justify-content-center align-items-center"
        >
          <Vote type="blog" itemId={post._id} userInfo={userInfo} />
        </Col>
        <Col xs={1} className="text-end">
          <Avatar src={post.avatar} alt={`${post.title} Image 1`} />
        </Col>
        <Col xs={10} className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <UserInfo
              title={post.title}
              date={post.createdAt}
              name={post.user.name}
            />
            <PostButton showPostOverlay={true} postId={post._id} />
          </div>
          <UserActions userInfo={userInfo} post={post} />
        </Col>
      </Row>
      <Card.Text className="mt-3">{post.content}</Card.Text>
      {post.images && <PostImages images={post.images} title={post.title} />}
    </BlogPostWrapper>
  );
};

export default BlogPost;
