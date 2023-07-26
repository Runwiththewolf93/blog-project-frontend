import React from "react";
import { render, screen } from "@testing-library/react";
import Progress from "./Progress";
import { shuffle } from "lodash";

// Mock userProfile and userInfo
const mockUserProfile = {
  name: { first: "John", last: "Doe" },
  gender: "male",
};

const mockUserInfo = {
  name: "John Doe",
};

// Mock shuffle
jest.mock("lodash");

// Mock the return value of shuffle for labels
shuffle.mockImplementationOnce(() => [
  "Security Audit",
  "Debugging Code",
  "Security Testing",
  "Product Infrastructure",
  "Network Security",
]);

// Mock the return value of shuffle for variants
shuffle.mockImplementationOnce(() => [
  "danger",
  "light",
  "warning",
  "success",
  "info",
]);

describe("Progress component", () => {
  it("should render the correct number of progress bars", () => {
    render(<Progress userProfile={mockUserProfile} userInfo={mockUserInfo} />);

    const progressBars = screen.getAllByRole("progressbar");

    expect(progressBars.length).toBe(5);
  });

  it("should render the correct label for each progress bar", () => {
    const labels = [
      "Security Audit",
      "Debugging Code",
      "Security Testing",
      "Product Infrastructure",
      "Network Security",
    ];

    render(<Progress userProfile={mockUserProfile} userInfo={mockUserInfo} />);

    const progressBars = screen.getAllByRole("progressbar");

    for (const index in labels) {
      expect(progressBars[index].textContent).toEqual(labels[index]);
    }
  });

  it("should render the correct variant for each progress bar", () => {
    const variants = ["danger", "light", "warning", "success", "info"];

    render(<Progress userProfile={mockUserProfile} userInfo={mockUserInfo} />);

    const progressBars = screen.getAllByRole("progressbar");

    for (const index in variants) {
      expect(progressBars[index].className).toContain(`bg-${variants[index]}`);
    }
  });

  it("should render the correct now value for each progress bar", () => {
    const nows = [0.3, 0.4, 0.5, 0.6, 0.7]; // Adjust this array to match the number of progress bars
    let callCount = 0;

    const originalMathRandom = Math.random;
    Math.random = jest.fn(() => nows[callCount++]);

    render(<Progress userProfile={mockUserProfile} userInfo={mockUserInfo} />);

    const progressBars = screen.getAllByRole("progressbar");

    for (const index in nows) {
      expect(Number(progressBars[index].getAttribute("aria-valuenow"))).toEqual(
        Math.floor(nows[index] * 71) + 30
      );
    }

    // Restore the original implementation
    Math.random = originalMathRandom;
  });
});
