import { Image } from "react-bootstrap";
import placeholderImage from "../images/placeholder-image.png";

const Avatar = ({ src, alt, size = 60 }) => (
  <Image
    style={{ width: `${size}px`, height: `${size}px`, objectFit: "cover" }}
    src={src || placeholderImage}
    alt={alt}
    fluid
    rounded
  />
);

export default Avatar;
