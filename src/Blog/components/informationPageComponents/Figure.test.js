/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import FigureComponent from "./Figure";
import { useMediaQuery } from "react-responsive";

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(),
}));

describe("FigureComponent_function", () => {
  // Tests that the component renders images as figures
  it("renders FigureComponent correctly", () => {
    // Mock the useMediaQuery hook
    useMediaQuery.mockImplementation(() => true);

    const images = [
      {
        id: "1",
        description: "Test image 1",
        urls: { regular: "http://example.com/image1.jpg" },
        alt_description: "Test alt description 1",
      },
      {
        id: "2",
        description: "Test image 2",
        urls: { regular: "http://example.com/image2.jpg" },
        alt_description: "Test alt description 2",
      },
    ];

    render(<FigureComponent images={images} />);

    // Check that the images are rendered
    const imageElements = screen.getAllByRole("img");
    expect(imageElements).toHaveLength(2);
  });

  // Tests that the component displays image description as caption
  it("test_displays_image_description_as_caption", () => {
    // Arrange
    const images = [
      {
        id: "1",
        description: "Test description",
        urls: { regular: "https://test.com" },
        alt_description: "Test alt description",
      },
    ];

    // Act
    render(<FigureComponent images={images} />);

    // Assert
    const caption = screen.getByText(/Test alt description.../i);
    expect(caption).toBeInTheDocument();
  });

  // Tests that the component uses default alt text if no description provided
  it("test_uses_default_alt_text_if_no_description", () => {
    // Arrange
    const images = [
      {
        id: "1",
        urls: { regular: "https://test.com" },
        alt_description: "Test alt description",
      },
    ];

    // Act
    render(<FigureComponent images={images} />);

    // Assert
    const image = screen.getByAltText("No info");
    expect(image).toBeInTheDocument();
  });

  // Tests that the component returns null if no images are provided
  it("test_returns_null_with_no_images", () => {
    const images = null;

    const { container } = render(<FigureComponent images={images} />);

    const figure = container.querySelector(".figure");
    expect(figure).toBeNull();
  });

  // Tests that the component truncates long descriptions to 25 characters
  it("test_truncates_long_descriptions", () => {
    const images = [
      {
        id: "1",
        description: "This is a very long description that should be truncated",
        urls: { regular: "https://example.com" },
        alt_description:
          "This is a very long alt description that should be truncated",
      },
    ];

    render(<FigureComponent images={images} />);

    const figureCaption = screen.getByText(/This is a very long alt de.../i);
    expect(figureCaption).toBeInTheDocument();
  });
});
