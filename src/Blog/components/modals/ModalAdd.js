import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModalAdd = ({ onAddPost }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddButtonClick = e => {
    e.preventDefault();
    onAddPost(title, text);
    setTitle("");
    setText("");
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
        <Form onSubmit={handleAddButtonClick}>
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
                placeholder="Text of the post"
                rows={3}
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </Form.Group>
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
