import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_ALL_USERS_BEGIN,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  LOGOUT_USER,
  RESET_USER_ERROR,
  RESET_USER_SUCCESS,
  RESET_WAS_LOGGED_OUT,
  RESET_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
  UPDATE_USER_PASSWORD_BEGIN,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  FORGOT_USER_PASSWORD_BEGIN,
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_ERROR,
  RESET_USER_PASSWORD_BEGIN,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const appReducer = (state, action) => {
  // register reducer
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userInfo: action.payload,
      error: null,
      success: true,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    };
  }
  // login reducer
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userInfo: action.payload,
      error: null,
      success: true,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
      success: false,
    };
  }
  // get all users reducer
  if (action.type === GET_ALL_USERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ALL_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload,
      error: null,
    };
  }
  if (action.type === GET_ALL_USERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }
  // logout reducer
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userInfo: null,
      isLoading: false,
      isLoadingBlog: false,
      error: null,
      errorBlog: null,
      wasLoggedOut: action.manualLogout,
      success: false,
    };
  }
  // reset error state
  if (action.type === RESET_USER_ERROR) {
    return { ...state, error: null };
  }
  // reset success state
  if (action.type === RESET_USER_SUCCESS) {
    return { ...state, success: false };
  }
  // reset wasLoggedOut state
  if (action.type === RESET_WAS_LOGGED_OUT) {
    return { ...state, wasLoggedOut: false };
  }
  // reset successMessage state
  if (action.type === RESET_SUCCESS_MESSAGE) {
    return { ...state, successMessage: "" };
  }
  // reset errorReset state
  if (action.type === RESET_ERROR_MESSAGE) {
    return { ...state, errorReset: null };
  }
  // update logged in user password
  if (action.type === UPDATE_USER_PASSWORD_BEGIN) {
    return { ...state, isLoadingReset: true };
  }
  if (action.type === UPDATE_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoadingReset: false,
      successMessage: action.payload,
      errorReset: null,
    };
  }
  if (action.type === UPDATE_USER_PASSWORD_ERROR) {
    return {
      ...state,
      isLoadingReset: false,
      errorReset: action.payload,
    };
  }
  // send email to user that forgot password
  if (action.type === FORGOT_USER_PASSWORD_BEGIN) {
    return { ...state, isLoadingReset: true };
  }
  if (action.type === FORGOT_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoadingReset: false,
      successMessage: action.payload,
      errorReset: null,
    };
  }
  if (action.type === FORGOT_USER_PASSWORD_ERROR) {
    return {
      ...state,
      isLoadingReset: false,
      errorReset: action.payload,
    };
  }
  // send email and reset user password
  if (action.type === RESET_USER_PASSWORD_BEGIN) {
    return { ...state, isLoadingReset: true };
  }
  if (action.type === RESET_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoadingReset: false,
      successMessage: action.payload,
      errorReset: null,
    };
  }
  if (action.type === RESET_USER_PASSWORD_ERROR) {
    return { ...state, isLoadingReset: false, errorReset: action.payload };
  }
};

export default appReducer;
