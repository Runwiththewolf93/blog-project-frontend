import React, { useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Alert } from "react-bootstrap";
import { useAppContext } from "./store/appContext";
import { useCommentContext } from "./store/commentContext";
import BlogPost from "./BlogPost";
import Spinner from "./Spinner";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import ScrollToTopPopup from "./ButtonOverlay";

const scrollToBlogPost = postId => {
  const blogPostElement = document.getElementById(postId);
  if (blogPostElement) {
    blogPostElement.scrollIntoView({ behavior: "smooth" });
  }
};

const Body = ({ userInfo, deleteBlogPost, blogDataToShow }) => {
  const { getSingleBlogPost, isLoadingBlog, errorBlog } = useAppContext();
  const {
    getAllComments,
    editCommentBlogPost,
    deleteCommentBlogPost,
    deleteAllCommentsBlogPost,
  } = useCommentContext();

  useEffect(() => {
    userInfo && getAllComments();
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
          <Card>
            <Card.Header as="h5">Blog Sections</Card.Header>
            <ListGroup variant="flush">
              {blogDataToShow.map(post => (
                <React.Fragment key={post._id}>
                  <ListGroup.Item
                    onClick={() => scrollToBlogPost(post._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {post.title.length > 20
                      ? `${post.title.slice(0, 20)}...`
                      : post.title}
                  </ListGroup.Item>
                </React.Fragment>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={10}>
          {blogDataToShow.map(post => (
            <React.Fragment key={post._id}>
              <div id={post._id}></div>
              <BlogPost
                post={post}
                userInfo={userInfo}
                deleteBlogPost={deleteBlogPost}
                getSingleBlogPost={getSingleBlogPost}
                showPostOverlay={true}
                deleteAllCommentsBlogPost={deleteAllCommentsBlogPost}
              />
              <Card className="mb-3">
                <CommentList
                  blogId={post._id}
                  editCommentBlogPost={editCommentBlogPost}
                  deleteCommentBlogPost={deleteCommentBlogPost}
                  userInfo={userInfo}
                />
                <CommentForm
                  blogId={post._id}
                  getAllComments={getAllComments}
                />
              </Card>
            </React.Fragment>
          ))}
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
