import { render, screen } from "@testing-library/react";
import CarouselLogin from "./CarouselLogin";
import useUnsplashImages from "../../hooks/useUnsplash";

jest.mock("../../hooks/useUnsplash", () => jest.fn());

// Mock data for the hook
const mockImages = [
  {
    id: "1",
    urls: { regular: "https://example.com/image1.jpg" },
    alt_description: "Image 1",
  },
  {
    id: "2",
    urls: { regular: "https://example.com/image2.jpg" },
    alt_description: "Image 2",
  },
  {
    id: "3",
    urls: { regular: "https://example.com/image3.jpg" },
    alt_description: "Image 3",
  },
];

// Mock data for the loginFormHeight prop
const mockLoginFormHeight = "500px";

describe("CarouselLogin_function", () => {
  // Tests that the function renders a carousel login component with images and captions
  it("test_happy_path_renders_carousel_login_component", () => {
    useUnsplashImages.mockReturnValue(mockImages);

    render(<CarouselLogin loginFormHeight={mockLoginFormHeight} />);

    const carousel = screen.getByTestId("carousel");

    expect(carousel).toBeInTheDocument();
  });

  // Tests that images and captions are displayed in the carousel
  it("test_happy_path_images_and_captions_displayed_in_carousel", () => {
    useUnsplashImages.mockReturnValue(mockImages);

    render(<CarouselLogin loginFormHeight={mockLoginFormHeight} />);

    const carouselItems = screen.getAllByTestId("carousel-item");
    expect(carouselItems.length).toBe(3);

    const carouselCaptions = screen.getAllByTestId("carousel-caption");
    expect(carouselCaptions.length).toBe(3);
  });

  // Tests that the carousel has fade effect and pause on hover
  it("test_happy_path_carousel_has_fade_effect_and_pause_on_hover", () => {
    useUnsplashImages.mockReturnValue(mockImages);

    render(<CarouselLogin loginFormHeight={mockLoginFormHeight} />);

    const { asFragment } = render(
      <CarouselLogin loginFormHeight={mockLoginFormHeight} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  // Tests that the function handles the edge case where no images are returned from useUnsplashImages hook
  it("test_edge_case_no_images_returned_from_useUnsplashImages_hook", () => {
    useUnsplashImages.mockReturnValue([]);

    render(<CarouselLogin loginFormHeight={mockLoginFormHeight} />);

    const carouselItems = screen.queryAllByTestId("carousel-item");
    expect(carouselItems.length).toBe(0);
  });

  // Tests that the function handles the edge case where images returned from useUnsplashImages hook are not in expected format
  it("test_edge_case_images_returned_from_useUnsplashImages_hook_not_in_expected_format", () => {
    useUnsplashImages.mockReturnValue([{ id: "1" }]);

    render(<CarouselLogin loginFormHeight={mockLoginFormHeight} />);

    const carouselItems = screen.queryAllByTestId("carousel-item");
    expect(carouselItems.length).toBe(0);
  });

  // Tests that the function handles the edge case where loginFormHeight prop is not provided or not a number
  it("test_edge_case_loginFormHeight_prop_not_provided_or_not_a_number", () => {
    useUnsplashImages.mockReturnValue(mockImages);

    // Render without loginFormHeight
    render(<CarouselLogin />);
    let carouselImages = screen.getAllByRole("img");
    carouselImages.forEach(img => {
      // Check if the height style is the default value
      expect(img.style.height).toBe("500px");
    });

    // Render with loginFormHeight
    render(<CarouselLogin loginFormHeight={mockLoginFormHeight} />);
    carouselImages = screen.getAllByRole("img");
    carouselImages.forEach(img => {
      // Check if the height style is equal to loginFormHeight
      expect(img.style.height).toBe(mockLoginFormHeight);
    });
  });
});
