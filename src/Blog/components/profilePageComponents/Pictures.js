import { Row, Col, Card, Image } from "react-bootstrap";
import useUnsplashImages from "../../hooks/useUnsplash";
import { capitalizeFirstLetter, concatAndSliceData } from "../../utils/helper";
import { useMediaQuery } from "react-responsive";

/**
 * Renders a component that displays pictures based on user profile and blog information.
 *
 * @param {Object} userProfile - The user profile object.
 * @param {Object} userInfo - The user information object.
 * @param {Array} blogInfo - The array of blog information.
 * @return {JSX.Element} The rendered component.
 */
// Pictures component
function Pictures({ userProfile, userInfo, blogInfo }) {
  // filter blogInfo to only include objects that belong to logged in user
  const userBlogInfo = blogInfo.filter(blog => blog.user._id === userInfo._id);

  // extract images and content properties from userBlogInfo and create a new array of objects
  const userImages = userBlogInfo.flatMap(blog =>
    blog.images.map(image => ({ image, content: blog.content }))
  );

  const numAdditionalImages = Math.max(0, 9 - userImages.length);
  const additionalImages = useUnsplashImages("nature", numAdditionalImages);
  const images = concatAndSliceData(userImages, additionalImages, 9);

  // Detect screen size
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1280px)" });

  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

  const imgStyle = isDesktopOrLaptop
    ? { objectFit: "cover", width: "200px", height: "100px" }
    : {
        objectFit: "cover",
        maxWidth: "100%",
        height: "auto",
        aspectRatio: "16 / 9",
      };

  const cardTextStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    height: "1.5em",
    lineHeight: "1.5em",
  };

  return (
    <Card className={`mt-4 ${isMobile && "my-4"}`}>
      <Card.Title className="mt-1 ms-2">
        Some of {userProfile?.gender === "male" ? "his" : "her"} interests
        include:
      </Card.Title>
      <Row xs={3} className="g-3 mx-1 mb-3">
        {images.map(image => (
          <Col key={image.image || image.blur_hash}>
            <div>
              <Image
                src={image.image || image.urls.small}
                rounded
                style={imgStyle}
              />
              {image.content ? (
                <Card.Text style={cardTextStyle}>{`${image.content.slice(
                  0,
                  20
                )}...`}</Card.Text>
              ) : (
                <Card.Text style={cardTextStyle}>{`${capitalizeFirstLetter(
                  image.alt_description.slice(0, 22)
                )}...`}</Card.Text>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default Pictures;
