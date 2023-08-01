/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import BarChartComponent from "./BarChart";
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

describe("BarChartComponent_function", () => {
  // Tests that the function renders a bar chart component with valid comment information
  it("test_render_valid_comment_info", () => {
    const commentInfo = [
      { user: { name: "John" } },
      { user: { name: "John" } },
      { user: { name: "Jane" } },
      { user: { name: "Jane" } },
      { user: { name: "Jane" } },
    ];

    const mockChartData = [
      { date: "01/01/2023", count: 1 },
      { date: "02/01/2023", count: 2 },
    ];

    generateChartData.mockImplementation(() => mockChartData);

    const { container } = render(
      <BarChartComponent commentInfo={commentInfo} />
    );

    const barChart = container.querySelector(".recharts-wrapper");
    expect(barChart).toBeInTheDocument();
  });

  // Tests that the function renders a bar chart component with empty comment information
  it("test_render_empty_comment_info", () => {
    const commentInfo = [];

    const mockChartData = [];

    generateChartData.mockImplementation(() => mockChartData);

    const { container } = render(
      <BarChartComponent commentInfo={commentInfo} />
    );

    expect(
      container.querySelector(".recharts-cartesian-grid")
    ).toBeInTheDocument();
  });

  // Tests that the function renders a bar chart component with comment information containing null user name
  it("test_render_comment_info_with_null_user_name", () => {
    const commentInfo = [
      { user: { name: null } },
      { user: { name: "John" } },
      { user: { name: "Jane" } },
    ];

    const mockChartData = [
      { date: "01/01/2023", count: 1 },
      { date: "02/01/2023", count: 2 },
    ];

    generateChartData.mockImplementation(() => mockChartData);

    const { container } = render(
      <BarChartComponent commentInfo={commentInfo} />
    );

    expect(container.querySelector(".recharts-wrapper")).toBeInTheDocument();
  });

  // Tests that the function renders a bar chart component with comment information containing undefined user name
  it("test_render_comment_info_with_undefined_user_name", () => {
    const commentInfo = [
      { user: { name: undefined } },
      { user: { name: "John" } },
      { user: { name: "Jane" } },
    ];

    const mockChartData = [
      { date: "01/01/2023", count: 1 },
      { date: "02/01/2023", count: 2 },
    ];

    generateChartData.mockImplementation(() => mockChartData);

    const { container } = render(
      <BarChartComponent commentInfo={commentInfo} />
    );

    expect(container.querySelector(".recharts-wrapper")).toBeInTheDocument();
  });
});
