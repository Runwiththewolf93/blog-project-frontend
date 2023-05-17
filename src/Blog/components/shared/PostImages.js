import { Row, Col } from "react-bootstrap";
import Avatar from "./Avatar";

const PostImages = ({ images, title }) => (
  <Row>
    {images.map((image, idx) => (
      <Col key={idx} xs={12} md={4} className="text-center">
        <Avatar src={image} alt={`${title} Image ${idx + 2}`} size={100} />
      </Col>
    ))}
  </Row>
);

export default PostImages;
