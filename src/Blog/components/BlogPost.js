import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Vote from "./Vote";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import PostButton from "./PostButton";
import UserActions from "./UserActions";
import PostImages from "./PostImages";
import BlogPostWrapper from "./BlogPostWrapper";

const BlogPost = ({
  post,
  userInfo,
  blogInfo,
  commentInfo,
  voteInfo,
  deleteBlogPost,
  getSingleBlogPost,
  showPostOverlay,
  resetBlogPost,
  deleteAllCommentsBlogPost,
  updateBlogVoteCount,
}) => {
  return (
    <BlogPostWrapper>
      <Row>
        <Col
          xs={1}
          className="d-flex justify-content-center align-items-center"
        >
          <Vote
            itemId={post._id}
            userInfo={userInfo}
            info={blogInfo}
            voteInfo={voteInfo}
            updateVoteCount={updateBlogVoteCount}
          />
        </Col>
        <Col xs={1}>
          <Avatar src={post.avatar} alt={`${post.title} Image 1`} />
        </Col>
        <Col xs={10} className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <UserInfo
              title={post.title}
              date={post.date}
              name={post.user.name}
            />
            <PostButton
              showPostOverlay={showPostOverlay}
              getSingleBlogPost={getSingleBlogPost}
              postId={post._id}
              resetBlogPost={resetBlogPost}
            />
          </div>
          <UserActions
            userInfo={userInfo}
            post={post}
            deleteBlogPost={deleteBlogPost}
            commentInfo={commentInfo}
            deleteAllCommentsBlogPost={deleteAllCommentsBlogPost}
          />
        </Col>
      </Row>
      <Card.Text className="mt-3">{post.content}</Card.Text>
      {post.images && <PostImages images={post.images} title={post.title} />}
    </BlogPostWrapper>
  );
};

export default BlogPost;
