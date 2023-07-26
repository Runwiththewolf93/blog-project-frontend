import { render, screen } from "@testing-library/react";
import MapComponent from "./Map";

// Mocks
jest.mock("react-leaflet", () => ({
  MapContainer: jest.fn(({ children, center, zoom }) => (
    <div role="region" center={center.toString()} zoom={zoom.toString()}>
      {children}
    </div>
  )),
  TileLayer: jest.fn(() => <div>TileLayer</div>),
  Marker: jest.fn(({ children, position }) => (
    <div role="img" position={position.toString()}>
      {children}
    </div>
  )),
  Popup: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(() => true),
}));

describe("MapComponent_function", () => {
  // Tests that the MapContainer renders with the correct center and zoom when userProfile has location coordinates
  it("test_render_map_with_user_location", () => {
    const userProfile = {
      location: {
        coordinates: {
          latitude: 40.712776,
          longitude: -74.005974,
        },
      },
    };
    const userInfo = {
      name: "John Doe",
    };

    render(<MapComponent userProfile={userProfile} userInfo={userInfo} />);

    const mapContainer = screen.getByRole("region");
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveAttribute("center", "40.712776,-74.005974");
    expect(mapContainer).toHaveAttribute("zoom", "13");
  });

  // Tests that the Spinner is rendered when location is null
  it("test_render_spinner_when_user_location_is_null", () => {
    const userProfile = {
      location: {
        coordinates: null,
      },
    };
    const userInfo = {
      name: "John Doe",
    };

    render(<MapComponent userProfile={userProfile} userInfo={userInfo} />);

    const spinner = screen.getByText("Loading...");
    expect(spinner).toBeInTheDocument();
  });

  // Tests that the Marker renders with correct position and Popup content when userProfile has location coordinates
  it("test_render_marker_with_correct_position_and_popup_content", () => {
    const userProfile = {
      location: {
        coordinates: {
          latitude: 40.712776,
          longitude: -74.005974,
        },
      },
    };
    const userInfo = {
      name: "John Doe",
    };

    render(<MapComponent userProfile={userProfile} userInfo={userInfo} />);

    const marker = screen.getByRole("img");

    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute("position", "40.712776,-74.005974");
    expect(screen.getByText("John lives here!")).toBeInTheDocument();
  });

  // Tests that the Spinner renders when userProfile is null
  it("test_render_spinner_when_user_profile_is_null", () => {
    const userProfile = null;
    const userInfo = {
      name: "John Doe",
    };

    render(<MapComponent userProfile={userProfile} userInfo={userInfo} />);

    const spinner = screen.getByText("Loading...");

    expect(spinner).toBeInTheDocument();
  });

  // Tests that the Marker renders with default icon when markerIconPng is not available
  it("test_render_marker_with_default_icon_when_marker_icon_png_is_not_available", () => {
    const userProfile = {
      location: {
        coordinates: {
          latitude: 40.712776,
          longitude: -74.005974,
        },
      },
    };
    const userInfo = {
      name: "John Doe",
    };

    jest.mock(
      "leaflet/dist/images/marker-icon.png",
      () => "invalid/path/to/marker-icon.png"
    );

    render(<MapComponent userProfile={userProfile} userInfo={userInfo} />);

    const marker = screen.getByRole("img");

    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute("position", "40.712776,-74.005974");
    expect(marker).toHaveTextContent("John lives here!");
  });
});
