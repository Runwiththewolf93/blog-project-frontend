import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  ListGroup,
  Alert,
} from "react-bootstrap";
import placeholderImage from "../images/images.png";
import ModalEdit from "./modals/ModalEdit";

const scrollToBlogPost = category => {
  const blogPostElement = document.getElementById(category);
  if (blogPostElement) {
    blogPostElement.scrollIntoView({ behavior: "smooth" });
  }
};

const Body = ({ blogData, setBlogData, searchQuery, blogInfo }) => {
  const handleDeletePost = postId => {
    const updatedBlogPost = blogData.filter(post => post.id !== postId);
    setBlogData(updatedBlogPost);
    localStorage.removeItem("blogData");
  };

  console.log(blogInfo);

  const filteredBlogData = blogInfo
    ? blogInfo.filter(post => post.title.toLowerCase().includes(searchQuery))
    : [];

  return (
    <Container>
      <Row className="my-3" id="category1">
        <Col md={2}>
          <Card>
            <Card.Header as="h5">Blog Sections</Card.Header>
            <ListGroup variant="flush">
              {filteredBlogData.map((post, index) => (
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
          {!filteredBlogData.length > 0 ? (
            <Alert variant="danger">No blog posts match your query</Alert>
          ) : (
            filteredBlogData.map((post, index) => (
              <Card key={index} className="mb-3" id={`category${index + 1}`}>
                <Card.Body>
                  <Row>
                    <Col xs={1}>
                      <Image
                        style={{ width: "60px", height: "60px" }}
                        src={post.avatar || placeholderImage}
                        alt={`${post.title} Image 1`}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col xs={11} className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {post.date.slice(0, 10)}
                        </Card.Subtitle>
                      </div>
                      <div className="d-flex align-items-center">
                        <ModalEdit
                          post={post}
                          blogData={blogData}
                          setBlogData={setBlogData}
                        />
                        <Button
                          variant="light"
                          className="ms-3 mt-3"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete Post
                        </Button>
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
                            style={{ width: "100px", height: "100px" }}
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
