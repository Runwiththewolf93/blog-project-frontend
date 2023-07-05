import { renderHook, act } from "@testing-library/react";
import useVoteData from "./useVoteData";
import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";

jest.mock("../../store/blogContext", () => ({
  useBlogContextState: jest.fn(),
}));

jest.mock("../../store/commentContext", () => ({
  useCommentContextState: jest.fn(),
}));

jest.mock("../../store/voteContext", () => ({
  useVoteContextState: jest.fn(),
}));

// Unit tests:
test("useVoteData - type is 'blog' and there is a match in blogFilterLocalStorage", async () => {
  // Set up
  const type = "blog";
  const itemId = "64774060045c4f08f20147b2";
  const userInfo = { _id: "642da876a185c06e961be81a" };
  const blogFilterLocalStorage = [{ _id: "64774060045c4f08f20147b2" }];
  const commentFilterLocalStorage = [];
  const voteFilterLocalStorage = [
    {
      post: "64774060045c4f08f20147b2",
      user: "642da876a185c06e961be81a",
      vote: -1,
    },
  ];

  // Mock the context hooks
  useBlogContextState.mockReturnValue({ blogFilterLocalStorage });
  useCommentContextState.mockReturnValue({ commentFilterLocalStorage });
  useVoteContextState.mockReturnValue({ voteFilterLocalStorage });

  // Execution
  const { result } = renderHook(() => useVoteData(type, itemId, userInfo));

  console.log(result.current);

  // Assertion
  expect(result.current.currVote).toBe(-1);
  expect(result.current.totalVotes).toBe(-1);
});

test("useVoteData - type is 'comment' and there is a match in commentFilterLocalStorage", () => {
  // Set up
  const type = "comment";
  const itemId = "6495a67bb26ac3dfa9001c44";
  const userInfo = { _id: "642da876a185c06e961be81a" };
  const blogFilterLocalStorage = [];
  const commentFilterLocalStorage = [{ _id: "6495a67bb26ac3dfa9001c44" }];
  const voteFilterLocalStorage = [
    {
      post: "6495a67bb26ac3dfa9001c44",
      user: "642da876a185c06e961be81a",
      vote: 1,
    },
  ];

  // Mock the context hooks
  useBlogContextState.mockReturnValue({ blogFilterLocalStorage });
  useCommentContextState.mockReturnValue({ commentFilterLocalStorage });
  useVoteContextState.mockReturnValue({ voteFilterLocalStorage });

  // Execution
  const { result } = renderHook(() => useVoteData(type, itemId, userInfo));

  console.log(result.current);

  // Assertion
  expect(result.current.currVote).toBe(1);
  expect(result.current.totalVotes).toBe(1);
});

test("useVoteData - type is neither 'blog' nor 'comment' and there is no match in any filterLocalStorage", () => {
  // Set up
  const type = "other";
  const itemId = "someId";
  const userInfo = { _id: "userId" };
  const blogFilterLocalStorage = [];
  const commentFilterLocalStorage = [];
  const voteFilterLocalStorage = [];

  // Mock the context hooks
  useBlogContextState.mockReturnValue({ blogFilterLocalStorage });
  useCommentContextState.mockReturnValue({ commentFilterLocalStorage });
  useVoteContextState.mockReturnValue({ voteFilterLocalStorage });

  // Execution
  const { result } = renderHook(() => useVoteData(type, itemId, userInfo));

  // Assertion
  expect(result.current.currVote).toBeUndefined();
  expect(result.current.totalVotes).toBeUndefined();
});

test("useVoteData - type is 'comment' but there is no match in commentFilterLocalStorage", () => {
  // Set up
  const type = "comment";
  const itemId = "6495a67bb26ac3dfa9001c44"; // This item is not present in commentFilterLocalStorage
  const userInfo = { _id: "642da876a185c06e961be81a" };
  const blogFilterLocalStorage = [];
  const commentFilterLocalStorage = []; // Empty array, meaning no comment is in local storage
  const voteFilterLocalStorage = [];

  // Mock the context hooks
  useBlogContextState.mockReturnValue({ blogFilterLocalStorage });
  useCommentContextState.mockReturnValue({ commentFilterLocalStorage });
  useVoteContextState.mockReturnValue({ voteFilterLocalStorage });

  // Execution
  const { result } = renderHook(() => useVoteData(type, itemId, userInfo));

  // Assertion
  // Since there's no matching comment in local storage, both currVote and totalVotes should be undefined
  expect(result.current.currVote).toBeUndefined();
  expect(result.current.totalVotes).toBeUndefined();
});

test("useVoteData - type is 'blog' and there is a match in blogFilterLocalStorage but voteFilterLocalStorage is empty", () => {
  // Set up
  const type = "blog";
  const itemId = "64774060045c4f08f20147b2";
  const userInfo = { _id: "642da876a185c06e961be81a" };
  const blogFilterLocalStorage = [{ _id: "64774060045c4f08f20147b2" }];
  const commentFilterLocalStorage = [];
  const voteFilterLocalStorage = []; // Empty array, meaning no votes in local storage

  // Mock the context hooks
  useBlogContextState.mockReturnValue({ blogFilterLocalStorage });
  useCommentContextState.mockReturnValue({ commentFilterLocalStorage });
  useVoteContextState.mockReturnValue({ voteFilterLocalStorage });

  // Execution
  const { result } = renderHook(() => useVoteData(type, itemId, userInfo));

  // Assertion
  // Since there's no matching vote in local storage, both currVote and totalVotes should be 0
  expect(result.current.currVote).toBe(0);
  expect(result.current.totalVotes).toBe(0);
});

test("useVoteData - multiple votes from different users exist for a blog", () => {
  // Set up
  const type = "blog";
  const itemId = "6495a67bb26ac3dfa9001c44";
  const userInfo = { _id: "642da876a185c06e961be81a" };
  const blogFilterLocalStorage = [{ _id: "6495a67bb26ac3dfa9001c44" }];
  const commentFilterLocalStorage = [];
  const voteFilterLocalStorage = [
    {
      post: "6495a67bb26ac3dfa9001c44",
      user: "642da876a185c06e961be81a",
      vote: 1,
    },
    {
      post: "6495a67bb26ac3dfa9001c44",
      user: "63a876a185c06e961be81b2b",
      vote: -1,
    },
    {
      post: "6495a67bb26ac3dfa9001c44",
      user: "642fa876a185c06e961b381a",
      vote: 1,
    },
  ];

  // Mock the context hooks
  useBlogContextState.mockReturnValue({ blogFilterLocalStorage });
  useCommentContextState.mockReturnValue({ commentFilterLocalStorage });
  useVoteContextState.mockReturnValue({ voteFilterLocalStorage });

  // Execution
  const { result } = renderHook(() => useVoteData(type, itemId, userInfo));

  // Assertion
  // The current user's vote is 1
  expect(result.current.currVote).toBe(1);
  // The total votes should be 1 (1 + -1 + 1)
  expect(result.current.totalVotes).toBe(1);
});
