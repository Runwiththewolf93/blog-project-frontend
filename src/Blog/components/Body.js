import React, { useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useAppContext } from "./store/appContext";
import { useCommentContext } from "./store/commentContext";
import { useVoteContext } from "./store/voteContext";
import BlogSections from "./BlogSections";
import BlogPosts from "./BlogPosts";
import Spinner from "./Spinner";
import ScrollToTopPopup from "./ButtonOverlay";

const Body = ({ userInfo, deleteBlogPost, blogDataToShow }) => {
  const { blogInfo, getSingleBlogPost, isLoadingBlog, errorBlog } =
    useAppContext();
  const {
    getAllComments,
    editCommentBlogPost,
    deleteCommentBlogPost,
    deleteAllCommentsBlogPost,
    commentInfo,
  } = useCommentContext();
  const { voteInfo, getAllVotes, updateBlogVoteCount } = useVoteContext();

  useEffect(() => {
    userInfo && getAllComments() && getAllVotes();
    // eslint-disable-next-line
  }, []);

  // When isLoadingBlog gets stuck
  useEffect(() => {
    let timeoutId;
    if (userInfo && isLoadingBlog) {
      timeoutId = setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoadingBlog, userInfo]);

  if (!userInfo) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Alert variant="info" className="fs-5">
          Please log in to view available blog posts
        </Alert>
      </div>
    );
  }

  if (errorBlog) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Alert variant="danger">{errorBlog}</Alert>;
      </div>
    );
  }

  if (isLoadingBlog || !blogDataToShow) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Spinner />
      </div>
    );
  }

  if (blogDataToShow.length === 0) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Alert variant="danger">No blog posts match your query</Alert>
      </div>
    );
  }

  return (
    <Container>
      <Row className="my-3" id={`category1`}>
        <Col md={2}>
          <BlogSections blogDataToShow={blogDataToShow} />
        </Col>
        <Col md={10}>
          <BlogPosts
            blogDataToShow={blogDataToShow}
            blogInfo={blogInfo}
            userInfo={userInfo}
            commentInfo={commentInfo}
            voteInfo={voteInfo}
            deleteBlogPost={deleteBlogPost}
            getSingleBlogPost={getSingleBlogPost}
            deleteAllCommentsBlogPost={deleteAllCommentsBlogPost}
            updateBlogVoteCount={updateBlogVoteCount}
            editCommentBlogPost={editCommentBlogPost}
            deleteCommentBlogPost={deleteCommentBlogPost}
          />
          <div className="d-flex justify-content-end">
            <ScrollToTopPopup />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;

// see for tomorrow to move comments somewhere else /blogPost/:id
