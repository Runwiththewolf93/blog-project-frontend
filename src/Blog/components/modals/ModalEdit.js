import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useAppContext } from "../../store/appContext";

const ModalEdit = ({ post }) => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(post);
  const [editSuccessful, setEditSuccessful] = useState(false);
  const {
    isLoadingBlog,
    editBlogPost,
    errorBlog,
    setPostUpdated,
    scrollToBlogPost,
  } = useAppContext();

  useEffect(() => {
    setValues(post);
  }, [post]);

  useEffect(() => {
    if (editSuccessful && !isLoadingBlog && !errorBlog) {
      handleClose();
      scrollToBlogPost(values._id);
      setEditSuccessful(false);
    }
  }, [isLoadingBlog, errorBlog, scrollToBlogPost, values._id, editSuccessful]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "images") {
      const newImages = [...values.images];
      newImages[Number(e.target.dataset.index)] = value;
      setValues({ ...values, images: newImages });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const updatedValues = {
      title: values.title,
      avatar: values.avatar,
      content: values.content,
      images: values.images,
    };

    editBlogPost({ id: values._id, updatedValues });
    setPostUpdated(true);
    setEditSuccessful(true);
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Edit Post
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="TitleInput">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of the post"
                autoFocus
                value={values.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="AvatarInput">
              <Form.Label>Avatar - Profile Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL to profile image"
                value={values.avatar}
                onChange={handleChange}
                name="avatar"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ContentInput">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Content of the post"
                value={values.content}
                onChange={handleChange}
                name="content"
                rows={3}
              />
            </Form.Group>
            {[0, 1, 2].map(index => (
              <Form.Group
                className="mb-3"
                controlId={`ImageInput-${index}`}
                key={index}
              >
                <Form.Label>{`Image ${index + 1}`}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`URL to image ${index + 1}`}
                  value={values.images[index]}
                  onChange={handleChange}
                  name="images"
                  data-index={index}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer className="d-block">
            {isLoadingBlog ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" size="sm" />
              </div>
            ) : errorBlog ? (
              <div className="d-flex justify-content-center">
                <Alert variant="danger">{errorBlog}</Alert>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="secondary">
                  Edit Post
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEdit;
