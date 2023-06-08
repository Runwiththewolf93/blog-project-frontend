import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  useAppContextState,
  useAppContextDispatch,
} from "../../store/appContext";
import ModalFooterContent from "./ModalFooterContent";
import FormInput from "./FormInput";
import useModal from "./useModal";
import { getLatestAvatar } from "../../utils/helper";

const initialState = {
  title: "",
  avatar: "",
  content: "",
  images: ["", "", ""],
};

const ModalAdd = () => {
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
  } = useModal(initialState);

  const { blogInfo, userInfo } = useAppContextState();
  const { addBlogPost } = useAppContextDispatch();

  const avatar = getLatestAvatar(blogInfo, userInfo) || "";

  useEffect(() => {
    setAvatarField(avatar);
    // eslint-disable-next-line
  }, [avatar]);

  useEffect(() => {
    if (postUpdated) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [postUpdated]);

  const handleSubmit = async e => {
    e.preventDefault();

    const hasFilesToUpload =
      isAvatarFileInput || isImageFileInput.some(value => value);

    let newValues = { ...values };

    if (hasFilesToUpload) {
      const formData = new FormData();

      if (files.avatar && isAvatarFileInput) {
        formData.append("avatar", files.avatar);
      }

      if (files.images) {
        files.images.forEach((file, index) => {
          if (file && isImageFileInput[index]) {
            formData.append(`images`, file, `image-${index}`);
          }
        });
      }

      // Await for uploadBlogImages to finish
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

    await addBlogPost(newValues);

    setValues(initialState);
    setFiles({ avatar: "", images: Array(3).fill("") });
    setIsAvatarFileInput(false);
    setIsImageFileInput(Array(3).fill(false));
    setPostUpdated(true);
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
              label="Profile Image - latest submitted image"
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
                value={values.images[index] || ""}
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
              buttonText="Add Post"
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAdd;

// We are done for today. Check some other cases as well, just to be sure.
