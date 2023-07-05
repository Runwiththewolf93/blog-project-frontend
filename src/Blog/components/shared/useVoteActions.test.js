import { renderHook, act } from "@testing-library/react";
import useVoteActions from "./useVoteActions";
import { VoteContextDispatch } from "../../store/voteContext";

const wrapper = ({ children }) => (
  <VoteContextDispatch.Provider
    value={{
      updateBlogVoteCount: jest.fn(),
      updateCommentVoteCount: jest.fn(),
    }}
  >
    {children}
  </VoteContextDispatch.Provider>
);

describe("useVoteActions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should initialize with correct initial values", async () => {
    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    expect(result.current.currentVote).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle upvote correctly", async () => {
    const updateBlogVoteCount = jest.fn().mockResolvedValue();
    const updateCommentVoteCount = jest.fn().mockResolvedValue();

    const wrapper = ({ children }) => (
      <VoteContextDispatch.Provider
        value={{ updateBlogVoteCount, updateCommentVoteCount }}
      >
        {children}
      </VoteContextDispatch.Provider>
    );

    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleUpVoteClick();
    });

    expect(result.current.currentVote).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle downvote correctly", async () => {
    const updateBlogVoteCount = jest.fn().mockResolvedValue();
    const updateCommentVoteCount = jest.fn().mockResolvedValue();

    const wrapper = ({ children }) => (
      <VoteContextDispatch.Provider
        value={{ updateBlogVoteCount, updateCommentVoteCount }}
      >
        {children}
      </VoteContextDispatch.Provider>
    );

    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleDownVoteClick();
    });

    expect(result.current.currentVote).toBe(-1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle dismissing error correctly", async () => {
    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    act(() => {
      result.current.handleDismissError();
    });

    expect(result.current.error).toBe(null);
  });

  it("should call updateBlogVoteCount for blog type on upvote", async () => {
    const updateBlogVoteCount = jest.fn().mockResolvedValue();
    const updateCommentVoteCount = jest.fn().mockResolvedValue();

    const wrapper = ({ children }) => (
      <VoteContextDispatch.Provider
        value={{ updateBlogVoteCount, updateCommentVoteCount }}
      >
        {children}
      </VoteContextDispatch.Provider>
    );

    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleUpVoteClick();
    });

    expect(updateBlogVoteCount).toHaveBeenCalledTimes(1);
    expect(updateCommentVoteCount).toHaveBeenCalledTimes(0);
  });

  it("should handle error correctly on upvote", async () => {
    const updateBlogVoteCount = jest
      .fn()
      .mockRejectedValue(new Error("Upvote failed"));
    const updateCommentVoteCount = jest.fn();

    const wrapper = ({ children }) => (
      <VoteContextDispatch.Provider
        value={{ updateBlogVoteCount, updateCommentVoteCount }}
      >
        {children}
      </VoteContextDispatch.Provider>
    );

    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleUpVoteClick();
    });

    expect(result.current.error).toBe("Upvote failed");
    expect(result.current.isLoading).toBe(false);
  });

  it("should toggle upvote correctly", async () => {
    const updateBlogVoteCount = jest.fn().mockResolvedValue();

    const wrapper = ({ children }) => (
      <VoteContextDispatch.Provider
        value={{ updateBlogVoteCount, updateCommentVoteCount: jest.fn() }}
      >
        {children}
      </VoteContextDispatch.Provider>
    );

    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleUpVoteClick(); // First upvote
    });

    expect(result.current.currentVote).toBe(1);
    expect(updateBlogVoteCount).toHaveBeenCalledTimes(1);
    expect(updateBlogVoteCount).toHaveBeenCalledWith(1, 1);

    await act(async () => {
      await result.current.handleUpVoteClick(); // Second upvote, should toggle
    });

    expect(result.current.currentVote).toBe(0);
    expect(updateBlogVoteCount).toHaveBeenCalledTimes(2);
    expect(updateBlogVoteCount).toHaveBeenCalledWith(1, 0);
  });

  it("should toggle downvote correctly", async () => {
    const updateBlogVoteCount = jest.fn().mockResolvedValue();

    const wrapper = ({ children }) => (
      <VoteContextDispatch.Provider
        value={{ updateBlogVoteCount, updateCommentVoteCount: jest.fn() }}
      >
        {children}
      </VoteContextDispatch.Provider>
    );

    const { result } = renderHook(() => useVoteActions("blog", 1, 0), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleDownVoteClick(); // First downvote
    });

    expect(result.current.currentVote).toBe(-1);
    expect(updateBlogVoteCount).toHaveBeenCalledTimes(1);
    expect(updateBlogVoteCount).toHaveBeenCalledWith(1, -1);

    await act(async () => {
      await result.current.handleDownVoteClick(); // Second downvote, should toggle
    });

    expect(result.current.currentVote).toBe(0);
    expect(updateBlogVoteCount).toHaveBeenCalledTimes(2);
    expect(updateBlogVoteCount).toHaveBeenCalledWith(1, 0);
  });
});
