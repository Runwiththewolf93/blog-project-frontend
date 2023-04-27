import { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  CloseButton,
  Button,
} from "react-bootstrap";
import ModalAdd from "./modals/ModalAdd";

function Message({ userInfo, getAllBlogPosts, toggleShowMyPosts }) {
  const [showCard, setShowCard] = useState(false);

  const handleCloseCard = () => {
    setShowCard(true);
  };

  const handleRefresh = () => {
    getAllBlogPosts();
  };

  return (
    <Container className="my-3">
      <Row>
        <Col md={2} />
        <Col md={10}>
          <Card.Header className="h1 mb-3">Welcome to my Blog</Card.Header>
          <Card style={{ display: showCard ? "none" : "flex" }}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>
                  {userInfo && userInfo.name
                    ? `Welcome back, ${
                        userInfo.name.charAt(0).toUpperCase() +
                        userInfo.name.slice(1).toLowerCase()
                      }`
                    : "See what's new"}
                </Card.Title>
                <div className="d-flex justify-content-end">
                  <CloseButton onClick={handleCloseCard} />
                </div>
              </div>
              <Card.Text>
                {userInfo
                  ? "Check below some of the blog posts we have curated for you:"
                  : "Container for showing application messages"}
              </Card.Text>
            </Card.Body>
          </Card>
          {userInfo && (
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  className="mt-3"
                  variant="light"
                  onClick={() => {
                    handleRefresh();
                    // temporary solution
                    window.location.reload();
                  }}
                >
                  Refresh Post
                </Button>
                <Button
                  className="ms-3 mt-3"
                  variant="secondary"
                  onClick={toggleShowMyPosts}
                >
                  Your posts
                </Button>
              </div>
              <ModalAdd />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Message;

// const handleAddPost = (title, text) => {
//   const newBlogData = [
//     ...blogData,
//     {
//       id: blogData.length + 1,
//       title: title,
//       date: new Date().toLocaleString(),
//       avatar: { id: 1, src: placeholderImage, alt: "Avatar Image" },
//       content: text,
//       images: [
//         { id: 1, src: placeholderImage, alt: "Image 1" },
//         { id: 2, src: placeholderImage, alt: "Image 2" },
//         { id: 3, src: placeholderImage, alt: "Image 3" },
//       ],
//     },
//   ];
//   setBlogData(newBlogData);
//   localStorage.setItem("blogData", JSON.stringify(newBlogData));
// };

// previously a part of ModalAdd props
// onAddPost={handleAddPost}

// previously an import for the above object
// import placeholderImage from "../images/images.png";

// previously props of the component, passed down from home page
// blogData, setBlogData,
