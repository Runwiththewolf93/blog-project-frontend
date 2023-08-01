import { render, screen } from "@testing-library/react";
import Charts from "./Charts";
import { useAppContextState } from "../../store/appContext";
import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";

// Mock the hooks
jest.mock("../../store/appContext", () => ({
  useAppContextState: jest.fn(() => ({ users: {} })),
  useAppContextDispatch: jest.fn(() => ({
    getAllUsers: jest.fn(),
  })),
}));

jest.mock("../../store/blogContext", () => ({
  useBlogContextState: jest.fn(() => ({ blogInfo: [] })),
}));

jest.mock("../../store/commentContext", () => ({
  useCommentContextState: jest.fn(() => ({ commentInfo: [] })),
}));

jest.mock("../../store/voteContext", () => ({
  useVoteContextState: jest.fn(() => ({ voteInfo: [] })),
}));

// Mock the components
jest.mock("./CustomCard", () => {
  return function MockedCustomCard({ title, children }) {
    return (
      <div data-testid="mockCustomCard">
        <h2>{title}</h2>
        {children}
      </div>
    );
  };
});

jest.mock("./LineChart", () => {
  return function MockedLineChartComponent({ blogInfo }) {
    return (
      <div data-testid="mockLineChartComponent">{JSON.stringify(blogInfo)}</div>
    );
  };
});

jest.mock("./BarChart", () => {
  return function MockedBarChartComponent({ commentInfo }) {
    return (
      <div data-testid="mockBarChartComponent">
        {JSON.stringify(commentInfo)}
      </div>
    );
  };
});

jest.mock("./AreaChart", () => {
  return function MockedAreaChartComponent({ blogInfo }) {
    return (
      <div data-testid="mockAreaChartComponent">{JSON.stringify(blogInfo)}</div>
    );
  };
});

jest.mock("./PieChart", () => {
  return function MockedPieChartComponent({
    voteInfo,
    users,
    isLaptopScreenOrSmaller,
  }) {
    return (
      <div data-testid="mockPieChartComponent">
        <div data-testid="mockPieChartVoteInfo">{JSON.stringify(voteInfo)}</div>
        <div data-testid="mockPieChartUsers">{JSON.stringify(users)}</div>
        <div data-testid="mockPieChartScreenSize">
          {isLaptopScreenOrSmaller.toString()}
        </div>
      </div>
    );
  };
});

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn().mockReturnValue(true),
}));

