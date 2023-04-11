import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppContext } from "../store/appContext";

export const initialState = {
  title: "",
  avatar: "",
  content: "",
  images: ["", "", ""],
};

const ModalAdd = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialState);
  const { addBlogPost } = useAppContext();

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
    addBlogPost(values);
    setValues(initialState);
    handleClose();
  };

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
          <Modal.Footer className="d-flex justify-content-between">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="secondary">
              Add Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAdd;

// imported from parent
// { onAddPost }

// part of state in component
// const [title, setTitle] = useState("");
// const [text, setText] = useState("");

// part of handleSubmit
// onAddPost(title, text);
// setTitle("");
// setText("");

// part of formControl
// value={title}
// onChange={e => setTitle(e.target.value)}
// value={text}
// onChange={e => setText(e.target.value)}
