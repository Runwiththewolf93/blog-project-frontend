/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import AreaChartComponent from "./AreaChart";
import { generateChartData } from "../../utils/helper";

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
  // Tests that the function renders a area chart component with valid blogInfo information
  it("test_render_valid_comment_info", () => {
    const blogInfo = [
      { title: "Blog 1", totalVotes: 5 },
      { title: "Blog 2", totalVotes: 3 },
      { title: "Blog 3", totalVotes: 7 },
      { title: "Blog 4", totalVotes: 2 },
      { title: "Blog 5", totalVotes: 4 },
    ];

    const { container } = render(<AreaChartComponent blogInfo={blogInfo} />);

    const areaChart = container.querySelector(".recharts-wrapper");
    expect(areaChart).toBeInTheDocument();
  });

  // Tests that the function renders a area chart component with empty blogInfo information
  it("test_render_empty_comment_info", () => {
    const blogInfo = [];

    const { container } = render(<AreaChartComponent blogInfo={blogInfo} />);

    const areaChart = container.querySelector(".recharts-wrapper");
    expect(areaChart).toBeInTheDocument();
  });

  // Tests that the function renders a area chart component with blogInfo information containing null totalVotes
  it("test_render_comment_info_with_null_user_name", () => {
    const blogInfo = [
      { title: "Blog 1", totalVotes: null },
      { title: "Blog 2", totalVotes: null },
      { title: "Blog 3", totalVotes: null },
      { title: "Blog 4", totalVotes: null },
      { title: "Blog 5", totalVotes: null },
    ];

    const { container } = render(<AreaChartComponent blogInfo={blogInfo} />);

    const areaChart = container.querySelector(".recharts-wrapper");
    expect(areaChart).toBeInTheDocument();
  });

  // Tests that the function renders a bar chart component with blogInfo information containing undefined title
  it("test_render_comment_info_with_undefined_user_name", () => {
    const blogInfo = [
      { title: null, totalVotes: 5 },
      { title: null, totalVotes: 3 },
      { title: null, totalVotes: 7 },
      { title: null, totalVotes: 2 },
      { title: null, totalVotes: 4 },
    ];

    const { container } = render(<AreaChartComponent blogInfo={blogInfo} />);

    const areaChart = container.querySelector(".recharts-wrapper");
    expect(areaChart).toBeInTheDocument();
  });
});
