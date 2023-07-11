/* eslint-disable jest/no-conditional-expect */
import { render, screen } from "@testing-library/react";
import PostImages from "./PostImages";
import { useMediaQuery } from "react-responsive";

// Tests that the component renders a Row component
it("renders a Row component", () => {
  render(<PostImages images={[]} title="" />);
  expect(screen.getByTestId("row")).toBeInTheDocument();
});

// Tests that the component renders a Col component for each image
it("renders a Col component for each image", () => {
  const images = ["image1", "image2", "image3"];
  render(<PostImages images={images} title="" />);
  expect(screen.getAllByTestId("col")).toHaveLength(images.length);
});

// Tests that the component renders an Avatar component for each image
it("renders an Avatar component for each image", () => {
  const images = ["image1", "image2", "image3"];
  render(<PostImages images={images} title="" />);
  expect(screen.getAllByRole("img")).toHaveLength(images.length);
});

// Tests that the component renders correctly when images prop is an empty array
it("renders correctly when images prop is an empty array", () => {
  render(<PostImages images={[]} title="" />);
  expect(screen.queryByTestId("col")).not.toBeInTheDocument();
});

// Tests that the component renders correctly when title prop is not a string or an empty string
it("renders correctly when title prop is not a string or an empty string", () => {
  render(<PostImages images={["image1"]} title={123} />);
  expect(screen.getByAltText("123 Image 2")).toBeInTheDocument();
});

it("renders correctly when title prop is an empty string", () => {
  render(<PostImages images={["image1"]} title="" />);
  expect(screen.getByTestId("col")).toBeInTheDocument();
});

// Tests that the Avatar component size prop is correct based on screen width
it("Avatar component size prop is correct based on screen width", () => {
  const images = ["image1", "image2", "image3"];

  // Manipulate the output of the useMediaQuery hook
  useMediaQuery.mockImplementationOnce(() => true);

  render(<PostImages images={images} title="" />);

  images.forEach((_, idx) => {
    expect(screen.getByTestId(`avatar-100-${idx}`)).toBeInTheDocument();
  });

  // Manipulate the output of the useMediaQuery hook
  useMediaQuery.mockImplementationOnce(() => false);

  render(<PostImages images={images} title="" />);

  images.forEach((_, idx) => {
    expect(screen.getByTestId(`avatar-150-${idx}`)).toBeInTheDocument();
  });
});
