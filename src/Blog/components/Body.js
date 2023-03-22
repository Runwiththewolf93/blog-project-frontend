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

const scrollToBlogPost = category => {
  const blogPostElement = document.getElementById(category);
  if (blogPostElement) {
    blogPostElement.scrollIntoView({ behavior: "smooth" });
  }
};

const Body = () => {
  return (
    <Container>
      <Row className="my-3" id="category1">
        <Col md={2}>
          <Card>
            <Card.Header as="h5">Blog Sections</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item
                onClick={() => scrollToBlogPost("category1")}
                style={{ cursor: "pointer" }}
              >
                Blog Post 1
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => scrollToBlogPost("category2")}
                style={{ cursor: "pointer" }}
              >
                Blog Post 2
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() => scrollToBlogPost("category3")}
                style={{ cursor: "pointer" }}
              >
                Blog Post 3
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={10}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={1}>
                  <Image
                    style={{ width: "80px", height: "80px" }}
                    src={placeholderImage}
                    fluid
                    rounded
                  />
                </Col>
                <Col xs={11} className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <Card.Title>Blog Post 1</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date().toLocaleString()}
                    </Card.Subtitle>
                  </div>
                  <div className="d-flex">
                    <Button variant="light">Edit</Button>
                    <Button variant="light" className="ms-3">
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
              <Card.Text className="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus ratione sapiente, velit quia id quis non, itaque
                praesentium asperiores quae temporibus labore ut, nihil sed
                voluptatem incidunt doloribus hic dignissimos! Obcaecati cumque
                quia mollitia soluta at accusamus ducimus officia eius pariatur
                labore exercitationem sapiente odit blanditiis dolor modi,
                asperiores aperiam earum veritatis. Aspernatur, dolores
                molestias.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Image
                  style={{ width: "100px", height: "100px" }}
                  className="me-3"
                  src={placeholderImage}
                  fluid
                  rounded
                />
                <Image
                  style={{ width: "100px", height: "100px" }}
                  className="me-3"
                  src={placeholderImage}
                  fluid
                  rounded
                />
                <Image
                  style={{ width: "100px", height: "100px" }}
                  src={placeholderImage}
                  fluid
                  rounded
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-3" id="category2">
        <Col md={2}></Col>
        <Col md={10}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={1}>
                  <Image
                    style={{ width: "80px", height: "80px" }}
                    src={placeholderImage}
                    fluid
                    rounded
                  />
                </Col>
                <Col xs={11} className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <Card.Title>Blog Post 2</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date().toLocaleString()}
                    </Card.Subtitle>
                  </div>
                  <div className="d-flex">
                    <Button variant="light">Edit</Button>
                    <Button variant="light" className="ms-3">
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
              <Card.Text className="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus ratione sapiente, velit quia id quis non, itaque
                praesentium asperiores quae temporibus labore ut, nihil sed
                voluptatem incidunt doloribus hic dignissimos! Obcaecati cumque
                quia mollitia soluta at accusamus ducimus officia eius pariatur
                labore exercitationem sapiente odit blanditiis dolor modi,
                asperiores aperiam earum veritatis. Aspernatur, dolores
                molestias.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Image
                  style={{ width: "100px", height: "100px" }}
                  className="me-3"
                  src={placeholderImage}
                  fluid
                  rounded
                />
                <Image
                  style={{ width: "100px", height: "100px" }}
                  className="me-3"
                  src={placeholderImage}
                  fluid
                  rounded
                />
                <Image
                  style={{ width: "100px", height: "100px" }}
                  src={placeholderImage}
                  fluid
                  rounded
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-3" id="category3">
        <Col md={2}></Col>
        <Col md={10}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={1}>
                  <Image
                    style={{ width: "80px", height: "80px" }}
                    src={placeholderImage}
                    fluid
                    rounded
                  />
                </Col>
                <Col xs={11} className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <Card.Title>Blog Post 3</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date().toLocaleString()}
                    </Card.Subtitle>
                  </div>
                  <div className="d-flex">
                    <Button variant="light">Edit</Button>
                    <Button variant="light" className="ms-3">
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
              <Card.Text className="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus ratione sapiente, velit quia id quis non, itaque
                praesentium asperiores quae temporibus labore ut, nihil sed
                voluptatem incidunt doloribus hic dignissimos! Obcaecati cumque
                quia mollitia soluta at accusamus ducimus officia eius pariatur
                labore exercitationem sapiente odit blanditiis dolor modi,
                asperiores aperiam earum veritatis. Aspernatur, dolores
                molestias.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Image
                  style={{ width: "100px", height: "100px" }}
                  className="me-3"
                  src={placeholderImage}
                  fluid
                  rounded
                />
                <Image
                  style={{ width: "100px", height: "100px" }}
                  className="me-3"
                  src={placeholderImage}
                  fluid
                  rounded
                />
                <Image
                  style={{ width: "100px", height: "100px" }}
                  src={placeholderImage}
                  fluid
                  rounded
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
