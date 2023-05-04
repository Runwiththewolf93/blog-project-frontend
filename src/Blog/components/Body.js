import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Alert } from "react-bootstrap";
import { useAppContext } from "./store/appContext";
import BlogPost from "./BlogPost";
import Spinner from "./Spinner";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useCommentContext } from "./store/commentContext";

// figure out why this isn't working
const scrollToBlogPost = category => {
  const blogPostElement = document.getElementById(category);
  if (blogPostElement) {
    blogPostElement.scrollIntoView({ behavior: "smooth" });
  }
};

const Body = ({ userInfo, deleteBlogPost, blogDataToShow }) => {
  const { getSingleBlogPost, isLoadingBlog, errorBlog } = useAppContext();
  const { getAllComments, editCommentBlogPost, deleteCommentBlogPost } =
    useCommentContext();
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    getAllComments();
    // eslint-disable-next-line
  }, []);

  // temporary hack to prevent application from hanging
  useEffect(() => {
    if (isLoadingBlog || blogDataToShow === 0) {
      const timer = setTimeout(() => {
        setShouldReload(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShouldReload(false);
    }
  }, [isLoadingBlog, blogDataToShow]);

  if (shouldReload) {
    return (
      <Alert variant="warning" className="fs-5">
        Something went wrong. Reloading...
      </Alert>
    );
  }

  return (
    <Container>
      <Row className="my-3" id="category1">
        <Col md={2}>
          <Card>
            <Card.Header as="h5">Blog Sections</Card.Header>
            <ListGroup variant="flush">
              {userInfo &&
                blogDataToShow.map((post, index) => (
                  <ListGroup.Item
                    key={index}
                    onClick={() => scrollToBlogPost(`category${index + 1}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {post.title}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={10}>
          {!userInfo ? (
            <Alert variant="info" className="fs-5">
              Please log in to view available blog posts
            </Alert>
          ) : isLoadingBlog ? (
            <Spinner />
          ) : blogDataToShow.length === 0 ? (
            <Alert variant="danger">No blog posts match your query</Alert>
          ) : errorBlog ? (
            <Alert variant="danger">{errorBlog}</Alert>
          ) : (
            blogDataToShow.map(post => (
              <React.Fragment key={post._id}>
                <BlogPost
                  post={post}
                  userInfo={userInfo}
                  deleteBlogPost={deleteBlogPost}
                  getSingleBlogPost={getSingleBlogPost}
                  showPostOverlay={true}
                />
                <Card className="mb-3">
                  <CommentList
                    blogId={post._id}
                    editCommentBlogPost={editCommentBlogPost}
                    deleteCommentBlogPost={deleteCommentBlogPost}
                    userInfo={userInfo}
                  />
                  <CommentForm blogId={post._id} />
                </Card>
              </React.Fragment>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Body;

// no longer being passed into ModalEdit
// blogData={blogData}
// setBlogData={setBlogData}

// no longer being passed down from parent
// blogData,
// setBlogData,

// deletion now done on the backend, no need for it anymore
// const handleDeletePost = postId => {
//   const updatedBlogPost = blogData.filter(post => post.id !== postId);
//   setBlogData(updatedBlogPost);
//   localStorage.removeItem("blogData");
// };

// previously imported for the blog post
// import placeholderImage from "../images/images.png";
// import ModalEdit from "./modals/ModalEdit";
// import PostOverlay from "./PostOverlay";
// Image,
// Button,

// const commentsByBlogPost = {};
// commentInfo.forEach(comment => {
//   const blogId = comment.blog;
//   if (!commentsByBlogPost[blogId]) {
//     commentsByBlogPost[blogId] = [];
//   }
//   commentsByBlogPost[blogId].push(comment);
// });

// useEffect(() => {
//   console.log(isLoadingBlog);
// }, [isLoadingBlog]);
