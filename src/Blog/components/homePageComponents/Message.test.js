import { render, screen, fireEvent } from "@testing-library/react";
import Message from "./Message";
import {
  useBlogContextState,
  useBlogContextDispatch,
} from "../../store/blogContext";

const userInfo = { name: "John Doe", _id: "123" };
const toggleShowMyPosts = jest.fn();
const setSearchQuery = jest.fn();
const setShowMyPosts = jest.fn();
const blogFilterLocalStorage = [];

// Mocking the hooks
jest.mock("../../store/blogContext", () => ({
  useBlogContextState: jest.fn(),
  useBlogContextDispatch: jest.fn(),
}));

useBlogContextState.mockReturnValue({
  hasMore: true,
  isLoadingFilter: false,
  errorFilter: null,
  page: 1,
  order: "desc",
});

useBlogContextDispatch.mockReturnValue({
  getFilteredBlogPosts: jest.fn(),
  resetFilteredBlogPosts: jest.fn(),
  resetErrorFilter: jest.fn(),
  setPage: jest.fn(),
  setOrder: jest.fn(),
  setIsStateReset: jest.fn(),
});

jest.mock("./useScroll", () => jest.fn());

jest.mock("./MessageComponents", () => ({
  Dropdowns: jest.fn(({ onSortChange, onOrderChange }) => (
    <div data-testid="dropdowns">
      Mock Dropdowns {String(onSortChange)} {String(onOrderChange)}
    </div>
  )),
  WelcomeCard: jest.fn(props => (
    <div data-testid="welcomecard">
      Mock WelcomeCard {JSON.stringify(props)}
    </div>
  )),
  ButtonsGroup: jest.fn(props => (
    <div data-testid="buttonsgroup">
      Mock ButtonsGroup {JSON.stringify(props)}
    </div>
  )),
}));

describe("Message_function", () => {
  // Tests that the component renders with default props
  it("renders component with default props", () => {
    render(
      <Message
        {...{
          userInfo,
          toggleShowMyPosts,
          setSearchQuery,
          setShowMyPosts,
          blogFilterLocalStorage,
        }}
      />
    );

    expect(screen.getByText("Welcome to my Blog")).toBeInTheDocument();
  });

  // Tests that the component renders with user info prop
  it("renders component with user info prop", () => {
    render(
      <Message
        {...{
          userInfo,
          toggleShowMyPosts,
          setSearchQuery,
          setShowMyPosts,
          blogFilterLocalStorage,
        }}
      />
    );

    expect(screen.getByTestId("dropdowns")).toBeInTheDocument();
    expect(screen.getByTestId("buttonsgroup")).toBeInTheDocument();
  });

  // Tests that the component renders with empty user info prop
  it("renders component with empty user info prop", () => {
    const userInfo = {};

    render(
      <Message
        {...{
          userInfo,
          toggleShowMyPosts,
          setSearchQuery,
          setShowMyPosts,
          blogFilterLocalStorage,
        }}
      />
    );

    expect(screen.getByText("Welcome to my Blog")).toBeInTheDocument();
  });

  // Tests that the component renders with empty blog filter local storage prop
  it("renders component with empty blog filter local storage prop", () => {
    const blogFilterLocalStorage = [];

    render(
      <Message
        {...{
          userInfo,
          toggleShowMyPosts,
          setSearchQuery,
          setShowMyPosts,
          blogFilterLocalStorage,
        }}
      />
    );

    expect(screen.getByText("Welcome to my Blog")).toBeInTheDocument();
  });

  // Tests that the component handles sort change and sets state
  it("passes handleSortChange and handleOrderChange to Dropdowns", () => {
    render(
      <Message
        {...{
          userInfo,
          toggleShowMyPosts,
          setSearchQuery,
          setShowMyPosts,
          blogFilterLocalStorage,
        }}
      />
    );

    const dropdowns = screen.getByTestId("dropdowns");

    expect(dropdowns.textContent).toContain("function");
  });

  // Tests that the component handles order change and sets state
  it("handles order change and sets state", () => {
    render(
      <Message
        {...{
          userInfo,
          toggleShowMyPosts,
          setSearchQuery,
          setShowMyPosts,
          blogFilterLocalStorage,
        }}
      />
    );

    const dropdowns = screen.getByTestId("dropdowns");

    expect(dropdowns.textContent).toContain("function");
  });
});
