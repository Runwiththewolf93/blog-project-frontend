import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppContextDispatch } from "../../store/appContext";
import ModalFooterContent from "./ModalFooterContent";
import FormInput from "./FormInput";
import useModal from "./useModal";

const ModalEdit = ({ post }) => {
  const {
    show,
    values,
    setValues,
    isAvatarFileInput,
    setIsAvatarFileInput,
    isImageFileInput,
    setIsImageFileInput,
    files,
    setFiles,
    isLoadingBlog,
    errorBlog,
    postUpdated,
    setPostUpdated,
    uploadBlogImages,
    handleClose,
    handleShow,
    handleChange,
    handleFileChange,
    handleToggle,
    avatarField,
    setAvatarField,
  } = useModal(post);

  const { editBlogPost, scrollToBlogPost } = useAppContextDispatch();

  useEffect(() => {
    setValues(post);
    setAvatarField(post.avatar);
    // eslint-disable-next-line
  }, [post]);

  useEffect(() => {
    if (postUpdated) {
      scrollToBlogPost(values._id);
    }
  }, [postUpdated, scrollToBlogPost, values._id]);

  const handleSubmit = async e => {
    e.preventDefault();

    const hasFilesToUpload =
      isAvatarFileInput || isImageFileInput.some(value => value);

    let newValues = {
      title: values.title,
      avatar: values.avatar,
      content: values.content,
      images: values.images,
    };

    if (hasFilesToUpload) {
      const formData = new FormData();

      if (files.avatar && isAvatarFileInput) {
        formData.append("avatar", files.avatar);
      }

      if (files.images) {
        files.images.forEach((file, index) => {
          if (file && isImageFileInput[index]) {
            formData.append("images", file, `image-${index}`);
          }
        });
      }

      const { avatar, images } = await uploadBlogImages(formData);

      // Merge uploaded image URLs with the existing URLs
      let newImages = [...values.images];
      images.forEach((image, index) => {
        if (isImageFileInput[index]) {
          newImages[index] = image;
        } else {
          newImages[index] = values.images[index];
        }
      });

      newValues = {
        ...newValues,
        avatar: isAvatarFileInput ? avatar : newValues.avatar,
        images: newImages,
      };
    }

    await editBlogPost({ id: values._id, updatedValues: newValues });

    setValues(post);
    setFiles({ avatar: "", images: Array(3).fill("") });
    setIsAvatarFileInput(false);
    setIsImageFileInput(Array(3).fill(false));
    setPostUpdated(true);
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
              value={avatarField || values.avatar}
              onChange={handleChange}
              name="avatar"
              handleFileChange={handleFileChange}
              isFileInput={isAvatarFileInput}
              handleToggle={handleToggle}
              fileUpload={true}
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
                handleFileChange={handleFileChange}
                isFileInput={isImageFileInput[index]}
                handleToggle={handleToggle}
                fileUpload={true}
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
