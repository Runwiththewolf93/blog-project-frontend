import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ModalEdit from "./ModalEdit";
import useModal from "./useModal";
import { useBlogContextDispatch } from "../../store/blogContext";

jest.mock("./useModal", () => () => ({
  show: true,
  values: {
    title: "",
    avatar: "",
    content: "",
    images: ["", "", ""],
  },
  setValues: jest.fn(),
  isAvatarFileInput: false,
  setIsAvatarFileInput: jest.fn(),
  isImageFileInput: [false, false, false],
  setIsImageFileInput: jest.fn(),
  files: ["", "", ""],
  setFiles: jest.fn(),
  isLoadingBlog: false,
  errorBlog: null,
  postUpdated: false,
  uploadBlogImages: jest.fn(async () => {
    return Promise.resolve({
      avatar: "https://test.com/newAvatar.png",
      images: [
        "https://test.com/newImage1.png",
        "https://test.com/newImage2.png",
        "https://test.com/newImage3.png",
      ],
    });
  }),
  handleClose: jest.fn(),
  handleShow: jest.fn(),
  handleChange: jest.fn(),
  handleFileChange: jest.fn(),
  handleToggle: jest.fn(),
  avatarField: "",
  setAvatarField: jest.fn(),
}));

jest.mock("../../store/blogContext", () => ({
  // replace with actual path to useBlogContextDispatch
  useBlogContextDispatch: () => ({
    editBlogPost: jest.fn(),
    scrollToBlogPost: jest.fn(),
    setPostUpdated: jest.fn(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

// Tests that the modal opens when the 'Edit Post' button is clicked
it("test_modal_opens", () => {
  const post = {
    _id: "123",
    title: "Test Post",
    avatar: "https://test.com/avatar.png",
    content: "This is a test post",
    images: [
      "https://test.com/image1.png",
      "https://test.com/image2.png",
      "https://test.com/image3.png",
    ],
  };

  render(<ModalEdit post={post} />);

  // Expect the modal to be in the document because "show" is set to true in the useModal mock
  expect(screen.getByText("Edit Blog Post")).toBeInTheDocument();
});

// Tests that the form is submitted when the 'Edit Post' button is clicked
it("test_form_submitted", async () => {
  const post = {
    _id: "123",
    title: "Test Post",
    avatar: "https://test.com/avatar.png",
    content: "This is a test post",
    images: [
      "https://test.com/image1.png",
      "https://test.com/image2.png",
      "https://test.com/image3.png",
    ],
  };
  const { editBlogPost } = useBlogContextDispatch();

  // Mock the implementation of editBlogPost
  editBlogPost.mockImplementation(payload => Promise.resolve(payload));

  render(<ModalEdit post={post} />);

  // Open the modal
  fireEvent.click(screen.getAllByRole("button", { name: /edit post/i })[0]);

  // Change the title
  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "New Title" },
  });

  // Submit the form
  fireEvent.submit(
    screen.getAllByRole("button", { name: /edit post/i, type: "submit" })[1]
  );

  // Submit the form v2
  // fireEvent.submit(screen.getByRole("form"));

  // Await for editBlogPost to have been called
  await waitFor(() => expect(editBlogPost).toHaveBeenCalled());

  // Await for editBlogPost to have been called w/ correct values
  await waitFor(() => {
    expect(editBlogPost).toHaveBeenCalledWith({
      id: "123",
      updatedValues: {
        title: "New Title",
        avatar: "https://test.com/newAvatar.png",
        content: "This is a test post",
        images: [
          "https://test.com/newImage1.png",
          "https://test.com/newImage2.png",
          "https://test.com/newImage3.png",
        ],
      },
    });
  });
});

// Tests that values are set correctly in the form fields
it("test_values_set_correctly", () => {
  const post = {
    _id: "123",
    title: "Test Post",
    avatar: "https://test.com/avatar.png",
    content: "This is a test post",
    images: [
      "https://test.com/image1.png",
      "https://test.com/image2.png",
      "https://test.com/image3.png",
    ],
  };
  render(<ModalEdit post={post} />);

  // Submit the form
  fireEvent.submit(
    screen.getAllByRole("button", { name: /edit post/i, type: "submit" })[1]
  );

  expect(screen.getByLabelText("Title")).toHaveValue("Test Post");
  expect(screen.getByLabelText("Avatar")).toHaveValue(
    "https://test.com/avatar.png"
  );
  expect(screen.getByLabelText("Content")).toHaveValue("This is a test post");
  expect(screen.getByLabelText("Image 1")).toHaveValue(
    "https://test.com/image1.png"
  );
  expect(screen.getByLabelText("Image 2")).toHaveValue(
    "https://test.com/image2.png"
  );
  expect(screen.getByLabelText("Image 3")).toHaveValue(
    "https://test.com/image3.png"
  );
});

// Tests that ModalEdit shows the correct title
it("shows correct title", () => {
  render(<ModalEdit post={{}} />);
  expect(screen.getByText("Edit Blog Post")).toBeInTheDocument();
});

// Tests that ModalEdit shows the correct input fields
it("shows correct input fields", () => {
  render(<ModalEdit post={{}} />);
  expect(screen.getByLabelText("Title")).toBeInTheDocument();
  expect(screen.getByLabelText("Avatar")).toBeInTheDocument();
  expect(screen.getByLabelText("Content")).toBeInTheDocument();
  expect(screen.getByLabelText("Image 1")).toBeInTheDocument();
  expect(screen.getByLabelText("Image 2")).toBeInTheDocument();
  expect(screen.getByLabelText("Image 3")).toBeInTheDocument();
});

// Tests that ModalEdit handles file upload correctly
it("handles file upload correctly", async () => {
  const editBlogPost = jest.fn();
  const uploadBlogImages = jest
    .fn()
    .mockResolvedValue({ avatar: "", images: [] });

  render(<ModalEdit post={{ _id: "1" }} />);

  const avatarInput = screen.getByLabelText("Avatar");
  const imageInput1 = screen.getByLabelText("Image 1");
  const imageInput2 = screen.getByLabelText("Image 2");
  const imageInput3 = screen.getByLabelText("Image 3");
  fireEvent.change(avatarInput, { target: { value: "avatar url" } });
  fireEvent.change(imageInput1, { target: { value: "image url 1" } });
  fireEvent.change(imageInput2, { target: { value: "image url 2" } });
  fireEvent.change(imageInput3, { target: { value: "image url 3" } });
  fireEvent.submit(
    screen.getAllByRole("button", { name: /edit post/i, type: "submit" })[1]
  );

  await waitFor(() => expect(uploadBlogImages).toHaveBeenCalled());

  expect(editBlogPost).toHaveBeenCalledWith({
    id: "1",
    updatedValues: { title: "", avatar: "", content: "", images: ["", "", ""] },
  });
});

// Needs to be gotten back to in the future. 3/6 work.
