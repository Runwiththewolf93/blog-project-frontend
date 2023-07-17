// Actions
const SET_EDIT_COMMENT_ID = "SET_EDIT_COMMENT_ID";
const SET_EDITED_COMMENT = "SET_EDITED_COMMENT";
const SET_LOADING_COMMENT_ID = "SET_LOADING_COMMENT_ID";
const SET_ERROR_COMMENT_ID = "SET_ERROR_COMMENT_ID";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
const SET_SORTED_COMMENTS = "SET_SORTED_COMMENTS";

// Action creators
export const setEditCommentId = id => ({
  type: SET_EDIT_COMMENT_ID,
  payload: id,
});

export const setEditedComment = comment => ({
  type: SET_EDITED_COMMENT,
  payload: comment,
});

export const setLoadingCommentId = id => ({
  type: SET_LOADING_COMMENT_ID,
  payload: id,
});

export const setErrorCommentId = id => ({
  type: SET_ERROR_COMMENT_ID,
  payload: id,
});

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});

export const setSortedComments = comments => ({
  type: SET_SORTED_COMMENTS,
  payload: comments,
});

export const initialState = {
  editCommentId: null,
  editedComment: "",
  loadingCommentId: null,
  errorCommentId: null,
  errorMessage: "",
  sortedComments: [],
};

/**
 * Reducer function for managing comments state.
 *
 * @param {object} state - The current state.
 * @param {object} action - The action object.
 * @return {object} The updated state.
 */
export const commentsReducer = (state, action) => {
  switch (action.type) {
    case SET_EDIT_COMMENT_ID:
      if (!action.payload || typeof action.payload !== "string") {
        return state;
      }
      return {
        ...state,
        editCommentId: action.payload,
      };
    case SET_EDITED_COMMENT:
      if (!action.payload || typeof action.payload !== "string") {
        return state;
      }
      return {
        ...state,
        editedComment: action.payload,
      };
    case SET_LOADING_COMMENT_ID:
      if (!action.payload || typeof action.payload !== "string") {
        return state;
      }
      return {
        ...state,
        loadingCommentId: action.payload,
      };
    case SET_ERROR_COMMENT_ID:
      if (!action.payload || typeof action.payload !== "string") {
        return state;
      }
      return {
        ...state,
        errorCommentId: action.payload,
      };
    case SET_ERROR_MESSAGE:
      if (!action.payload || typeof action.payload !== "string") {
        return state;
      }
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SET_SORTED_COMMENTS:
      if (!action.payload || !Array.isArray(action.payload)) {
        return state;
      }
      return {
        ...state,
        sortedComments: action.payload,
      };
    default:
      return state;
  }
};
