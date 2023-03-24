App.js

import { useState, useEffect } from "react";
import Navbar from "./Blog/components/Navbar";
import Message from "./Blog/components/Message";
import Body from "./Blog/components/Body";
import placeholderImage from "./Blog/images/images.png";
import "./App.css";
import blog from "./Blog/data/blog";

function App() {
const [blogData, setBlogData] = useState(blog);

useEffect(() => {
const storedData = localStorage.getItem("blogData");
if (storedData) {
setBlogData(JSON.parse(storedData));
} else {
setBlogData(blog);
}
}, []);

const handleAddPost = (title, text) => {
const newPost = {
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
};
setBlogData([...blogData, newPost]);
localStorage.setItem("blogData", JSON.stringify([...blogData, newPost]));
};

const handleDeletePost = postId => {
const updatedBlogPost = blogData.filter(post => post.id !== postId);
setBlogData(updatedBlogPost);
localStorage.removeItem("blogData");
};

return (
<>
<Navbar />
<Message onAddPost={handleAddPost} newPost={newPost} />
<Body
onAddPost={handleAddPost}
handleDeletePost={handleDeletePost}
blogData={[...blogData, newPost]}
/>
</>
);
}

export default App;

Body.js

import {
Container,
Row,
Col,
Card,
Image,
Button,
ListGroup,
} from "react-bootstrap";
import placeholderImage from "../images/images.png";
import ModalElement from "./ModalElement";

const scrollToBlogPost = category => {
const blogPostElement = document.getElementById(category);
if (blogPostElement) {
blogPostElement.scrollIntoView({ behavior: "smooth" });
}
};

const Body = ({ blogData, onAddPost, handleDeletePost }) => {
const [newPost, setNewPost] = useState({});

useEffect(() => {
if (Object.keys(newPost).length > 0) {
setBlogData([...blogData, newPost]);
}
}, [newPost]);

return (
<Container>
<Row className="my-3" id="category1">
<Col md={2}>
<Card>
<Card.Header as="h5">Blog Sections</Card.Header>
<ListGroup variant="flush">
{blogData.map(post => (
<ListGroup.Item
key={post.id}
onClick={() => scrollToBlogPost(category${post.id})}
style={{ cursor: "pointer" }}
>
{post.title}
</ListGroup.Item>
))}
</ListGroup>
</Card>
</Col>
<Col md={10}>
{[...blogData, newPost].map(post => (
<Card key={post.id} className="mb-3" id={category${post.id}}>
<Card.Body>
<Row>
<Col xs={1}>
<Image
style={{ width: "80px", height: "80px" }}
src={post.avatar.src || placeholderImage}
alt={post.avatar.alt}
fluid
rounded
/>
</Col>
<Col xs={11} className="d-flex align-items-center">
<div className="flex-grow-1">
<Card.Title>{post.title}</Card.Title>
<Card.Subtitle className="mb-2 text-muted">
{post.date}
</Card.Subtitle>
</div>
<div className="d-flex align-items-center">
{!Object.keys(post).length && (
<ModalElement onAddPost={onAddPost} />
)}
<Button
variant="light"
className="ms-3 mt-3"
onClick={() => handleDeletePost(post.id)}
>
Delete
</Button>
</div>
</Col>
</Row>
<Card.Text className="mt-3">{post.content}</Card.Text>
{post.images && (
<Row>
{post.images.map(image => (
<Col key={image.id} xs={12} md={4}>
<Image
src={image.src || placeholderImage}
alt={image.alt}
fluid
style={{ width: "100px", height: "100px" }}
/>
</Col>
))}
</Row>
)}
</Card.Body>
</Card>
))}
</Col>
</Row>
</Container>
);
};

export default Body;

Message.js

import { useState } from "react";
import { Card, Container, Row, Col, CloseButton } from "react-bootstrap";
import ModalElement from "./ModalElement";

function Message({ onAddPost, newPost }) {
const [showCard, setShowCard] = useState(false);

const handleCloseCard = () => {
setShowCard(true);
};

return (
<Container>
<Row className="my-3">
<Col md={2} />
<Col md={10}>
<Card.Header className="h1 mb-3">Welcome to my Blog</Card.Header>
<Card style={{ display: showCard ? "none" : "flex" }}>
<Card.Body>
<div className="d-flex justify-content-between">
<Card.Title>See what's new</Card.Title>
<div className="d-flex justify-content-end">
<CloseButton onClick={handleCloseCard} />
</div>
</div>
<Card.Text>Container for showing application messages</Card.Text>
</Card.Body>
</Card>
<div className="d-flex justify-content-end">
<ModalElement onAddPost={onAddPost} />
</div>
</Col>
</Row>
</Container>
);
}