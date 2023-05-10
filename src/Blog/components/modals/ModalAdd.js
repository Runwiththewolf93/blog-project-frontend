import { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAppContext } from "../store/appContext";
import { getLatestAvatar } from "../../utils/helper";

export const initialState = {
  title: "",
  avatar: "",
  content: "",
  images: ["", "", ""],
};

const ModalAdd = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialState);
  const { isLoadingBlog, addBlogPost, errorBlog, blogInfo, userInfo } =
    useAppContext();

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

    if (!values.avatar && avatar) {
      values.avatar = avatar;
    }

    addBlogPost(values);
    setValues(initialState);

    if (!isLoadingBlog && !errorBlog) {
      handleClose();
      window.location.reload();
    }
  };

  const avatar = getLatestAvatar(blogInfo, userInfo);

  return (
    <>
      <Button variant="light" onClick={handleShow} className="mt-3">
        Add Post
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add blog post</Modal.Title>
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
              <Form.Label>
                Profile Image - latest submitted image will appear here
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="URL to profile image"
                value={avatar || values.avatar}
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
                  Close
                </Button>
                <Button type="submit" variant="secondary">
                  Add Post
                </Button>
              </div>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAdd;
