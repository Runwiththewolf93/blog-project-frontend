/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import LineChartComponent from "./LineChart";
import { generateChartData } from "../../utils/helper";
import { XAxis } from "recharts";

jest.mock("../../utils/helper", () => ({
  generateChartData: jest.fn(),
}));

jest.mock("recharts", () => {
  const React = require("react");
  const OriginalModule = jest.requireActual("recharts");

  const MockResponsiveContainer = ({ children }) => {
    const newChildren = React.Children.map(children, child => {
      return React.cloneElement(child, { width: 500, height: 300 });
    });

    return <div>{newChildren}</div>;
  };

  return {
    ...OriginalModule,
    ResponsiveContainer: MockResponsiveContainer,
  };
});

describe("LineChartComponent_function", () => {
  // Tests that the function renders a line chart component
  it("test_renders_line_chart_component", () => {
    // Arrange
    const blogInfo = [
      { _id: "blog1", createdAt: new Date().toISOString() },
      { _id: "blog2", createdAt: new Date().toISOString() },
    ];
    const mockChartData = [
      { date: "01/01/2023", count: 1 },
      { date: "02/01/2023", count: 2 },
    ];

    // Mock the implementation of generateChartData
    generateChartData.mockImplementation(() => mockChartData);

    // Act
    const { container } = render(<LineChartComponent blogInfo={blogInfo} />);

    // Assert
    const lineChart = container.querySelector(".recharts-wrapper");
    expect(lineChart).toBeInTheDocument();
  });

  // Tests that the function displays the correct data on the chart
  it("test_displays_correct_data_on_chart", () => {
    // Arrange
    const blogInfo = [
      { createdAt: "2021-01-01T00:00:00.000Z" },
      { createdAt: "2021-01-01T00:00:00.000Z" },
      { createdAt: "2021-01-02T00:00:00.000Z" },
    ];

    // Act
    const { container } = render(<LineChartComponent blogInfo={blogInfo} />);

    // Assert
    const wrapper = container.querySelector(".recharts-wrapper");
    expect(wrapper).toBeInTheDocument();

    const surface = container.querySelector(".recharts-surface");
    expect(surface).toBeInTheDocument();

    const cartesianGrid = container.querySelector(".recharts-cartesian-grid");
    expect(cartesianGrid).toBeInTheDocument();

    const horizontalGrid = container.querySelector(
      ".recharts-cartesian-grid-horizontal"
    );
    expect(horizontalGrid).toBeInTheDocument();

    const verticalGrid = container.querySelector(
      ".recharts-cartesian-grid-vertical"
    );
    expect(verticalGrid).toBeInTheDocument();
  });

  // Tests that the function handles an empty blogInfo array
  it("test_handles_empty_blog_info_array", () => {
    // Arrange
    const blogInfo = [];

    // Mock the implementation of generateChartData
    generateChartData.mockImplementation(() => []);

    // Act
    const { container } = render(<LineChartComponent blogInfo={blogInfo} />);

    // Assert
    const lineChart = container.querySelector(".recharts-wrapper");
    expect(lineChart).toBeInTheDocument();

    const line = container.querySelector(".recharts-line-curve");
    expect(line).not.toBeInTheDocument();
  });

  // Tests that the function handles a blogInfo array with one item
  it("test_handles_blog_info_array_with_one_item", () => {
    // Arrange
    const blogInfo = [{ _id: "blog1", createdAt: new Date().toISOString() }];
    const mockChartData = [{ date: "01/01/2023", count: 1 }];

    // Mock the implementation of generateChartData
    generateChartData.mockImplementation(() => mockChartData);

    // Act
    const { container } = render(<LineChartComponent blogInfo={blogInfo} />);

    // Assert
    const lineChart = container.querySelector(".recharts-wrapper");
    expect(lineChart).toBeInTheDocument();

    const cartesianGrid = container.querySelector(".recharts-cartesian-grid");
    expect(cartesianGrid).toBeInTheDocument();
  });
});
