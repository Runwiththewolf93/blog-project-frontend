import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Carousel,
  ListGroup,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { truncateContent, sortData } from "../../utils/helper";
import PostTypeSelector from "./PostTypeSelector";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

// CarouselComponent
const CarouselComponent = ({ blogInfo, isLoadingBlog }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [postImageIndices, setPostImageIndices] = useState([0, 0, 0]);
  const [postType, setPostType] = useState("popular");
  const [topPosts, setTopPosts] = useState([]);

  console.log("blogInfo", blogInfo);

  // Sort the blogInfo by the value of totalVotes and get the top 3 posts
  useEffect(() => {
    let sortedPosts = sortData(blogInfo, postType);
    setTopPosts(sortedPosts.slice(0, 3));
  }, [blogInfo, postType]);

  const handleSelect = eventKey => {
    setCurrentPostIndex(eventKey);

    // Once we have finished a full rotation of the carousel
    if (eventKey === 0) {
      setPostImageIndices(prevIndices =>
        prevIndices.map(
          (index, postIndex) =>
            // Increment the image index for each post, wrapping around to the start of the images array if we've reached the end
            (index + 1) % topPosts[postIndex].images.length
        )
      );
    }
  };

  const isTabletOrSmaller = useMediaQuery({ query: "(max-width: 768px)" });

  if (isLoadingBlog) {
    return <Spinner variant="primary" />;
  }

  if (topPosts.length === 0) {
    return (
      <Alert variant="primary">
        Looks like no blog posts have been added. Head over to the{" "}
        <Link to="/">home page</Link> to add some!
      </Alert>
    );
  }

  return (
    <Row className={`m-3 ${isTabletOrSmaller && "fs-5"}`}>
      <h1 className="mx-0 px-0 mb-3">
        See some of our most{" "}
        <PostTypeSelector setPostType={setPostType} typeText="posts" />
      </h1>
      <Col md={8} className="m-0 p-0">
        <Carousel fade activeIndex={currentPostIndex} onSelect={handleSelect}>
          {topPosts.map((post, postIndex) => (
            <Carousel.Item key={post._id}>
              <img
                className="d-block w-100"
                src={post.images[postImageIndices[postIndex]]}
                alt={post.title}
                style={{ height: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>{post.title}</h3>
                <p>{truncateContent(post.content, 100)}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col className="m-0 p-0">
        <Card className={isTabletOrSmaller && "text-center"}>
          {topPosts[currentPostIndex] && (
            <>
              <Card.Header>
                By {topPosts[currentPostIndex].user.name}
              </Card.Header>
              <ListGroup className={isTabletOrSmaller && "fs-6"}>
                <ListGroup.Item>
                  {topPosts[currentPostIndex].title}
                </ListGroup.Item>
                <ListGroup.Item>
                  Total votes: {topPosts[currentPostIndex].totalVotes}
                </ListGroup.Item>
                <ListGroup.Item>
                  Date:{" "}
                  {new Date(
                    topPosts[currentPostIndex].date
                  ).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CarouselComponent;
