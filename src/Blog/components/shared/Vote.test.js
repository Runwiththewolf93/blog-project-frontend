import { render, screen, fireEvent } from "@testing-library/react";
import Vote from "./Vote";
import useVoteData from "./useVoteData";
import useVoteActions from "./useVoteActions";

// Mock the hooks
jest.mock("./useVoteData", () => jest.fn());
jest.mock("./useVoteActions", () => jest.fn());

// Tests that the Vote component is rendered with the correct props
it("test_render_vote_component", () => {
  // Arrange
  const type = "blog";
  const itemId = "645a31966273ccc2ce33a93f";
  const userInfo = {
    _id: "642da876a185c06e961be81a",
    name: "Stevan Zivanovic",
    email: "stevan@gmail.com",
    isAdmin: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmRhODc2YTE4NWMwNmU5NjFiZTgxYSIsImlhdCI6MTY4ODU1MDgwMiwiZXhwIjoxNjg4NTU2ODAyfQ.Flo5MlSlVFQcoUCL0rDghM26yOtdqyaDfHZFm5Df9Nk",
  };

  // Set the return values of the mocked hooks
  useVoteData.mockReturnValue({ currVote: 0, totalVotes: 0 });
  useVoteActions.mockReturnValue({
    currentVote: 0,
    handleUpVoteClick: jest.fn(),
    handleDownVoteClick: jest.fn(),
    handleDismissError: jest.fn(),
    isLoading: false,
    error: null,
  });

  // Act
  render(<Vote type={type} itemId={itemId} userInfo={userInfo} />);

  // Assert
  const upVoteButton = screen.getByTestId("upvote-button");
  const downVoteButton = screen.getByTestId("downvote-button");
  const voteCount = screen.getByText(/0/i);

  expect(upVoteButton).toBeInTheDocument();
  expect(downVoteButton).toBeInTheDocument();
  expect(voteCount).toBeInTheDocument();

  // Assert that the error icon is not present
  expect(screen.queryByRole("img", { name: /error/i })).not.toBeInTheDocument();
});

// Test if the handleUpVoteClick function is called when the upvote button is clicked
it("calls handleUpVoteClick function when upvote button is clicked", () => {
  // Arrange
  const type = "blog";
  const itemId = "645a31966273ccc2ce33a93f";
  const userInfo = {
    _id: "642da876a185c06e961be81a",
    name: "Stevan Zivanovic",
    email: "stevan@gmail.com",
    isAdmin: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmRhODc2YTE4NWMwNmU5NjFiZTgxYSIsImlhdCI6MTY4ODU1MDgwMiwiZXhwIjoxNjg4NTU2ODAyfQ.Flo5MlSlVFQcoUCL0rDghM26yOtdqyaDfHZFm5Df9Nk",
  };

  const handleUpVoteClick = jest.fn();

  // Set the return values of the mocked hooks
  useVoteData.mockReturnValue({ currVote: 0, totalVotes: 0 });
  useVoteActions.mockReturnValue({
    currentVote: 0,
    handleUpVoteClick,
    handleDownVoteClick: jest.fn(),
    handleDismissError: jest.fn(),
    isLoading: false,
    error: null,
  });

  // Act
  render(<Vote type={type} itemId={itemId} userInfo={userInfo} />);

  const upvoteButton = screen.getByTestId("upvote-button");

  fireEvent.click(upvoteButton);

  // Assert
  expect(handleUpVoteClick).toHaveBeenCalled();
});

// Test if the handleDownVoteClick function is called when the downvote button is clicked
it("calls handleDownVoteClick function when downvote button is clicked", () => {
  // Arrange
  const type = "blog";
  const itemId = "645a31966273ccc2ce33a93f";
  const userInfo = {
    _id: "642da876a185c06e961be81a",
    name: "Stevan Zivanovic",
    email: "stevan@gmail.com",
    isAdmin: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmRhODc2YTE4NWMwNmU5NjFiZTgxYSIsImlhdCI6MTY4ODU1MDgwMiwiZXhwIjoxNjg4NTU2ODAyfQ.Flo5MlSlVFQcoUCL0rDghM26yOtdqyaDfHZFm5Df9Nk",
  };

  const handleDownVoteClick = jest.fn();

  // Set the return values of the mocked hooks
  useVoteData.mockReturnValue({ currVote: 0, totalVotes: 0 });
  useVoteActions.mockReturnValue({
    currentVote: 0,
    handleUpVoteClick: jest.fn(),
    handleDownVoteClick,
    handleDismissError: jest.fn(),
    isLoading: false,
    error: null,
  });

  // Act
  render(<Vote type={type} itemId={itemId} userInfo={userInfo} />);

  const downvoteButton = screen.getByTestId("downvote-button");

  fireEvent.click(downvoteButton);

  // Assert
  expect(handleDownVoteClick).toHaveBeenCalled();
});

