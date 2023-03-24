import { Button, Form, Modal } from "react-bootstrap";

const ModalContent = ({
  title,
  text,
  onTitleChange,
  onTextChange,
  onClose,
  onAddPost,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onAddPost(title, text);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleTitleChange = e => {
    onTitleChange(e);
  };

  const handleTextChange = e => {
    onTextChange(e);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add blog post</Modal.Title>
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
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlTextarea1">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Text of the post"
              rows={3}
              value={text}
              onChange={handleTextChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="secondary">
          Post
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalContent;
