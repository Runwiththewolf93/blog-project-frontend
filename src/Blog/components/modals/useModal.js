import { useState, useEffect } from "react";
import {
  useBlogContextState,
  useBlogContextDispatch,
} from "../../store/blogContext";

/**
 * Custom React hook for managing a modal state and related functionality.
 *
 * @param {Object} initialState - The initial state for the hook.
 * @returns {Object} - An object containing the hook's state and functions.
 */
// useModal hook
const useModal = initialState => {
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
  const [avatarField, setAvatarField] = useState("");

  const { isLoadingBlog, errorBlog, postUpdated } = useBlogContextState();
  const { uploadBlogImages } = useBlogContextDispatch();

  /**
   * Closes the modal.
   */
  const handleClose = () => setShow(false);

  /**
   * Shows the modal.
   */
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (postUpdated && !isLoadingBlog && !errorBlog) {
      handleClose();
    }
  }, [postUpdated, isLoadingBlog, errorBlog]);

  useEffect(() => {
    setValues(values => ({ ...values, avatar: avatarField }));
  }, [avatarField]);

  /**
   * Handles the change event for input fields.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "images") {
      const newImages = [...values.images];
      newImages[Number(e.target.dataset.index)] = value || "";
      setValues({ ...values, images: newImages });
    } else if (name === "avatar") {
      setAvatarField(value || "");
      setValues({ ...values, [name]: value || "" });
    } else {
      setValues({ ...values, [name]: value || "" });
    }
  };

  /**
   * Handles the file change event for file inputs.
   *
   * @param {Object} e - The event object.
   */
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
      setAvatarField(newFileUrl);
    }
  };

  /**
   * Toggles the file input for a specific field.
   *
   * @param {string} name - The name of the field.
   * @param {number} index - The index of the field (for image inputs).
   */
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
      setValues({ ...values, avatar: "" });
    }
  };

  return {
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
    uploadBlogImages,
    handleClose,
    handleShow,
    handleChange,
    handleFileChange,
    handleToggle,
    avatarField,
    setAvatarField,
  };
};

export default useModal;