describe("Charts_function", () => {
  // Tests that the charts are rendered without errors
  it("test_renders_charts_without_errors", () => {
    // Render the component
    render(<Charts />);

    // Assert that the charts are rendered without errors
    expect(screen.getByTestId("mockLineChartComponent")).toBeInTheDocument();
    expect(screen.getByTestId("mockBarChartComponent")).toBeInTheDocument();
    expect(screen.getByTestId("mockAreaChartComponent")).toBeInTheDocument();
    expect(screen.getByTestId("mockPieChartComponent")).toBeInTheDocument();
  });

  // Tests that the charts display the correct titles
  it("test_displays_correct_chart_titles", () => {
    useAppContextState.mockImplementationOnce(() => ({
      users: [
        { _id: "user1", name: "John" },
        { _id: "user2", name: "Jane" },
      ],
    }));

    // Render the component
    render(<Charts />);

    // Assert that the charts display the correct titles
    expect(screen.getByText("Blog Posts Over Time")).toBeInTheDocument();
    expect(screen.getByText("Comments Over Time")).toBeInTheDocument();
    expect(screen.getByText("Votes Over Time")).toBeInTheDocument();
    expect(screen.getByText("Votes By User")).toBeInTheDocument();
  });

  // Tests that the charts display the correct data
  it("test_displays_charts_with_correct_data", () => {
    // Mock the necessary context functions
    useBlogContextState.mockImplementationOnce(() => ({
      blogInfo: [
        { _id: "blog1", title: "Blog 1", createdAt: "2021-01-01", __v: 0 },
        { _id: "blog2", title: "Blog 2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useCommentContextState.mockImplementationOnce(() => ({
      commentInfo: [
        { _id: "comment1", text: "Comment 1", createdAt: "2021-01-01", __v: 0 },
        { _id: "comment2", text: "Comment 2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useVoteContextState.mockImplementationOnce(() => ({
      voteInfo: [
        { _id: "vote1", createdAt: "2021-01-01", __v: 0 },
        { _id: "vote2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useAppContextState.mockImplementationOnce(() => ({
      users: [
        { _id: "user1", name: "John" },
        { _id: "user2", name: "Jane" },
      ],
    }));

    // Render the component
    render(<Charts />);

    // Get the mock components
    const lineChart = screen.getByTestId("mockLineChartComponent");
    const barChart = screen.getByTestId("mockBarChartComponent");
    const areaChart = screen.getByTestId("mockAreaChartComponent");
    const pieChartVoteInfo = screen.getByTestId("mockPieChartVoteInfo");
    const pieChartUsers = screen.getByTestId("mockPieChartUsers");
    const pieChartScreenSize = screen.getByTestId("mockPieChartScreenSize");

    // Parse the data from the mock components
    const lineChartData = JSON.parse(lineChart.textContent);
    const barChartData = JSON.parse(barChart.textContent);
    const areaChartData = JSON.parse(areaChart.textContent);
    const pieChartData = JSON.parse(pieChartVoteInfo.textContent);
    const pieChartUsersData = JSON.parse(pieChartUsers.textContent);
    const pieChartScreenSizeData = JSON.parse(pieChartScreenSize.textContent);

    // Assert that the charts display the correct data
    expect(lineChartData).toEqual([
      { _id: "blog1", title: "Blog 1", createdAt: "2021-01-01", __v: 0 },
      { _id: "blog2", title: "Blog 2", createdAt: "2021-01-01", __v: 0 },
    ]);
    expect(barChartData).toEqual([
      { _id: "comment1", text: "Comment 1", createdAt: "2021-01-01", __v: 0 },
      { _id: "comment2", text: "Comment 2", createdAt: "2021-01-01", __v: 0 },
    ]);
    expect(areaChartData).toEqual([
      { _id: "blog1", title: "Blog 1", createdAt: "2021-01-01", __v: 0 },
      { _id: "blog2", title: "Blog 2", createdAt: "2021-01-01", __v: 0 },
    ]);
    expect(pieChartData).toEqual([
      { _id: "vote1", createdAt: "2021-01-01", __v: 0 },
      { _id: "vote2", createdAt: "2021-01-01", __v: 0 },
    ]);
    expect(pieChartUsersData).toEqual([
      { _id: "user1", name: "John" },
      { _id: "user2", name: "Jane" },
    ]);
    expect(pieChartScreenSizeData).toEqual(true);
  });

  // Tests that the function handles empty arrays for blogInfo, commentInfo, and voteInfo
  it("test_handles_empty_arrays", () => {
    useAppContextState.mockImplementationOnce(() => ({
      users: [
        { _id: "user1", name: "John" },
        { _id: "user2", name: "Jane" },
      ],
    }));

    // Render the component
    render(<Charts />);

    // Assert that the charts are rendered without errors
    expect(screen.getByText("Blog Posts Over Time")).toBeInTheDocument();
    expect(screen.getByText("Comments Over Time")).toBeInTheDocument();
    expect(screen.getByText("Votes Over Time")).toBeInTheDocument();
    expect(screen.getByText("Votes By User")).toBeInTheDocument();
  });

  // Tests that the function handles an empty users array
  it("test_handles_empty_users_array", () => {
    // Mock the necessary context functions
    useBlogContextState.mockImplementationOnce(() => ({
      blogInfo: [
        { _id: "blog1", title: "Blog 1", createdAt: "2021-01-01", __v: 0 },
        { _id: "blog2", title: "Blog 2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useCommentContextState.mockImplementationOnce(() => ({
      commentInfo: [
        { _id: "comment1", text: "Comment 1", createdAt: "2021-01-01", __v: 0 },
        { _id: "comment2", text: "Comment 2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useVoteContextState.mockImplementationOnce(() => ({
      voteInfo: [
        { _id: "vote1", createdAt: "2021-01-01", __v: 0 },
        { _id: "vote2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    // Render the component
    render(<Charts />);

    // Assert that the charts are rendered without errors
    expect(screen.getByText("Blog Posts Over Time")).toBeInTheDocument();
    expect(screen.getByText("Comments Over Time")).toBeInTheDocument();
    expect(screen.getByText("Votes Over Time")).toBeInTheDocument();
    expect(screen.queryByText("Votes By User")).not.toBeInTheDocument();
  });

  // Tests that the function handles null users
  it("test_handles_null_users", () => {
    // Mock the necessary context functions
    useBlogContextState.mockImplementationOnce(() => ({
      blogInfo: [
        { _id: "blog1", title: "Blog 1", createdAt: "2021-01-01", __v: 0 },
        { _id: "blog2", title: "Blog 2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useCommentContextState.mockImplementationOnce(() => ({
      commentInfo: [
        { _id: "comment1", text: "Comment 1", createdAt: "2021-01-01", __v: 0 },
        { _id: "comment2", text: "Comment 2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useVoteContextState.mockImplementationOnce(() => ({
      voteInfo: [
        { _id: "vote1", createdAt: "2021-01-01", __v: 0 },
        { _id: "vote2", createdAt: "2021-01-01", __v: 0 },
      ],
    }));

    useAppContextState.mockImplementationOnce(() => ({
      users: null,
    }));

    // Render the component
    render(<Charts />);

    // Assert that the charts are rendered without errors
    expect(screen.getByText("Blog Posts Over Time")).toBeInTheDocument();
    expect(screen.getByText("Comments Over Time")).toBeInTheDocument();
    expect(screen.getByText("Votes Over Time")).toBeInTheDocument();
    expect(screen.queryByText("Votes By User")).not.toBeInTheDocument();
  });
});
