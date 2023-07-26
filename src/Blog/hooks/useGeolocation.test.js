import { renderHook, waitFor } from "@testing-library/react";
import useGeolocation from "./useGeolocation";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
});

const mockData = {
  continent: "Europe",
  continent_code: "EU",
  postal_code: "10000",
  country: "Croatia",
  country_code: "HR",
  city: "Zagreb",
  region: "Zagreb",
  flag: {
    png: "https://example.com/flag.png",
  },
  currency: {
    country_code: "HRK",
    currency_name: "Croatian Kuna",
  },
  ip_address: "93.150.220.174",
  latitude: "45.8150",
  longitude: "15.9819",
  security: {
    is_vpn: false,
  },
  timezone: {
    current_time: "2023-07-24T12:00:00+02:00",
  },
  connection: {
    asn: 12345,
    isp: "Example ISP",
  },
};

const mockLocationData = {
  continent: "Europe",
  continent_code: "EU",
  postal_code: "10000",
  country: "Croatia",
  country_code: "HR",
  city: "Zagreb",
  region: "Zagreb",
  png: "https://example.com/flag.png",
  currency_code: "HRK",
  currency_name: "Croatian Kuna",
  ip_address: "93.150.220.174",
  latitude: "45.8150",
  longitude: "15.9819",
  is_vpn: false,
  current_time: "2023-07-24T12:00:00+02:00",
  connection: {
    asn: 12345,
    isp: "Example ISP",
  },
};

it("should start with initial state", () => {
  const { result } = renderHook(() => useGeolocation("testKey"));

  expect(result.current.locationData).toEqual({});
  expect(result.current.isLoading).toBe(true);
  expect(result.current.error).toBe(null);
});

it("should update locationData and isLoading when API call is successful", async () => {
  const { result } = renderHook(() => useGeolocation("testKey"));

  // Simulating a successful API response
  mockAxios.mockResponse({
    data: mockData,
  });

  // Wait for the hook to finish the API call
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  expect(result.current.locationData).toEqual(mockLocationData);
});

it("should set error when API call fails", async () => {
  const { result } = renderHook(() => useGeolocation("testKey"));

  // Simulating an error response
  mockAxios.mockError(new Error("API call failed"));

  // Wait for the hook to finish the API call
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Check if the error was set correctly
  expect(result.current.error).toEqual(new Error("API call failed"));
  // Check if the location data is still empty
  expect(result.current.locationData).toEqual({});
});

it("should set error to null when API call returns 429 status code", async () => {
  const { result } = renderHook(() => useGeolocation("testKey"));

  // Simulating an error response with a 429 status code
  mockAxios.mockError({
    response: {
      status: 429,
      data: {},
    },
  });

  // Wait for the hook to finish the API call
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Check if the error was set to null
  expect(result.current.error).toBeNull();
  // Check if the location data is still empty
  expect(result.current.locationData).toEqual({});
});
