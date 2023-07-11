import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

// Tests that the Avatar component renders with valid input for source, alt, and size props, and that the rendered image has the correct attributes and styles.
it("test_valid_input_with_size", () => {
  render(<Avatar src="valid-source" alt="valid-alt" size={100} />);

  expect(screen.getByAltText("valid-alt")).toBeInTheDocument();
  expect(screen.getByAltText("valid-alt")).toHaveAttribute(
    "src",
    "valid-source"
  );

  const avatarImage = screen.getByAltText("valid-alt");
  expect(avatarImage).toHaveStyle({
    width: "100px",
    height: "100px",
    objectFit: "cover",
  });
});

// Tests that the Avatar component renders with valid source and alt inputs, and defaults to a size of 60 pixels.
it("test_valid_input_without_size", () => {
  render(<Avatar src="valid-source" alt="valid-alt" />);

  expect(screen.getByAltText("valid-alt")).toBeInTheDocument();
  expect(screen.getByAltText("valid-alt")).toHaveAttribute(
    "src",
    "valid-source"
  );
  expect(screen.getByRole("img")).toHaveStyle({
    width: "60px",
    height: "60px",
    objectFit: "cover",
  });
});
