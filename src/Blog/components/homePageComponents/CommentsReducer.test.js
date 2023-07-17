import {
  commentsReducer,
  setEditCommentId,
  setEditedComment,
  setSortedComments,
  setLoadingCommentId,
  setErrorCommentId,
  setErrorMessage,
} from "./CommentsReducer";

describe("commentsReducer_function", () => {
  // Tests that the reducer returns the initial state when no action is provided.
  it("test_initial_state", () => {
    const initialState = {
      editCommentId: null,
      editedComment: null,
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };

    const action = { type: "UNKNOWN_ACTION" };

    expect(commentsReducer(initialState, action)).toEqual(initialState);
  });

  // Tests that the reducer updates the state with the editCommentId when SET_EDIT_COMMENT_ID action is provided.
  it("test_set_edit_comment_id", () => {
    const initialState = {
      editCommentId: null,
      editedComment: null,
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };

    const action = setEditCommentId("1");

    const expectedState = {
      editCommentId: "1",
      editedComment: null,
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };

    expect(commentsReducer(initialState, action)).toEqual(expectedState);
  });

  // Tests that the reducer updates the state with the editedComment when SET_EDITED_COMMENT action is provided.
  it("test_set_edited_comment", () => {
    const initialState = {
      editCommentId: null,
      editedComment: null,
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };
    const action = setEditedComment("new comment");

    const expectedState = {
      editCommentId: null,
      editedComment: "new comment",
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };

    expect(commentsReducer(initialState, action)).toEqual(expectedState);
  });

  // Tests that the reducer returns the current state when an unknown action is provided.
  it("test_unknown_action", () => {
    const initialState = {
      editCommentId: null,
      editedComment: null,
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };

    const action = { type: /ab+c/ };

    expect(commentsReducer(initialState, action)).toEqual(initialState);
  });

  // Tests that the reducer returns the current state when SET_EDIT_COMMENT_ID action is provided with an invalid payload.
  it("test_invalid_payload", () => {
    const initialState = {
      editCommentId: null,
      editedComment: null,
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };

    const action = setEditCommentId(/ab+c/);

    expect(commentsReducer(initialState, action)).toEqual(initialState);
  });

  // Tests that the reducer returns the current state when SET_SORTED_COMMENTS action is provided with an invalid payload data type.
  it("test_unexpected_data_type", () => {
    const initialState = {
      editCommentId: null,
      editedComment: null,
      loadingCommentId: null,
      errorCommentId: null,
      errorMessage: null,
      sortedComments: [],
    };

    const action = setSortedComments("invalid payload");

    expect(commentsReducer(initialState, action)).toEqual(initialState);
  });

  // Tests that the state is updated with the loadingCommentId when SET_LOADING_COMMENT_ID action is provided.
  it("loading_comment_id_is_updated", () => {
    const initialState = {
      loadingCommentId: null,
    };

    const action = setLoadingCommentId("123");

    const expectedState = {
      loadingCommentId: "123",
    };

    const result = commentsReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  // Tests that the commentsReducer function updates the state with the errorCommentId when SET_ERROR_COMMENT_ID action is provided.
  it("test_reducer_updates_state_with_error_comment_id", () => {
    const initialState = {
      errorCommentId: null,
    };

    const action = setErrorCommentId("123");

    const expectedState = {
      errorCommentId: "123",
    };

    const result = commentsReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  // Tests that the commentsReducer function updates the state with the errorMessage when SET_ERROR_MESSAGE action is provided.
  it("reducer_updates_state_with_error_message", () => {
    const initialState = {
      errorMessage: null,
    };

    const action = setErrorMessage("Error message");

    const expectedState = {
      errorMessage: "Error message",
    };

    const result = commentsReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  // Tests that the reducer updates the state with the sortedComments when SET_SORTED_COMMENTS action is provided.
  it("test_sorted_comments_update", () => {
    const initialState = {
      sortedComments: [],
    };

    const action = setSortedComments([
      { id: 1, text: "comment 1" },
      { id: 2, text: "comment 2" },
    ]);

    const expectedState = {
      sortedComments: [
        { id: 1, text: "comment 1" },
        { id: 2, text: "comment 2" },
      ],
    };

    const result = commentsReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });
});
