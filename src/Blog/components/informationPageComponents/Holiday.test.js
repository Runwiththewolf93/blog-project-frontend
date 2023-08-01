import { render, screen } from "@testing-library/react";
import Holiday from "./Holiday";
import useFetchPublicHolidays from "./useFetchPublicHolidays";

// Mock useFetchPublicHolidays hook
jest.mock("./useFetchPublicHolidays", () => jest.fn());

describe("Holiday_function", () => {
  // Tests that a list of holidays is rendered when data is available
  it("test_happy_path_holidays_found", () => {
    // Mock location data
    const locationData = {
      country_code: "US",
    };

    // Mock holiday data
    const holidayData = [
      {
        name: "Christmas",
        localName: "Christmas",
        date: "2023-12-25",
        countryCode: "US",
        fixed: true,
        global: true,
        counties: ["New York", "California"],
        types: ["National", "Public"],
      },
      {
        name: "Thanksgiving",
        localName: "Thanksgiving",
        date: "2023-11-23",
        countryCode: "US",
        fixed: true,
        global: true,
        counties: ["Texas"],
        types: ["National", "Public"],
      },
    ];

    useFetchPublicHolidays.mockReturnValue({
      loading: false,
      error: null,
      data: holidayData,
    });

    // Render the component
    render(
      <Holiday
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={null}
      />
    );

    // Assert that the holiday data is displayed in the table
    expect(screen.getAllByText("Christmas")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Thanksgiving")[0]).toBeInTheDocument();
  });

  // Tests that a message is rendered when no holidays are found
  it("test_happy_path_no_holidays_found", () => {
    // Mock location data
    const locationData = {
      country_code: "US",
    };

    // Mock holiday data
    const holidayData = [];

    // Mock useFetchPublicHolidays hook
    useFetchPublicHolidays.mockReturnValue({
      loading: false,
      error: null,
      data: holidayData,
    });

    // Render the component
    render(
      <Holiday
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={null}
      />
    );

    // Assert that the 'No holidays found' message is displayed
    expect(screen.getByText("No holidays found")).toBeInTheDocument();
  });

  // Tests that a spinner is rendered when geolocation data is being loaded
  it("test_edge_case_spinner_shown", () => {
    // Mock location data
    const locationData = {
      country_code: "US",
    };

    // Mock useFetchPublicHolidays hook
    useFetchPublicHolidays.mockReturnValue({
      loading: false,
      error: null,
      data: [],
    });

    // Render the component with isLoadingGeolocation set to true
    render(
      <Holiday
        locationData={locationData}
        isLoadingGeolocation={true}
        errorGeolocation={null}
      />
    );

    // Assert that the spinner is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // Tests that an error message is rendered when geolocation data fails to load
  it("test_edge_case_error_message_geolocation", () => {
    // Mock location data
    const locationData = {
      country_code: "US",
    };

    // Mock error object
    const errorGeolocation = {
      message: "Geolocation error",
    };

    // Mock useFetchPublicHolidays hook
    useFetchPublicHolidays.mockReturnValue({
      loading: false,
      error: null,
      data: [],
    });

    // Render the component with errorGeolocation
    render(
      <Holiday
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={errorGeolocation}
      />
    );

    // Assert that the error message is rendered
    expect(screen.getByText("Oh snap! You got an error!")).toBeInTheDocument();
    expect(screen.getByText("Geolocation error")).toBeInTheDocument();
  });

  // Tests that an error message is rendered when holiday data fails to load
  it("test_edge_case_error_message_holiday_data", () => {
    // Mock location data
    const locationData = {
      country_code: "US",
    };

    // Mock error object
    const error = {
      message: "Holiday data error",
    };

    // Mock useFetchPublicHolidays hook
    useFetchPublicHolidays.mockReturnValue({
      loading: false,
      error: error,
      data: null,
    });

    // Render the component
    render(
      <Holiday
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={null}
      />
    );

    // Assert that the error message is rendered
    expect(screen.getByText("Oh snap! You got an error!")).toBeInTheDocument();
    expect(screen.getByText("Holiday data error")).toBeInTheDocument();
  });

  // Tests that holiday data is displayed in a table
  it("test_general_behaviour_table_display", () => {
    // Mock location data
    const locationData = {
      country_code: "US",
    };

    // Mock holiday data
    const holidayData = [
      {
        name: "Christmas",
        localName: "Christmas",
        date: "2023-12-25",
        countryCode: "US",
        fixed: true,
        global: true,
        counties: ["New York", "California"],
        types: ["National", "Public"],
      },
      {
        name: "Thanksgiving",
        localName: "Thanksgiving",
        date: "2023-11-23",
        countryCode: "US",
        fixed: true,
        global: true,
        counties: ["Texas"],
        types: ["National", "Public"],
      },
    ];

    // Mock useFetchPublicHolidays hook
    useFetchPublicHolidays.mockReturnValue({
      loading: false,
      error: null,
      data: holidayData,
    });

    // Render the component
    render(
      <Holiday
        locationData={locationData}
        isLoadingGeolocation={false}
        errorGeolocation={null}
      />
    );

    // Assert that the holiday data is displayed in the table
    expect(screen.getAllByText("Christmas")[1]).toBeInTheDocument();
    expect(screen.getAllByText("Thanksgiving")[1]).toBeInTheDocument();
  });
});
