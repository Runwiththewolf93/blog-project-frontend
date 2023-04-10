import { useState } from "react";
import { Card, Container, Row, Col, CloseButton } from "react-bootstrap";
import ModalAdd from "./modals/ModalAdd";
import placeholderImage from "../images/images.png";
import { useAppContext } from "./store/appContext";

function Message({ blogData, setBlogData }) {
  const [showCard, setShowCard] = useState(false);
  const { userInfo } = useAppContext();
  console.log(userInfo);

  const handleAddPost = (title, text) => {
    const newBlogData = [
      ...blogData,
      {
        id: blogData.length + 1,
        title: title,
        date: new Date().toLocaleString(),
        avatar: { id: 1, src: placeholderImage, alt: "Avatar Image" },
        content: text,
        images: [
          { id: 1, src: placeholderImage, alt: "Image 1" },
          { id: 2, src: placeholderImage, alt: "Image 2" },
          { id: 3, src: placeholderImage, alt: "Image 3" },
        ],
      },
    ];
    setBlogData(newBlogData);
    localStorage.setItem("blogData", JSON.stringify(newBlogData));
  };

  const handleCloseCard = () => {
    setShowCard(true);
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
          <div className="d-flex justify-content-end">
            <ModalAdd onAddPost={handleAddPost} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
