import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalContent from "./ModalContent";

const ModalElement = ({ onAddPost }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleClose = () => {
    setTitle("");
    setText("");
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleTitleChange = e => setTitle(e.target.value);

  const handleTextChange = e => setText(e.target.value);

  const handleAddButtonClick = (title, text) => {
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
        <ModalContent
          title={title}
          text={text}
          onTitleChange={handleTitleChange}
          onTextChange={handleTextChange}
          onClose={handleClose}
          onAddPost={handleAddButtonClick}
        />
      </Modal>
    </>
  );
};

export default ModalElement;
