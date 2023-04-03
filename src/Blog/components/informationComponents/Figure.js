import { Figure, Image } from "react-bootstrap";

function FigureComponent({ images }) {
  return (
    images &&
    images.map(image => (
      <Figure key={image.id} className="m-1">
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
