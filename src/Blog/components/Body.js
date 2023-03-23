import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  ListGroup,
} from "react-bootstrap";
import placeholderImage from "../images/images.png";
import ModalElement from "./Modal";
import blog from "../data/blog";

const scrollToBlogPost = category => {
  const blogPostElement = document.getElementById(category);
  if (blogPostElement) {
    blogPostElement.scrollIntoView({ behavior: "smooth" });
  }
};

const Body = () => {
  const [blogData, setBlogData] = useState(blog);

  const addBlogPost = updatedBlogData => {
    setBlogData(updatedBlogData);
  };

  const handleDeletePost = postId => {
    const updatedBlogPost = blogData.filter(post => post.id !== postId);
    setBlogData(updatedBlogPost);
  };

  return (
    <Container>
      <Row className="my-3" id="category1">
        <Col md={2}>
          <Card>
            <Card.Header as="h5">Blog Sections</Card.Header>
            <ListGroup variant="flush">
              {blog.map(post => (
                <ListGroup.Item
                  key={post.id}
                  onClick={() => scrollToBlogPost(`category${post.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {post.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={10}>
          {blogData.map(post => (
            <Card key={post.id} className="mb-3" id={`category${post.id}`}>
              <Card.Body>
                <Row>
                  <Col xs={1}>
                    <Image
                      style={{ width: "80px", height: "80px" }}
                      src={post.avatar.src || placeholderImage}
                      alt={post.avatar.alt}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col xs={11} className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {post.date}
                      </Card.Subtitle>
                    </div>
                    <div className="d-flex align-items-center">
                      <ModalElement
                        blogData={blogData}
                        setBlogData={setBlogData}
                        onSubmit={addBlogPost}
                      />
                      <Button
                        variant="light"
                        className="ms-3 mt-3"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Card.Text className="mt-3">{post.content}</Card.Text>
                {post.images && (
                  <Row>
                    {post.images.map(image => (
                      <Col key={image.id} xs={12} md={4}>
                        <Image
                          src={image.src || placeholderImage}
                          alt={image.alt}
                          fluid
                          style={{ width: "100px", height: "100px" }}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
