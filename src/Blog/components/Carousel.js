import { useState, useEffect } from "react";
import { Row, Col, Carousel, ListGroup, Card } from "react-bootstrap";
import axios from "axios";

const CarouselComponent = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(images[0]);

  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&per_page=3&query=cars&client_id=${accessKey}`
      )
      .then(({ data }) => {
        setImages(data.results);
        setCurrentImage(data.results[0]);
      });
  }, [accessKey]);

  const handleSelect = selectedIndex => {
    setCurrentImage(images[selectedIndex]);
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
          {currentImage && (
            <>
              <Card.Header>By {currentImage.user.name}</Card.Header>
              <ListGroup>
                <ListGroup.Item>{currentImage.description}</ListGroup.Item>
                <ListGroup.Item>
                  Number of likes: {currentImage.likes}
                </ListGroup.Item>
                {currentImage.tags.map((tag, idx) => (
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
