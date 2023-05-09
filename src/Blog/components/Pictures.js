import { Row, Col, Card, Image } from "react-bootstrap";
import useUnsplashImages from "./hooks/useUnsplash";

function Pictures({ userProfile, userInfo, blogInfo }) {
  const images = useUnsplashImages("nature", 9);

  // filter blogInfo to only include objects that belong to logged in user
  const userBlogInfo = blogInfo.filter(blog => blog.user._id === userInfo._id);

  // extract images and content properties from userBlogInfo and create a new array of objects
  const userImages = userBlogInfo.flatMap(blog =>
    blog.images.map(image => ({ image, content: blog.content }))
  );

  const displayedImages =
    userImages?.length > 0 ? userImages.slice(0, 9) : images;

  console.log(images);

  return (
    <Card className="mt-4">
      <Card.Title className="mt-1 ms-2">
        Some of {userProfile.gender === "male" ? "his" : "her"} interests
        include:
      </Card.Title>
      <Row md={3} className="g-3 mb-3 mx-1 me-3">
        {displayedImages.map(image => (
          <Col key={image.image || image.blur_hash}>
            <Card>
              <Image
                src={image.image || image.urls.small}
                rounded
                style={{ objectFit: "cover", width: "200px", height: "100px" }}
              />
              {image.content ? (
                <Card.Text>{`${image.content.slice(0, 22)}...`}</Card.Text>
              ) : (
                <Card.Text>{`${image.alt_description.slice(
                  0,
                  22
                )}...`}</Card.Text>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default Pictures;
