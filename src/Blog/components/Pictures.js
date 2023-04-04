import { Row, Col, Card, Image } from "react-bootstrap";
import useUnsplashImages from "./hooks/useUnsplash";

function Pictures({ userProfile }) {
  const images = useUnsplashImages("nature", 9);

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
