import { render, screen } from "@testing-library/react";
import Geolocation from "./Geolocation";
import useUnsplashImages from "../../hooks/useUnsplash";
import TabbedInterface from "./TabbedInterface";
import ToastComponent from "./Toast";

// Mocking useUnsplashImages hook
jest.mock("../../hooks/useUnsplash", () => jest.fn());

// Mocking ToastComponent
jest.mock("./Toast", () => ({
  __esModule: true,
  default: jest.fn(props => (
    <div data-testid="mockToastComponent" {...props} />
  )),
}));

// Mocking TabbedInterface
jest.mock("./TabbedInterface", () => ({
  __esModule: true,
  default: jest.fn(props => (
    <div data-testid="mockTabbedInterface" {...props} />
  )),
}));

describe("Geolocation_function", () => {
  // Tests that the component renders with location data
  it("test_render_with_location_data", () => {
    useUnsplashImages.mockImplementation(() => []);
    const locationData = {
      city: "Belgrade",
      ip_address: "192.168.1.1",
      is_vpn: false,
    };

    render(
      <Geolocation
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={null}
      />
    );

    expect(screen.getByTestId("mockToastComponent")).toBeInTheDocument();
    expect(screen.getByTestId("mockTabbedInterface")).toBeInTheDocument();
  });

  // Tests that the component renders with empty location data
  it("test_render_with_empty_location_data", () => {
    useUnsplashImages.mockImplementation(() => []);
    const locationData = {};

    render(
      <Geolocation
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={null}
      />
    );

    // Assert
    expect(ToastComponent).toHaveBeenCalledWith(
      {
        locationIpAddress: locationData.ip_address,
        locationIsVpn: locationData.is_vpn,
      },
      expect.anything()
    );

    expect(TabbedInterface).toHaveBeenCalledWith(
      expect.objectContaining({
        locationData,
        images: [],
        isLoadingGeolocation: false,
        isLoadingImages: false,
        errorGeolocation: null,
        errorImages: null,
      }),
      expect.anything()
    );
  });

  // Tests that the component renders with empty images data
  it("test_render_with_empty_images_data", () => {
    // Mock the useUnsplashImages hook to return an empty array
    useUnsplashImages.mockImplementation(() => []);

    const locationData = {
      city: "Test City",
      ip_address: "127.0.0.1",
      is_vpn: false,
    };

    // Render the component
    render(
      <Geolocation
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={null}
      />
    );

    // Assert that TabbedInterface received an empty images object
    expect(TabbedInterface).toHaveBeenCalledWith(
      expect.objectContaining({
        images: [],
      }),
      {}
    );
  });
});
