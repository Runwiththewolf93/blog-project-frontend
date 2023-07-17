import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navbar";
import { useMediaQuery } from "react-responsive";
import {
  useAppContextState,
  useAppContextDispatch,
} from "../../store/appContext";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ children }) => <div data-testid="link">{children}</div>),
}));

jest.mock("react-responsive", () => ({
  useMediaQuery: jest.fn(() => true),
}));

jest.mock("../../store/appContext", () => ({
  useAppContextState: jest.fn(() => ({
    userInfo: { name: "John Doe" },
  })),
  useAppContextDispatch: jest.fn(() => ({
    logoutUser: jest.fn(),
  })),
}));

jest.mock("../../pages/LoginPage", () =>
  jest.fn(() => <div data-testid="login-page">LoginPage</div>)
);

const handleSearch = jest.fn();

describe("Navigation_function", () => {
  // Tests that the navbar is rendered with links to different pages
  it("test_render_navbar", () => {
    render(<Navigation handleSearch={handleSearch} />);

    expect(screen.getByText("My Blog")).toBeInTheDocument();
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText("Interests")).toBeInTheDocument();
    expect(screen.getByText("Information")).toBeInTheDocument();
    expect(screen.getByText("Reset-pass")).toBeInTheDocument();
  });

  // Tests that the search bar is rendered if handleSearch prop is passed
  it("test_render_search_bar", () => {
    render(<Navigation handleSearch={handleSearch} />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  // Tests that the login button is rendered if user is not logged in
  it("test_render_login_button", () => {
    useAppContextState.mockReturnValue({ userInfo: null });

    render(<Navigation handleSearch={handleSearch} />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  // Tests that the logout button is rendered if user is logged in
  it("test_render_logout_button", () => {
    render(<Navigation handleSearch={handleSearch} />);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  // Tests that the search bar is not rendered if handleSearch function is not passed
  it("test_handle_search_function_not_passed", () => {
    render(<Navigation />);

    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });

  // Tests that clicking on login button when user is not logged in does not cause any errors
  it("test_logout_button_clicked_when_user_not_logged_in", () => {
    useAppContextState.mockReturnValue({ userInfo: null });

    // Mock console.error
    const consoleSpy = jest.spyOn(console, "error");

    render(<Navigation handleSearch={handleSearch} />);

    fireEvent.click(screen.getByText("Login"));

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
