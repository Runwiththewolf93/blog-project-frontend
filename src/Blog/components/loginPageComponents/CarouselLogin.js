import { Carousel, Image } from "react-bootstrap";
import useUnsplashImages from "../../hooks/useUnsplash";

/**
 * Renders a carousel login component.
 *
 * @param {number} loginFormHeight - The height of the login form.
 * @return {JSX.Element} The rendered carousel login component.
 */
// CarouselLogin component
const CarouselLogin = ({ loginFormHeight }) => {
  const images = useUnsplashImages("blog", 3);

  const carouselText = [
    {
      h3: "Stay up to date",
      p: "With the many topics available for browsing on our website",
    },
    {
      h3: "Spark your interest",
      p: "Get your creative juices flowing with our many social networks",
    },
    {
      h3: "Get relevant information",
      p: "For your vacation trip to another country around the world",
    },
  ];

  return (
    <Carousel fade pause="hover" controls={false}>
      {images &&
        images.map((image, index) => (
          <Carousel.Item interval={10000} key={image.id}>
            <Image
              style={{ objectFit: "cover", height: loginFormHeight }}
              src={image.urls?.regular}
              alt={image.alt_description}
              rounded
            />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}>
                <strong>{carouselText[index].h3}</strong>
              </h3>
              <p style={{ color: "black" }}>
                <strong>{carouselText[index].p}</strong>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default CarouselLogin;
