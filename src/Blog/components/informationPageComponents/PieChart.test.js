import { render, screen } from "@testing-library/react";
import PieChartComponent from "./PieChart";

describe("PieChartComponent_function", () => {
  // Tests that the pie chart component renders with valid input data
  it("test_render_valid_input_data", () => {
    // Arrange
    const voteInfo = [{ user: "user1" }, { user: "user2" }, { user: "user1" }];
    const users = [
      { _id: "user1", name: "John" },
      { _id: "user2", name: "Jane" },
    ];
    const isLaptopScreenOrSmaller = true;

    // Act
    render(
      <PieChartComponent
        voteInfo={voteInfo}
        users={users}
        isLaptopScreenOrSmaller={isLaptopScreenOrSmaller}
      />
    );

    // Assert
    const pieChart = screen.getByRole("region");
    expect(pieChart).toBeInTheDocument();
  });

  // Tests that the pie chart component renders with empty input data
  it("test_render_empty_input_data", () => {
    // Arrange
    const voteInfo = [];
    const users = [];
    const isLaptopScreenOrSmaller = false;

    // Act
    render(
      <PieChartComponent
        voteInfo={voteInfo}
        users={users}
        isLaptopScreenOrSmaller={isLaptopScreenOrSmaller}
      />
    );

    // Assert
    const pieChart = screen.getByRole("region");
    expect(pieChart).toBeInTheDocument();
  });

  // Tests that the pie chart component renders with null voteInfo
  it("test_render_null_vote_info", () => {
    // Arrange
    const voteInfo = null;
    const users = [
      { _id: "user1", name: "John" },
      { _id: "user2", name: "Jane" },
    ];
    const isLaptopScreenOrSmaller = true;

    // Act
    render(
      <PieChartComponent
        voteInfo={voteInfo}
        users={users}
        isLaptopScreenOrSmaller={isLaptopScreenOrSmaller}
      />
    );

    // Assert
    const pieChart = screen.queryByRole("region");
    expect(pieChart).not.toBeInTheDocument();
  });

  // Tests that the pie chart component renders with null users
  it("test_render_null_users", () => {
    // Arrange
    const voteInfo = [{ user: "user1" }, { user: "user2" }, { user: "user1" }];
    const users = null;
    const isLaptopScreenOrSmaller = false;

    // Act
    render(
      <PieChartComponent
        voteInfo={voteInfo}
        users={users}
        isLaptopScreenOrSmaller={isLaptopScreenOrSmaller}
      />
    );

    // Assert
    const pieChart = screen.queryByRole("region");
    expect(pieChart).not.toBeInTheDocument();
  });

  // Tests that the pie chart component renders with null isLaptopScreenOrSmaller
  it("test_render_null_is_laptop_screen_or_smaller", () => {
    // Arrange
    const voteInfo = [{ user: "user1" }, { user: "user2" }, { user: "user1" }];
    const users = [
      { _id: "user1", name: "John" },
      { _id: "user2", name: "Jane" },
    ];
    const isLaptopScreenOrSmaller = null;

    // Act
    render(
      <PieChartComponent
        voteInfo={voteInfo}
        users={users}
        isLaptopScreenOrSmaller={isLaptopScreenOrSmaller}
      />
    );

    // Assert
    const pieChart = screen.getByRole("region");
    expect(pieChart).toBeInTheDocument();
  });

  // Tests that the pie chart component renders with voteInfo and users of length 0
  it("test_render_vote_info_and_users_of_length_0", () => {
    // Arrange
    const voteInfo = [];
    const users = [];
    const isLaptopScreenOrSmaller = true;

    // Act
    render(
      <PieChartComponent
        voteInfo={voteInfo}
        users={users}
        isLaptopScreenOrSmaller={isLaptopScreenOrSmaller}
      />
    );

    // Assert
    const pieChart = screen.getByRole("region");
    expect(pieChart).toBeInTheDocument();
  });
});
