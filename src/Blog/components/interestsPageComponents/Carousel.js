import { useState } from "react";
import { Row, Col, Carousel, ListGroup, Card } from "react-bootstrap";
import { truncateContent } from "../../utils/helper";

const CarouselComponent = ({ blogInfo }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [postImageIndices, setPostImageIndices] = useState([0, 0, 0]);
  const [postType, setPostType] = useState("popular");

  // Sort the blogInfo by the value of totalVotes and get the top 3 posts
  let topPosts = [...blogInfo];

  if (postType === "popular") {
    topPosts = topPosts.sort(
      (a, b) => Math.abs(b.totalVotes) - Math.abs(a.totalVotes)
    );
  } else if (postType === "upvoted") {
    topPosts = topPosts.sort((a, b) => b.totalVotes - a.totalVotes);
  } else if (postType === "downvoted") {
    topPosts = topPosts.sort((a, b) => a.totalVotes - b.totalVotes);
  }

  topPosts = topPosts.slice(0, 3);

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

  return (
    <Row className="m-3">
      <h1 className="mx-0 px-0 mb-3">
        See some of our most{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setPostType("popular")}
          className="text-light text-decoration-underline"
        >
          popular
        </span>{" "}
        /{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setPostType("upvoted")}
          className="text-light text-decoration-underline"
        >
          upvoted
        </span>{" "}
        /{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setPostType("downvoted")}
          className="text-light text-decoration-underline"
        >
          downvoted
        </span>{" "}
        posts
      </h1>
      <Col md={8} style={{ margin: 0, padding: 0 }}>
        <Carousel fade activeIndex={currentPostIndex} onSelect={handleSelect}>
          {topPosts.map((post, postIndex) => (
            <Carousel.Item key={post.id}>
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
      <Col style={{ margin: 0, padding: 0 }}>
        <Card>
          {topPosts[currentPostIndex] && (
            <>
              <Card.Header>
                By {topPosts[currentPostIndex].user.name}
              </Card.Header>
              <ListGroup>
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
