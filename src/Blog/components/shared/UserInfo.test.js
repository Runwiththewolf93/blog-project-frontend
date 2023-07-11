import { render, screen } from "@testing-library/react";
import UserInfo from "./UserInfo";
import { useMediaQuery } from "react-responsive";

afterEach(() => {
  jest.clearAllMocks();
});

// Tests that the UserInfo component renders the correct user information based on the provided props.
it("test_happy_path_renders_user_info", () => {
  const props = {
    title: "Test Title",
    date: "2022-01-01T00:00:00.000Z",
    name: "Test Name",
  };
  render(<UserInfo {...props} />);
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.date.slice(0, 10))).toBeInTheDocument();
  expect(screen.getByText(props.name)).toBeInTheDocument();
});

// Tests that the UserInfo component correctly renders the title, date, and name of a user, and truncates the title and name if the screen width is less than 1400px.
it("test_happy_path_displays_user_info", () => {
  const props = {
    title: "Test Title",
    date: "2022-01-01T00:00:00.000Z",
    name: "Test Name",
  };
  render(<UserInfo {...props} />);
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.date.slice(0, 10))).toBeInTheDocument();
  expect(screen.getByText(props.name)).toBeInTheDocument();
});

// Tests that when the title and name props are empty strings, the component truncates them to a certain length based on the screen width.
it("test_edge_case_truncates_empty_title_and_name", () => {
  // truncating only works if useMediaQuery is set to true
  useMediaQuery.mockReturnValue(true);

  const props = {
    title: "",
    date: "2022-01-01T00:00:00.000Z",
    name: "",
  };

  render(<UserInfo {...props} />);

  const title = screen.getByTestId("user-title");
  const name = screen.getByTestId("user-name");

  expect(title.textContent).toBe("");
  expect(screen.getByText(props.date.slice(0, 10))).toBeInTheDocument();
  expect(name.textContent).toBe("");
});

// Test if longer title and name get truncated properly
it("test_edge_case_truncates_long_title_and_name", () => {
  // Make the hook return `true`
  useMediaQuery.mockReturnValue(true);

  const props = {
    title: "Very long title that should be truncated",
    date: "2022-01-01T00:00:00.000Z",
    name: "Very long name that should be truncated",
  };
  render(<UserInfo {...props} />);

  const truncatedTitle = props.title.substr(0, 12) + "...";
  const truncatedName = props.name.substr(0, 20) + "...";

  expect(screen.getByText(truncatedTitle)).toBeInTheDocument();
  expect(screen.getByText(props.date.slice(0, 10))).toBeInTheDocument();
  expect(screen.getByText(truncatedName)).toBeInTheDocument();
});
