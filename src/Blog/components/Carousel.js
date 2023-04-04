import { useState } from "react";
import { Row, Col, Carousel, ListGroup, Card } from "react-bootstrap";
import useUnsplashImages from "./hooks/useUnsplash";

const CarouselComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = useUnsplashImages("cars", 3);

  const handleSelect = selectedIndex => {
    setCurrentImageIndex(selectedIndex);
  };

  return (
    <Row className="m-3">
      <h1 className="mx-0 px-0">Based on your recent interests...</h1>
      <Col md={8} style={{ margin: 0, padding: 0 }}>
        <Carousel fade onSelect={handleSelect}>
          {images.map(image => (
            <Carousel.Item key={image.id}>
              <img
                className="d-block w-100"
                src={image.urls.regular}
                alt={image.alt_description}
                style={{ height: "500px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col style={{ margin: 0, padding: 0 }}>
        <Card>
          {images[currentImageIndex] && (
            <>
              <Card.Header>
                By {images[currentImageIndex].user.name}
              </Card.Header>
              <ListGroup>
                <ListGroup.Item>
                  {images[currentImageIndex].description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Number of likes: {images[currentImageIndex].likes}
                </ListGroup.Item>
                {images[currentImageIndex].tags.map((tag, idx) => (
                  <ListGroup.Item key={idx}>{tag.title}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CarouselComponent;
