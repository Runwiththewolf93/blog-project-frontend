import { Container, Row, Col, Card, ListGroup, Alert } from "react-bootstrap";
import { useAppContext } from "./store/appContext";
import BlogPost from "./BlogPost";
import Spinner from "./Spinner";

const scrollToBlogPost = category => {
  const blogPostElement = document.getElementById(category);
  if (blogPostElement) {
    blogPostElement.scrollIntoView({ behavior: "smooth" });
  }
};

const Body = ({ userInfo, deleteBlogPost, blogDataToShow }) => {
  const { getSingleBlogPost, blogPost, isLoadingBlog } = useAppContext();
  console.log(blogPost);
  console.log(blogDataToShow);

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
          ) : !blogDataToShow.length > 0 ? (
            <Alert variant="danger">No blog posts match your query</Alert>
          ) : (
            blogDataToShow.map((post, index) => (
              <BlogPost
                post={post}
                key={index}
                userInfo={userInfo}
                deleteBlogPost={deleteBlogPost}
                getSingleBlogPost={getSingleBlogPost}
                showPostOverlay={true}
              />
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
