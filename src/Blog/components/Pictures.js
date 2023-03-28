import { useState, useEffect } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";
import axios from "axios";

function Pictures({ userProfile }) {
  const [images, setImages] = useState([]);

  const accessKey = "yDiYUV-P8GDTUkoWrXX-5wF4TdtV9qWZbc_IdUB1Jx8";

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&per_page=9&query=nature&client_id=${accessKey}`
      )
      .then(({ data }) => setImages(data.results));
  }, []);

  return (
    <Card className="mt-4">
      <Card.Title className="mt-1 ms-2">
        Some of {userProfile.gender === "male" ? "his" : "her"} interests
        include:
      </Card.Title>
      <Row md={3} className="g-3 mb-3 mx-1 me-3">
        {images.map(image => (
          <Col key={image.blur_hash}>
            <Card>
              <Image
                src={image.urls.small}
                rounded
                style={{ objectFit: "cover", width: "200px", height: "100px" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default Pictures;
