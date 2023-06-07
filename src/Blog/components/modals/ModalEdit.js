import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  useAppContextState,
  useAppContextDispatch,
} from "../../store/appContext";
import ModalFooterContent from "./ModalFooterContent";
import FormInput from "./FormInput";

const ModalEdit = ({ post }) => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(post);
  const [editSuccessful, setEditSuccessful] = useState(false);
  const { isLoadingBlog, errorBlog } = useAppContextState();
  const { editBlogPost, setPostUpdated, scrollToBlogPost } =
    useAppContextDispatch();

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
            <FormInput
              controlId="TitleInput"
              label="Title"
              type="text"
              placeholder="Title of the post"
              autoFocus
              value={values.title}
              onChange={handleChange}
              name="title"
            />
            <FormInput
              controlId="AvatarInput"
              label="Avatar"
              type="text"
              placeholder="URL to profile image"
              value={values.avatar}
              onChange={handleChange}
              name="avatar"
            />
            <FormInput
              controlId="ContentInput"
              label="Content"
              type="text"
              as="textarea"
              placeholder="Content of the post"
              value={values.content}
              onChange={handleChange}
              name="content"
              rows={3}
            />
            {[0, 1, 2].map(index => (
              <FormInput
                controlId={`ImageInput-${index}`}
                label={`Image ${index + 1}`}
                type="text"
                placeholder={`URL to image ${index + 1}`}
                value={values.images[index]}
                onChange={handleChange}
                name="images"
                dataIndex={index}
                key={index}
              />
            ))}
          </Modal.Body>
          <Modal.Footer className="d-block">
            <ModalFooterContent
              isLoading={isLoadingBlog}
              error={errorBlog}
              onClose={handleClose}
              buttonText="Edit Post"
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEdit;
