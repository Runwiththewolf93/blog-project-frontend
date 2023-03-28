import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";

const CarouselComponent = () => {
  const [images, setImages] = useState([]);

  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&per_page=3&query=cars&client_id=${accessKey}`
      )
      .then(({ data }) => setImages(data.results));
  }, [accessKey]);

  console.log(images);

  return (
    <Carousel fade>
      {images.map(image => (
        <Carousel.Item key={image.id}>
          <img
            className="d-block w-100"
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <Carousel.Caption>
            <h3>{image.user.name}</h3>
            <p>{image.description.split(" ").slice(0, 5).join(" ")}...</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
