import { Row, Col } from "react-bootstrap";
import Avatar from "./Avatar";
import { useMediaQuery } from "react-responsive";

/**
 * Renders a component that displays a row of images.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.images - An array of image URLs.
 * @param {string} props.title - The title of the post.
 * @returns {JSX.Element} - The rendered component.
 */
// PostImages component
const PostImages = ({ images, title }) => {
  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <Row data-testid="row">
      {images.map((image, idx) => (
        <Col key={idx} className="text-center" data-testid="col">
          <Avatar
            src={image}
            alt={`${title} Image ${idx + 2}`}
            size={isTabletOrMobileDevice ? 100 : 150}
            data-testid={`avatar-${isTabletOrMobileDevice ? 100 : 150}-${idx}`}
          />
        </Col>
      ))}
    </Row>
  );
};

export default PostImages;
