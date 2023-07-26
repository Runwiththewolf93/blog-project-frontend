import { renderHook, act } from "@testing-library/react";
import {
  useCommentContextState,
  useCommentContextDispatch,
} from "../../store/commentContext";
import useFetchHighestVotedBlogComments from "./useFetchHighestVotedBlogComments";

jest.mock("../../store/commentContext", () => ({
  useCommentContextState: jest.fn().mockReturnValue({
    isLoadingComment: false,
    blogCommentInfo: [],
    errorComment: null,
  }),
  useCommentContextDispatch: jest.fn().mockReturnValue({
    getAllCommentsBlogPost: jest.fn(),
  }),
}));

describe("useFetchHighestVotedBlogComments", () => {
  it("calls getAllCommentsBlogPost with the correct argument", () => {
    const mockDispatch = jest.fn();
    useCommentContextDispatch.mockReturnValue({
      getAllCommentsBlogPost: mockDispatch,
    });

    const { rerender } = renderHook(useFetchHighestVotedBlogComments, {
      initialProps: [],
    });

    act(() => {
      rerender([
        { _id: "1", totalVotes: 10 },
        { _id: "2", totalVotes: 20 },
      ]);
    });

    expect(mockDispatch).toHaveBeenCalledWith("2");
  });

  it("returns the correct values from the hook", () => {
    const mockState = {
      isLoadingComment: false,
      blogCommentInfo: [{ id: 1, title: "Test comment" }],
      errorComment: null,
    };

    useCommentContextState.mockReturnValue(mockState);

    const { result } = renderHook(() => useFetchHighestVotedBlogComments([]));

    expect(result.current).toEqual(mockState);
  });

  it("does not call getAllCommentsBlogPost when blogInfo is empty or undefined", () => {
    const mockDispatch = jest.fn();
    useCommentContextDispatch.mockReturnValue({
      getAllCommentsBlogPost: mockDispatch,
    });

    const { rerender } = renderHook(useFetchHighestVotedBlogComments, {
      initialProps: [],
    });

    expect(mockDispatch).not.toHaveBeenCalled();

    rerender(undefined);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