// Tests that the error message icon is displayed and can be clicked to dismiss the error message when there is an error
it("test_displays_error_message_when_there_is_an_error", () => {
  // Arrange
  const type = "blog";
  const itemId = "645a31966273ccc2ce33a93f";
  const userInfo = {
    _id: "642da876a185c06e961be81a",
    name: "Stevan Zivanovic",
    email: "stevan@gmail.com",
    isAdmin: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmRhODc2YTE4NWMwNmU5NjFiZTgxYSIsImlhdCI6MTY4ODU1MDgwMiwiZXhwIjoxNjg4NTU2ODAyfQ.Flo5MlSlVFQcoUCL0rDghM26yOtdqyaDfHZFm5Df9Nk",
  };

  const handleDismissError = jest.fn();

  // Set the return values of the mocked hooks
  useVoteData.mockReturnValue({ currVote: 0, totalVotes: 0 });
  useVoteActions.mockReturnValue({
    currentVote: 0,
    handleUpVoteClick: jest.fn(),
    handleDownVoteClick: jest.fn(),
    handleDismissError,
    isLoading: false,
    error: "Some error",
  });

  // Act
  render(<Vote type={type} itemId={itemId} userInfo={userInfo} />);

  const errorIcon = screen.getByTitle("Some error");

  // Check if the error icon is displayed
  expect(errorIcon).toBeInTheDocument();

  // Simulate a click on the error icon
  fireEvent.click(errorIcon);

  // Check if the handleDismissError function was called
  expect(handleDismissError).toHaveBeenCalled();
});

// Test for color change on button click
it("test_color_change_on_button_click", () => {
  // Arrange
  const type = "blog";
  const itemId = "645a31966273ccc2ce33a93f";
  const userInfo = {
    _id: "642da876a185c06e961be81a",
    name: "Stevan Zivanovic",
    email: "stevan@gmail.com",
    isAdmin: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmRhODc2YTE4NWMwNmU5NjFiZTgxYSIsImlhdCI6MTY4ODU1MDgwMiwiZXhwIjoxNjg4NTU2ODAyfQ.Flo5MlSlVFQcoUCL0rDghM26yOtdqyaDfHZFm5Df9Nk",
  };

  // Set the return values of the mocked hooks for initial render
  useVoteData.mockReturnValue({ currVote: 0, totalVotes: 0 });
  useVoteActions.mockReturnValue({
    currentVote: 0,
    handleUpVoteClick: jest.fn(),
    handleDownVoteClick: jest.fn(),
    handleDismissError: jest.fn(),
    isLoading: false,
    error: null,
  });

  // Act
  const { rerender } = render(
    <Vote type={type} itemId={itemId} userInfo={userInfo} />
  );

  const upvoteButton = screen.getByTestId("upvote-button");
  const downvoteButton = screen.getByTestId("downvote-button");

  // Simulate upvote
  useVoteActions.mockReturnValue({
    currentVote: 1,
    handleUpVoteClick: jest.fn(),
    handleDownVoteClick: jest.fn(),
    handleDismissError: jest.fn(),
    isLoading: false,
    error: null,
  });

  rerender(<Vote type={type} itemId={itemId} userInfo={userInfo} />);

  // Assert
  expect(upvoteButton).toHaveClass("text-primary");

  // Simulate downvote
  useVoteActions.mockReturnValue({
    currentVote: -1,
    handleUpVoteClick: jest.fn(),
    handleDownVoteClick: jest.fn(),
    handleDismissError: jest.fn(),
    isLoading: false,
    error: null,
  });

  rerender(<Vote type={type} itemId={itemId} userInfo={userInfo} />);

  // Assert
  expect(downvoteButton).toHaveClass("text-danger");
});

// Test whether the buttons are truly disabled during the loading state and whether any clicks on them are ignored.
it("test_for_loading_state", () => {
  // Arrange
  const type = "blog";
  const itemId = "645a31966273ccc2ce33a93f";
  const userInfo = {
    _id: "642da876a185c06e961be81a",
    name: "Stevan Zivanovic",
    email: "stevan@gmail.com",
    isAdmin: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmRhODc2YTE4NWMwNmU5NjFiZTgxYSIsImlhdCI6MTY4ODU1MDgwMiwiZXhwIjoxNjg4NTU2ODAyfQ.Flo5MlSlVFQcoUCL0rDghM26yOtdqyaDfHZFm5Df9Nk",
  };

  // Set the return values of the mocked hooks
  const mockHandleUpVoteClick = jest.fn();
  const mockHandleDownVoteClick = jest.fn();

  // Set the return values of the mocked hooks
  useVoteData.mockReturnValue({ currVote: 0, totalVotes: 0 });
  useVoteActions.mockReturnValue({
    currentVote: 0,
    handleUpVoteClick: mockHandleUpVoteClick,
    handleDownVoteClick: mockHandleDownVoteClick,
    handleDismissError: jest.fn(),
    isLoading: true, // Changed the loading to true
    error: null,
  });

  // Act
  render(<Vote type={type} itemId={itemId} userInfo={userInfo} />);

  const upvoteButton = screen.getByTestId("upvote-button");
  const downvoteButton = screen.getByTestId("downvote-button");

  // Assert
  expect(upvoteButton).toHaveClass("text-muted");
  expect(downvoteButton).toHaveClass("text-muted");

  // Fire click events
  fireEvent.click(upvoteButton);
  fireEvent.click(downvoteButton);

  // Ensure the onClick handlers were not called
  expect(mockHandleUpVoteClick).not.toHaveBeenCalled();
  expect(mockHandleDownVoteClick).not.toHaveBeenCalled();
});
