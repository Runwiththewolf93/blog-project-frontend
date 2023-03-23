import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import placeholderImage from "../images/images.png";

const ModalElement = ({ button, blogData, setBlogData }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [modalBlogData, setModalBlogData] = useState([]);

  useEffect(() => {
    setModalBlogData(blogData);
  }, [blogData]);

  const handleClose = () => {
    console.log(modalBlogData);
    const newBlogData = [
      ...modalBlogData,
      {
        id: modalBlogData.length + 1,
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
    setTitle("");
    setText("");
    setShow(false);
  };

  const handleShow = () => setShow(true);
  console.log(blogData);

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
          <Form>
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
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="secondary" onClick={handleClose}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalElement;
