import { Row, Col } from "react-bootstrap";
import Avatar from "./Avatar";
import { useMediaQuery } from "react-responsive";

const PostImages = ({ images, title }) => {
  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <Row>
      {images.map((image, idx) => (
        <Col key={idx} className="text-center">
          <Avatar
            src={image}
            alt={`${title} Image ${idx + 2}`}
            size={isTabletOrMobileDevice ? 100 : 150}
          />
        </Col>
      ))}
    </Row>
  );
};

export default PostImages;
