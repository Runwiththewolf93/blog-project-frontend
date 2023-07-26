import { render, screen } from "@testing-library/react";
import Relationships from "./Relationships";
import { useAppContextState } from "../../store/appContext";
import useRandomUsers from "../../hooks/useRandomUsers";
import { processUsers, concatAndSliceData } from "../../utils/helper";

jest.mock("../../store/appContext", () => ({
  useAppContextState: jest.fn(),
}));
jest.mock("../../utils/helper", () => ({
  processUsers: jest.fn(),
  concatAndSliceData: jest.fn(),
}));

jest.mock("../../hooks/useRandomUsers", () => jest.fn());

processUsers.mockImplementation(() => ({
  filteredUsers: [],
  userAvatars: {},
}));
concatAndSliceData.mockImplementation(() => [
  {
    _id: "1234567890",
    name: "John Doe",
    picture: {
      thumbnail: "https://example.com/john-doe/thumbnail.jpg",
    },
  },
  {
    _id: "9876543210",
    name: "Jane Doe",
    picture: {
      thumbnail: "https://example.com/jane-doe/thumbnail.jpg",
    },
  },
]);
useAppContextState.mockReturnValue({
  isLoading: false,
  users: [],
  error: null,
});

describe("Relationships_function", () => {
  // Tests that the component renders with valid input props
  it("test_render_component_with_valid_input_props", () => {
    const userProfile = { gender: "male" };
    const userInfo = { name: "John Doe" };
    const blogInfo = { title: "My Blog" };

    render(
      <Relationships
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(
      screen.getByText(/Spends most of his time with:/i)
    ).toBeInTheDocument();
  });

  // Tests that the component renders with empty input props
  it("test_render_component_with_empty_input_props", () => {
    const userProfile = {};
    const userInfo = {};
    const blogInfo = {};
    render(
      <Relationships
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );
    expect(
      screen.getByText(/Spends most of his time with:/i)
    ).toBeInTheDocument();
  });

  // Tests that the component renders with missing required input props
  it("test_render_component_with_missing_required_input_props", () => {
    const userProfile = { gender: "male" };
    const userInfo = {};
    const blogInfo = {};

    render(
      <Relationships
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(
      screen.getByText(/Spends most of his time with:/i)
    ).toBeInTheDocument();
  });

  // Tests that the component renders with invalid input props
  it("test_render_component_with_invalid_input_props", () => {
    const userProfile = { gender: "invalid" };
    const userInfo = { name: "John Doe" };
    const blogInfo = { title: "My Blog" };

    render(
      <Relationships
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(
      screen.getByText(/Spends most of (his|her) time with:/i)
    ).toBeInTheDocument();
  });

  // Tests that the component renders with missing data from useRandomUsers hook
  it("test_render_component_with_missing_data_from_useRandomUsers_hook", () => {
    const userProfile = { gender: "male" };
    const userInfo = { name: "John Doe" };
    const blogInfo = { title: "My Blog" };
    jest.mock("../../hooks/useRandomUsers", () => () => ({
      filteredUsers: [],
      userAvatars: {},
    }));
    render(
      <Relationships
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );
    expect(
      screen.getByText(/Spends most of his time with:/i)
    ).toBeInTheDocument();
  });

  // Tests that the component renders with missing data from processUsers function
  it("test_render_component_with_missing_data_from_processUsers_function", () => {
    const userProfile = { gender: "male" };
    const userInfo = { name: "John Doe" };
    const blogInfo = { title: "My Blog" };
    jest.mock("../../utils/helper", () => ({
      processUsers: () => ({
        filteredUsers: [],
        userAvatars: {},
      }),
      concatAndSliceData: () => [],
    }));
    render(
      <Relationships
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );
    expect(
      screen.getByText(/Spends most of his time with:/i)
    ).toBeInTheDocument();
  });
});
