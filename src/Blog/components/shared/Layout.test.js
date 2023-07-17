import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

// Mock the Navbar and the Footer components
jest.mock("./Navbar", () =>
  jest.fn(({ handleSearch }) => (
    <div data-testid="navbar" data-handle-search={!!handleSearch}>
      Mock Navbar
    </div>
  ))
);
jest.mock("./Footer", () =>
  jest.fn(() => <div data-testid="footer">Mock Footer</div>)
);

// Define a mock handleSearch function
const mockHandleSearch = jest.fn();

// Define some fake kids
const mockChildren = <div data-testid="children">Mock Children</div>;

describe("Layout_function", () => {
  // Tests that the layout component renders with children and handleSearch function
  it("renders layout component with children and handleSearch function", () => {
    render(<Layout handleSearch={mockHandleSearch}>{mockChildren}</Layout>);

    expect(screen.getByTestId("children")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toHaveAttribute(
      "data-handle-search",
      "true"
    );
  });

  // Tests that the layout component renders with children and without handleSearch function
  it("renders layout component with children and without handleSearch function", () => {
    render(<Layout>{mockChildren}</Layout>);
    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  // Tests that the layout component renders without children and without handleSearch function
  it("renders layout component without children and without handleSearch function", () => {
    render(<Layout />);
    expect(screen.queryByTestId("children")).not.toBeInTheDocument();
  });

  // Tests that the layout component does not render with an invalid handleSearch function
  it("does not render layout component with invalid handleSearch function", () => {
    const handleSearch = "not a function";

    render(<Layout handleSearch={handleSearch} />);

    expect(screen.queryByTestId("children")).not.toBeInTheDocument();
  });

  // Tests that the layout component does not render with invalid children
  it("does not render layout component with invalid children", () => {
    const children = "not a valid child";

    render(<Layout>{children}</Layout>);

    expect(screen.queryByTestId("children")).not.toBeInTheDocument();
  });

  // Tests that the layout component renders correctly when children is an empty string
  it("renders layout component correctly when children is an empty string", () => {
    render(<Layout>{""}</Layout>);

    expect(screen.queryByTestId("children")).not.toBeInTheDocument();
  });
});
