import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import placeholderImage from "../images/images.png";
import Loader from "./Spinner";

const ModalElement = ({ button, blogData, setBlogData, onSubmit }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (blogData) {
      setIsLoading(false);
    }
  }, [blogData]);

  const handleSubmit = (e, handleClose) => {
    e.preventDefault();

    const newBlogData = [
      ...blogData,
      {
        id: blogData.length + 1,
        title: `${title}`,
        date: new Date().toLocaleString(),
        avatar: {
          id: 1,
          src: placeholderImage,
          alt: "Avatar Image",
        },
        content: `${text}`,
        images: [
          { id: 1, src: placeholderImage, alt: "Image 1" },
          { id: 2, src: placeholderImage, alt: "Image 2" },
          { id: 3, src: placeholderImage, alt: "Image 3" },
        ],
      },
    ];

    setTimeout(() => {
      setBlogData(newBlogData);
      onSubmit(newBlogData);
      setTitle("");
      setText("");
      handleClose();
    }, 100);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Button variant="light" onClick={handleShow} className="mt-3">
        {button === "add" ? "Add Post" : "Edit"}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add / Edit blog post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of the post"
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlTextarea1">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Text of the post"
                rows={3}
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            onClick={e => handleSubmit(e, handleClose)}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalElement;
