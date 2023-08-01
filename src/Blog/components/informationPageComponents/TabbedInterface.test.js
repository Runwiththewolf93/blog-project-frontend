import { render, screen } from "@testing-library/react";
import TabbedInterface from "./TabbedInterface";
import FigureComponent from "./Figure";

jest.mock("./Figure", () => () => <div>Mock FigureComponent</div>);
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <div>Mock FontAwesomeIcon</div>,
}));

describe("TabbedInterface_function", () => {
  // Tests that TabbedInterface component renders with valid locationData and images
  it("test_happy_path_rendering", () => {
    const locationData = {
      continent: "Europe",
      country: "Italy",
      country_code: "IT",
      city: "Rome",
      region: "Lazio",
      postal_code: "00100",
      latitude: 41.9028,
      longitude: 12.4964,
      currency_name: "Euro",
      currency_code: "EUR",
      current_time: "2022-01-01T12:00:00Z",
      png: "https://flagcdn.com/it.png",
    };
    const images = [
      "https://picsum.photos/id/1018/300/200",
      "https://picsum.photos/id/1015/300/200",
      "https://picsum.photos/id/1019/300/200",
    ];

    render(
      <TabbedInterface
        locationData={locationData}
        images={images}
        isLoadingGeolocation={false}
        isLoadingImages={false}
        errorGeolocation={false}
        errorImages={false}
      />
    );

    expect(
      screen.getByText(/General information about vacation location/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pictures of the potential vacation location/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Location Information:/i)).toBeInTheDocument();

    // Check for each part of the text separately
    expect(screen.getByText(/Continent:/i)).toBeInTheDocument();
    expect(screen.getByText(/Europe/i)).toBeInTheDocument();
    expect(screen.getByText(/Country:/i)).toBeInTheDocument();
    expect(screen.getByText(/Italy/i)).toBeInTheDocument();
    expect(screen.getByText(/\(IT\)/i)).toBeInTheDocument();
    expect(screen.getByText(/City:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rome/i)).toBeInTheDocument();
    expect(screen.getByText(/Region:/i)).toBeInTheDocument();
    expect(screen.getByText(/Lazio/i)).toBeInTheDocument();
    expect(screen.getByText(/Postal Code:/i)).toBeInTheDocument();
    expect(screen.getByText(/00100/i)).toBeInTheDocument();
    expect(screen.getByText(/Latitude:/i)).toBeInTheDocument();
    expect(screen.getByText(/41.9028/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitude:/i)).toBeInTheDocument();
    expect(screen.getByText(/12.4964/i)).toBeInTheDocument();
    expect(screen.getByText(/Currency:/i)).toBeInTheDocument();
    expect(screen.getByText(/Euro \(EUR\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Time:/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-01-01T12:00:00Z/i)).toBeInTheDocument();

    // Check for the image
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getAllByRole("img")[0]).toHaveAttribute(
      "src",
      "https://flagcdn.com/it.png"
    );
  });

  // Tests that TabbedInterface component renders with isLoadingGeolocation and isLoadingImages as true
  it("test_happy_path_loading", () => {
    const locationData = {
      continent: "Europe",
      country: "Italy",
      country_code: "IT",
      city: "Rome",
      region: "Lazio",
      postal_code: "00100",
      latitude: 41.9028,
      longitude: 12.4964,
      currency_name: "Euro",
      currency_code: "EUR",
      current_time: "2022-01-01T12:00:00Z",
      png: "https://flagcdn.com/it.png",
    };
    const images = [
      "https://picsum.photos/id/1018/300/200",
      "https://picsum.photos/id/1015/300/200",
      "https://picsum.photos/id/1019/300/200",
    ];

    render(
      <TabbedInterface
        locationData={locationData}
        images={images}
        isLoadingGeolocation={true}
        isLoadingImages={true}
        errorGeolocation={false}
        errorImages={false}
      />
    );

    expect(
      screen.getByText("General information about vacation location")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pictures of the potential vacation location")
    ).toBeInTheDocument();

    expect(screen.getByTestId("loader1")).toBeInTheDocument();
    expect(screen.getByTestId("loader2")).toBeInTheDocument();
  });

  // Tests that TabbedInterface component renders with errorGeolocation and errorImages as true
  it("test_happy_path_error", () => {
    const locationData = {
      continent: "Europe",
      country: "Italy",
      country_code: "IT",
      city: "Rome",
      region: "Lazio",
      postal_code: "00100",
      latitude: 41.9028,
      longitude: 12.4964,
      currency_name: "Euro",
      currency_code: "EUR",
      current_time: "2022-01-01T12:00:00Z",
      png: "https://flagcdn.com/it.png",
    };
    const images = [
      "https://picsum.photos/id/1018/300/200",
      "https://picsum.photos/id/1015/300/200",
      "https://picsum.photos/id/1019/300/200",
    ];

    render(
      <TabbedInterface
        locationData={locationData}
        images={images}
        isLoadingGeolocation={false}
        isLoadingImages={false}
        errorGeolocation={"Error retrieving geolocation data"}
        errorImages={"Error retrieving images"}
      />
    );

    expect(
      screen.getByText("General information about vacation location")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pictures of the potential vacation location")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Error retrieving geolocation data")
    ).toBeInTheDocument();
    expect(screen.getByText("Error retrieving images")).toBeInTheDocument();
  });

  // Tests that TabbedInterface component renders with empty locationData and images
  it("test_edge_case_empty_data", () => {
    const locationData = {
      continent: "",
      country: "",
      country_code: "",
      city: "",
      region: "",
      postal_code: "",
      latitude: "",
      longitude: "",
      currency_name: "",
      currency_code: "",
      current_time: "",
      png: "",
    };
    const images = [];

    render(
      <TabbedInterface
        locationData={locationData}
        images={images}
        isLoadingGeolocation={false}
        isLoadingImages={false}
        errorGeolocation={false}
        errorImages={false}
      />
    );
    expect(
      screen.getByText("General information about vacation location")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pictures of the potential vacation location")
    ).toBeInTheDocument();
    expect(screen.getByText("Location Information:")).toBeInTheDocument();
    expect(screen.getByText(/Continent:/i)).toBeInTheDocument();
    expect(screen.getByText(/Country:/i)).toBeInTheDocument();
    expect(screen.getByText(/City:/i)).toBeInTheDocument();
    expect(screen.getByText(/Region:/i)).toBeInTheDocument();
    expect(screen.getByText(/Postal Code:/i)).toBeInTheDocument();
    expect(screen.getByText(/Latitude:/i)).toBeInTheDocument();
    expect(screen.getByText(/Longitude:/i)).toBeInTheDocument();
    expect(screen.getByText(/Currency:/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Time:/i)).toBeInTheDocument();
    expect(screen.getByText(/Flag:/i)).toBeInTheDocument();
  });

  // Tests that TabbedInterface component renders with isLoadingGeolocation and isLoadingImages as true
  it("test_edge_case_loading", () => {
    const locationData = {
      continent: "",
      country: "",
      country_code: "",
      city: "",
      region: "",
      postal_code: "",
      latitude: "",
      longitude: "",
      currency_name: "",
      currency_code: "",
      current_time: "",
      png: "",
    };
    const images = [];

    render(
      <TabbedInterface
        locationData={locationData}
        images={images}
        isLoadingGeolocation={true}
        isLoadingImages={true}
        errorGeolocation={false}
        errorImages={false}
      />
    );

    expect(
      screen.getByText("General information about vacation location")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pictures of the potential vacation location")
    ).toBeInTheDocument();
    expect(screen.getByTestId("loader1")).toBeInTheDocument();
    expect(screen.getByTestId("loader2")).toBeInTheDocument();
  });

  // Tests that TabbedInterface component renders with errorGeolocation and errorImages as true
  it("test_edge_case_error", () => {
    const locationData = {
      continent: "",
      country: "",
      country_code: "",
      city: "",
      region: "",
      postal_code: "",
      latitude: "",
      longitude: "",
      currency_name: "",
      currency_code: "",
      current_time: "",
      png: "",
    };
    const images = [];

    render(
      <TabbedInterface
        locationData={locationData}
        images={images}
        isLoadingGeolocation={false}
        isLoadingImages={false}
        errorGeolocation={"Error retrieving geolocation data"}
        errorImages={"Error retrieving images"}
      />
    );

    expect(
      screen.getByText("General information about vacation location")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Pictures of the potential vacation location")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Error retrieving geolocation data")
    ).toBeInTheDocument();
    expect(screen.getByText("Error retrieving images")).toBeInTheDocument();
  });
});
