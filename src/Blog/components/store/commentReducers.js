import {
  GET_ALL_COMMENTS_BLOG_POST_BEGIN,
  GET_ALL_COMMENTS_BLOG_POST_SUCCESS,
  GET_ALL_COMMENTS_BLOG_POST_ERROR,
} from "./actions";

import { initialState } from "./commentContext";

const commentReducer = (state, action) => {
  // list available blog posts
  if (action.type === GET_ALL_COMMENTS_BLOG_POST_BEGIN) {
    return { ...state, isLoadingComment: true };
  }
  if (action.type === GET_ALL_COMMENTS_BLOG_POST_SUCCESS) {
    return {
      ...state,
      isLoadingComment: false,
      commentInfo: action.payload,
      errorComment: null,
    };
  }
  if (action.type === GET_ALL_COMMENTS_BLOG_POST_ERROR) {
    return { ...state, isLoadingComment: false, errorComment: action.payload };
  }
  return state;
};

export default commentReducer;
