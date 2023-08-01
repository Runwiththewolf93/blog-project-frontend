import { Figure, Image } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

/**
 * Renders a component that displays a collection of images as figures.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.images - An array of images to be displayed.
 * @return {JSX.Element|null} The rendered component.
 */
// FigureComponent
function FigureComponent({ images }) {
  const isTabletScreenOrSmaller = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const isMobileScreenOrSmaller = useMediaQuery({
    query: "(max-width: 576px)",
  });

  if (!images) return null;

  return (
    images &&
    images.map(image => (
      <Figure
        key={image.id}
        className={classNames("m-1", {
          "text-center": isTabletScreenOrSmaller,
          "mt-4": isMobileScreenOrSmaller,
        })}
      >
        <Image
          style={{ width: "200px", height: "150px", objectFit: "cover" }}
          alt={image?.description || "No info"}
          src={image.urls?.regular}
          rounded
        />
        <Figure.Caption style={{ color: "whitesmoke" }}>
          {image.alt_description?.charAt(0).toUpperCase() +
            image.alt_description?.slice(1).toLowerCase().substring(0, 25)}
          ...
        </Figure.Caption>
      </Figure>
    ))
  );
}

export default FigureComponent;
