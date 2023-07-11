import { Image } from "react-bootstrap";
import placeholderImage from "../../images/placeholder-image.png";

/**
 * Renders an avatar image with the provided source, alt text, and size.
 *
 * @param {string} src - The source URL of the image.
 * @param {string} alt - The alt text for the image.
 * @param {number} size - The size of the avatar in pixels. Defaults to 60.
 * @return {JSX.Element} The rendered avatar image.
 */
const Avatar = ({ src, alt, size = 60, "data-testid": dataTestId }) => {
  return (
    <Image
      style={{ width: `${size}px`, height: `${size}px`, objectFit: "cover" }}
      src={src || placeholderImage}
      alt={alt}
      fluid
      rounded
      data-testid={dataTestId}
    />
  );
};

export default Avatar;
