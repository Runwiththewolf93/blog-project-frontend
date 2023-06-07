import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  useAppContextState,
  useAppContextDispatch,
} from "../../store/appContext";
import { getLatestAvatar } from "../../utils/helper";
import ModalFooterContent from "./ModalFooterContent";
import FormInput from "./FormInput";

export const initialState = {
  title: "",
  avatar: "",
  content: "",
  images: ["", "", ""],
};

const ModalAdd = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialState);
  const [isAvatarFileInput, setIsAvatarFileInput] = useState(false);
  const [isImageFileInput, setIsImageFileInput] = useState(
    Array(3).fill(false)
  );
  const [files, setFiles] = useState({
    avatar: "",
    images: Array(3).fill(""),
  });
  const { isLoadingBlog, errorBlog, blogInfo, userInfo } = useAppContextState();
  const { addBlogPost, setPostUpdated, uploadBlogImages } =
    useAppContextDispatch();

  useEffect(() => {
    if (!isLoadingBlog && !errorBlog) {
      handleClose();
    }
  }, [isLoadingBlog, errorBlog]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "images") {
      const newImages = [...values.images];
      newImages[Number(e.target.dataset.index)] = value || "";
      setValues({ ...values, images: newImages });
    } else {
      setValues({ ...values, [name]: value || "" });
    }
  };

  const handleFileChange = e => {
    const { name, files: incomingFiles } = e.target;

    if (!incomingFiles[0]) return;

    const newFileUrl = URL.createObjectURL(incomingFiles[0]) || "";

    if (name === "images") {
      const newFiles = [...files.images];
      const newValues = [...values.images];
      newFiles[Number(e.target.dataset.index)] = incomingFiles[0] || "";
      newValues[Number(e.target.dataset.index)] = newFileUrl || "";
      setFiles({ ...files, images: newFiles });
      setValues({ ...values, images: newValues });
    } else {
      setFiles({ ...files, [name]: incomingFiles[0] || "" });
      setValues({ ...values, [name]: newFileUrl || "" });
    }
  };

  const handleToggle = (name, index) => {
    if (name === "images") {
      const newIsImageFileInput = [...isImageFileInput];
      newIsImageFileInput[index] = !newIsImageFileInput[index];
      setIsImageFileInput(newIsImageFileInput);

      if (newIsImageFileInput[index]) {
        const newValues = [...values.images];
        newValues[index] = "";
        setValues({ ...values, images: newValues });
      }
    } else {
      setIsAvatarFileInput(!isAvatarFileInput);

      if (!isAvatarFileInput) {
        setValues({ ...values, avatar: "" });
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const hasFilesToUpload =
      isAvatarFileInput || isImageFileInput.some(value => value);

    let newValues = { ...values };

    if (!newValues.avatar && avatar) {
      newValues.avatar = avatar;
    }

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
        }
      });

      newValues = {
        ...newValues,
        avatar: isAvatarFileInput ? avatar : newValues.avatar,
        images: newImages,
      };
    }

    // Call addBlogPost with newValues regardless of whether there were files to upload or not
    await addBlogPost(newValues);

    setValues(initialState);
    setFiles({
      avatar: "",
      images: Array(3).fill(""),
    });
    setIsAvatarFileInput(false);
    setIsImageFileInput(Array(3).fill(false));
    setPostUpdated(true);
  };

  const avatar = getLatestAvatar(blogInfo, userInfo) || "";

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
              value={avatar || values.avatar}
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

// continue tomorrow
