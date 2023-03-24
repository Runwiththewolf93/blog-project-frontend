import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ModalEdit = ({ post, blogData, setBlogData }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.content);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    const postIndex = blogData.findIndex(item => item.id === post.id);

    const newPost = {
      ...post,
      title: title,
      content: text,
    };

    const newBlogData = [...blogData];
    newBlogData[postIndex] = newPost;

    setBlogData(newBlogData);

    handleClose();
  };

  return (
    <>
      <Button variant="light" onClick={handleShow} className="mt-3">
        Edit Post
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
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
                rows={3}
                placeholder="Text of the post"
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEdit;
