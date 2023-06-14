// import React, { useReducer, useContext, useState } from "react";

// import appReducer from "./appReducer";
// import axios from "axios";
// import axiosRetry from "axios-retry";
// import { errorHandler, filterNewItems } from "../utils/helper";
// import {
//   REGISTER_USER_BEGIN,
//   REGISTER_USER_SUCCESS,
//   REGISTER_USER_ERROR,
//   LOGIN_USER_BEGIN,
//   LOGIN_USER_SUCCESS,
//   LOGIN_USER_ERROR,
//   GET_ALL_USERS_BEGIN,
//   GET_ALL_USERS_SUCCESS,
//   GET_ALL_USERS_ERROR,
//   LOGOUT_USER,
//   RESET_BLOG_POST,
//   RESET_USER_ERROR,
//   RESET_USER_SUCCESS,
//   RESET_BLOG_ERROR,
//   RESET_BLOG_LOADING,
//   RESET_WAS_LOGGED_OUT,
//   RESET_SUCCESS_MESSAGE,
//   RESET_ERROR_MESSAGE,
//   RESET_FILTERED_BLOG_POSTS,
//   RESET_ERROR_FILTER,
//   GET_ALL_BLOG_POSTS_BEGIN,
//   GET_ALL_BLOG_POSTS_SUCCESS,
//   GET_ALL_BLOG_POSTS_ERROR,
//   GET_FILTERED_BLOG_POSTS_BEGIN,
//   GET_FILTERED_BLOG_POSTS_SUCCESS,
//   ADD_FILTERED_BLOG_POSTS_SUCCESS,
//   GET_FILTERED_COMMENTS_SUCCESS,
//   ADD_FILTERED_COMMENTS_SUCCESS,
//   GET_FILTERED_VOTES_SUCCESS,
//   ADD_FILTERED_VOTES_SUCCESS,
//   GET_FILTERED_BLOG_POSTS_ERROR,
//   GET_FILTERED_COMMENTS_ERROR,
//   GET_FILTERED_VOTES_ERROR,
//   GET_SINGLE_BLOG_POST_BEGIN,
//   GET_SINGLE_BLOG_POST_SUCCESS,
//   GET_SINGLE_BLOG_POST_ERROR,
//   ADD_BLOG_POST_BEGIN,
//   ADD_BLOG_POST_SUCCESS,
//   ADD_BLOG_POST_ERROR,
//   EDIT_BLOG_POST_BEGIN,
//   EDIT_BLOG_POST_SUCCESS,
//   EDIT_BLOG_POST_ERROR,
//   DELETE_BLOG_POST_BEGIN,
//   DELETE_BLOG_POST_SUCCESS,
//   DELETE_BLOG_POST_ERROR,
//   UPDATE_USER_PASSWORD_BEGIN,
//   UPDATE_USER_PASSWORD_SUCCESS,
//   UPDATE_USER_PASSWORD_ERROR,
//   FORGOT_USER_PASSWORD_BEGIN,
//   FORGOT_USER_PASSWORD_SUCCESS,
//   FORGOT_USER_PASSWORD_ERROR,
//   RESET_USER_PASSWORD_BEGIN,
//   RESET_USER_PASSWORD_SUCCESS,
//   RESET_USER_PASSWORD_ERROR,
//   UPLOAD_BLOG_IMAGES_BEGIN,
//   UPLOAD_BLOG_IMAGES_SUCCESS,
//   UPLOAD_BLOG_IMAGES_ERROR,
// } from "./actions";

// export const userInfoFromLocalStorage =
//   JSON.parse(localStorage.getItem("userInfo")) || null;

// export const blogFilterFromLocalStorage =
//   JSON.parse(localStorage.getItem("blogFilter")) || [];

// const blogPostFromLocalStorage =
//   JSON.parse(localStorage.getItem("blogPost")) || {};

// // appContext initialState object
// const initialState = {
//   isLoading: false,
//   userInfo: userInfoFromLocalStorage,
//   users: [],
//   success: false,
//   error: null,
//   isLoadingBlog: true,
//   blogInfo: [],
//   blogPost: blogPostFromLocalStorage,
//   images: {},
//   errorBlog: null,
//   wasLoggedOut: false,
//   isLoadingReset: false,
//   successMessage: "",
//   errorReset: null,
//   isLoadingFilter: true,
//   blogFilter: blogFilterFromLocalStorage,
//   commentFilter: [],
//   voteFilter: [],
//   errorFilter: null,
// };

// const AppContextState = React.createContext();
// const AppContextDispatch = React.createContext();

// const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(appReducer, initialState);
//   const [postUpdated, setPostUpdated] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // axios
//   const authFetch = axios.create({
//     baseURL: "/api/v1",
//   });

//   // Set up axios-retry
//   axiosRetry(authFetch, { retries: 3 });

//   // request
//   authFetch.interceptors.request.use(
//     config => {
//       config.headers.Authorization = `Bearer ${state.userInfo.token}`;
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

//   // response
//   authFetch.interceptors.response.use(
//     response => {
//       return response;
//     },
//     error => {
//       if (error.response && error.response.status === 401) {
//         logoutUser();
//         window.location.href = "/";
//       }
//       return Promise.reject(error);
//     }
//   );

//   // dispatching below
//   const registerUser = async ({ name, email, password }) => {
//     dispatch({ type: REGISTER_USER_BEGIN });

//     try {
//       const { data } = await axios.post("/api/v1/auth/register", {
//         name,
//         email,
//         password,
//       });

//       dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//     } catch (error) {
//       errorHandler(error, dispatch, REGISTER_USER_ERROR);
//     }
//   };

//   const loginUser = async ({ email, password }) => {
//     dispatch({ type: LOGIN_USER_BEGIN });

//     try {
//       const { data } = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });

//       dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
//       localStorage.setItem("userInfo", JSON.stringify(data));

//       // Reset the wasLoggedOut flag
//       dispatch({ type: RESET_WAS_LOGGED_OUT });
//     } catch (error) {
//       errorHandler(error, dispatch, LOGIN_USER_ERROR);
//     }
//   };

//   const getAllUsers = async () => {
//     dispatch({ type: GET_ALL_USERS_BEGIN });

//     try {
//       const { data } = await authFetch.get("auth/users");
//       dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
//     } catch (error) {
//       errorHandler(error, dispatch, GET_ALL_USERS_ERROR);
//     }
//   };

//   const logoutUser = (manualLogout = false) => {
//     dispatch({ type: LOGOUT_USER, manualLogout });
//     localStorage.clear();
//   };

//   const resetBlogPost = () => {
//     dispatch({ type: RESET_BLOG_POST });
//     localStorage.removeItem("blogPost");
//   };

//   const resetUserError = () => {
//     dispatch({ type: RESET_USER_ERROR });
//   };

//   const resetUserSuccess = () => {
//     dispatch({ type: RESET_USER_SUCCESS });
//   };

//   const resetBlogError = () => {
//     dispatch({ type: RESET_BLOG_ERROR });
//   };

//   const resetSuccessMessage = () => {
//     dispatch({ type: RESET_SUCCESS_MESSAGE });
//   };

//   const resetErrorMessage = () => {
//     dispatch({ type: RESET_ERROR_MESSAGE });
//   };

//   const resetFilteredBlogPosts = () => {
//     dispatch({ type: RESET_FILTERED_BLOG_POSTS });
//   };

//   const resetErrorFilter = () => {
//     dispatch({ type: RESET_ERROR_FILTER });
//   };

//   const getAllBlogPosts = async () => {
//     dispatch({ type: GET_ALL_BLOG_POSTS_BEGIN });

//     try {
//       const { data } = await authFetch.get("/blog");

//       dispatch({ type: GET_ALL_BLOG_POSTS_SUCCESS, payload: data });
//       return data;
//     } catch (error) {
//       errorHandler(error, dispatch, GET_ALL_BLOG_POSTS_ERROR);
//     } finally {
//       dispatch({ type: RESET_BLOG_LOADING });
//     }
//   };

//   // getFilteredBlogPosts dispatch function
//   const getFilteredBlogPosts = async (
//     page = 1,
//     sort = "createdAt",
//     limit = 5,
//     order = "asc"
//   ) => {
//     // don't run dispatch function if user hasn't logged in
//     if (!state.userInfo) return;

//     dispatch({ type: GET_FILTERED_BLOG_POSTS_BEGIN });

//     try {
//       const { data: blogsData } = await authFetch.get(
//         `/blog/filtered/?page=${page}&sort=${sort}&limit=${limit}&order=${order}`
//       );

//       // Extract blogIds from the response
//       const blogIds = blogsData.posts.map(post => post._id);

//       // Fetch comments
//       const { data: commentsData } = await authFetch.post("/comment/filter", {
//         blogIds,
//       });

//       // Extract commentIds from the response
//       const commentIds = commentsData.map(comment => comment._id);

//       // Combine blogIds and commentIds into a single array
//       const postIds = [...blogIds, ...commentIds];

//       // Fetch votes
//       const { data: votesData } = await authFetch.post("/vote/filter", {
//         postIds,
//       });

//       // Set hasMore before filtering the posts and dispatching actions
//       setHasMore(blogsData.hasMore);

//       // Filter out any posts that are already in the blogFilter, commentFilter or voteFilter state
//       const newPosts = filterNewItems(blogsData.posts, state.blogFilter);
//       const newComments = filterNewItems(commentsData, state.commentFilter);
//       const newVotes = filterNewItems(votesData, state.voteFilter);

//       if (newPosts.length > 0) {
//         if (page === 1) {
//           dispatch({
//             // If this is the first page, replace the blogFilter state with the fetched posts
//             type: GET_FILTERED_BLOG_POSTS_SUCCESS,
//             payload: newPosts,
//           });
//           localStorage.setItem("blogFilter", JSON.stringify(newPosts));
//           dispatch({
//             type: GET_FILTERED_COMMENTS_SUCCESS,
//             payload: newComments,
//           });
//           dispatch({ type: GET_FILTERED_VOTES_SUCCESS, payload: newVotes });
//         } else {
//           dispatch({
//             // If this is not the first page, add the fetched posts to the blogFilter state
//             type: ADD_FILTERED_BLOG_POSTS_SUCCESS,
//             payload: newPosts,
//           });
//           localStorage.setItem("blogFilter", JSON.stringify(newPosts));
//           dispatch({
//             type: ADD_FILTERED_COMMENTS_SUCCESS,
//             payload: newComments,
//           });
//           dispatch({ type: ADD_FILTERED_VOTES_SUCCESS, payload: newVotes });
//         }
//       }
//       // test all of this out tomorrow
//     } catch (error) {
//       // get the error to not trigger if the user isn't logged in.
//       if (error.request?.url?.includes("/comment/filter")) {
//         errorHandler(error, dispatch, GET_FILTERED_COMMENTS_ERROR);
//       } else if (error.request?.url?.includes("/vote/filter")) {
//         errorHandler(error, dispatch, GET_FILTERED_VOTES_ERROR);
//       } else {
//         errorHandler(error, dispatch, GET_FILTERED_BLOG_POSTS_ERROR);
//       }
//     }
//   };

//   const getSingleBlogPost = async id => {
//     dispatch({ type: GET_SINGLE_BLOG_POST_BEGIN });

//     try {
//       const { data } = await axios.get(`/api/v1/blog/${id}`);

//       dispatch({ type: GET_SINGLE_BLOG_POST_SUCCESS, payload: data });
//       localStorage.setItem("blogPost", JSON.stringify(data));
//     } catch (error) {
//       errorHandler(error, dispatch, GET_SINGLE_BLOG_POST_ERROR);
//     }
//   };

//   const addBlogPost = async newPostData => {
//     dispatch({ type: ADD_BLOG_POST_BEGIN });

//     try {
//       const { data } = await authFetch.post("/blog", newPostData);

//       dispatch({ type: ADD_BLOG_POST_SUCCESS, payload: data });

//       const updatedBlogInfo = [...blogFilterFromLocalStorage, data];
//       localStorage.setItem("blogFilter", JSON.stringify(updatedBlogInfo));
//     } catch (error) {
//       errorHandler(error, dispatch, ADD_BLOG_POST_ERROR);
//     }
//   };

//   const uploadBlogImages = async formData => {
//     dispatch({ type: UPLOAD_BLOG_IMAGES_BEGIN });

//     try {
//       const { data } = await authFetch.post("/blog/images", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       dispatch({ type: UPLOAD_BLOG_IMAGES_SUCCESS, payload: data });
//       console.log(data);
//       return { avatar: data.avatar, images: data.images };
//     } catch (error) {
//       errorHandler(error, dispatch, UPLOAD_BLOG_IMAGES_ERROR);
//     }
//   };

//   // editBlogPost dispatch function
//   const editBlogPost = async ({ id, updatedValues }) => {
//     dispatch({ type: EDIT_BLOG_POST_BEGIN });

//     try {
//       const { data } = await authFetch.patch(`/blog/${id}`, updatedValues);

//       dispatch({ type: EDIT_BLOG_POST_SUCCESS, payload: data });
//       console.log(data);

//       const updatedBlogInfo = blogFilterFromLocalStorage.map(post =>
//         post._id === id ? data : post
//       );
//       localStorage.setItem("blogFilter", JSON.stringify(updatedBlogInfo));
//     } catch (error) {
//       errorHandler(error, dispatch, EDIT_BLOG_POST_ERROR);
//     }
//   };

//   const deleteBlogPost = async id => {
//     dispatch({ type: DELETE_BLOG_POST_BEGIN });

//     try {
//       await authFetch.delete(`/blog/${id}`);

//       dispatch({ type: DELETE_BLOG_POST_SUCCESS, payload: id });

//       const updatedBlogInfo = blogFilterFromLocalStorage.filter(
//         post => post._id !== id
//       );
//       localStorage.setItem("blogFilter", JSON.stringify(updatedBlogInfo));
//     } catch (error) {
//       errorHandler(error, dispatch, DELETE_BLOG_POST_ERROR);
//     }
//   };

//   const updateUserPassword = async ({ currentPassword, newPassword }) => {
//     dispatch({ type: UPDATE_USER_PASSWORD_BEGIN });

//     try {
//       await authFetch.patch("/auth/updateUserPassword", {
//         currentPassword,
//         newPassword,
//       });

//       dispatch({
//         type: UPDATE_USER_PASSWORD_SUCCESS,
//         payload: "Password updated successfully",
//       });
//     } catch (error) {
//       errorHandler(error, dispatch, UPDATE_USER_PASSWORD_ERROR);
//     }
//   };

//   const forgotUserPassword = async email => {
//     dispatch({ type: FORGOT_USER_PASSWORD_BEGIN });

//     try {
//       await axios.patch("/api/v1/auth/forgotPassword", { email });
//       dispatch({
//         type: FORGOT_USER_PASSWORD_SUCCESS,
//         payload: "Email sent successfully",
//       });
//     } catch (error) {
//       errorHandler(error, dispatch, FORGOT_USER_PASSWORD_ERROR);
//     }
//   };

//   const resetUserPassword = async ({ password, token }) => {
//     dispatch({ type: RESET_USER_PASSWORD_BEGIN });

//     try {
//       const { data } = await axios.patch(
//         `/api/v1/auth/resetPassword/${token}`,
//         {
//           password,
//         }
//       );

//       dispatch({
//         type: RESET_USER_PASSWORD_SUCCESS,
//         payload: data.msg,
//       });

//       dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
//       localStorage.setItem("userInfo", JSON.stringify(data.user));
//     } catch (error) {
//       errorHandler(error, dispatch, RESET_USER_PASSWORD_ERROR);
//     }
//   };

//   // scrollToBlogPost dispatch function
//   const scrollToBlogPost = postId => {
//     const blogPostElement = document.getElementById(postId);
//     if (blogPostElement) {
//       blogPostElement.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <AppContextState.Provider
//       value={{
//         ...state,
//         postUpdated,
//         hasMore,
//       }}
//     >
//       <AppContextDispatch.Provider
//         value={{
//           // dispatch functions
//           registerUser,
//           loginUser,
//           getAllUsers,
//           logoutUser,
//           resetBlogPost,
//           resetUserError,
//           resetUserSuccess,
//           resetBlogError,
//           resetSuccessMessage,
//           resetErrorMessage,
//           resetFilteredBlogPosts,
//           resetErrorFilter,
//           getAllBlogPosts,
//           getFilteredBlogPosts,
//           getSingleBlogPost,
//           addBlogPost,
//           editBlogPost,
//           deleteBlogPost,
//           updateUserPassword,
//           forgotUserPassword,
//           resetUserPassword,
//           uploadBlogImages,
//           // state functions
//           setPostUpdated,
//           scrollToBlogPost,
//         }}
//       >
//         {children}
//       </AppContextDispatch.Provider>
//     </AppContextState.Provider>
//   );
// };

// const useAppContextState = () => {
//   return useContext(AppContextState);
// };

// const useAppContextDispatch = () => {
//   return useContext(AppContextDispatch);
// };

// export { AppProvider, initialState, useAppContextState, useAppContextDispatch };

// import {
//   REGISTER_USER_BEGIN,
//   REGISTER_USER_SUCCESS,
//   REGISTER_USER_ERROR,
//   LOGIN_USER_BEGIN,
//   LOGIN_USER_SUCCESS,
//   LOGIN_USER_ERROR,
//   GET_ALL_USERS_BEGIN,
//   GET_ALL_USERS_SUCCESS,
//   GET_ALL_USERS_ERROR,
//   LOGOUT_USER,
//   RESET_BLOG_POST,
//   RESET_USER_ERROR,
//   RESET_USER_SUCCESS,
//   RESET_BLOG_ERROR,
//   RESET_BLOG_LOADING,
//   RESET_WAS_LOGGED_OUT,
//   RESET_SUCCESS_MESSAGE,
//   RESET_ERROR_MESSAGE,
//   RESET_FILTERED_BLOG_POSTS,
//   RESET_ERROR_FILTER,
//   GET_ALL_BLOG_POSTS_BEGIN,
//   GET_ALL_BLOG_POSTS_SUCCESS,
//   GET_ALL_BLOG_POSTS_ERROR,
//   GET_FILTERED_BLOG_POSTS_BEGIN,
//   GET_FILTERED_BLOG_POSTS_SUCCESS,
//   ADD_FILTERED_BLOG_POSTS_SUCCESS,
//   GET_FILTERED_COMMENTS_SUCCESS,
//   ADD_FILTERED_COMMENTS_SUCCESS,
//   GET_FILTERED_VOTES_SUCCESS,
//   ADD_FILTERED_VOTES_SUCCESS,
//   GET_FILTERED_BLOG_POSTS_ERROR,
//   GET_FILTERED_COMMENTS_ERROR,
//   GET_FILTERED_VOTES_ERROR,
//   GET_SINGLE_BLOG_POST_BEGIN,
//   GET_SINGLE_BLOG_POST_SUCCESS,
//   GET_SINGLE_BLOG_POST_ERROR,
//   ADD_BLOG_POST_BEGIN,
//   ADD_BLOG_POST_SUCCESS,
//   ADD_BLOG_POST_ERROR,
//   EDIT_BLOG_POST_BEGIN,
//   EDIT_BLOG_POST_SUCCESS,
//   EDIT_BLOG_POST_ERROR,
//   DELETE_BLOG_POST_BEGIN,
//   DELETE_BLOG_POST_SUCCESS,
//   DELETE_BLOG_POST_ERROR,
//   UPDATE_USER_PASSWORD_BEGIN,
//   UPDATE_USER_PASSWORD_SUCCESS,
//   UPDATE_USER_PASSWORD_ERROR,
//   FORGOT_USER_PASSWORD_BEGIN,
//   FORGOT_USER_PASSWORD_SUCCESS,
//   FORGOT_USER_PASSWORD_ERROR,
//   RESET_USER_PASSWORD_BEGIN,
//   RESET_USER_PASSWORD_SUCCESS,
//   RESET_USER_PASSWORD_ERROR,
//   UPLOAD_BLOG_IMAGES_BEGIN,
//   UPLOAD_BLOG_IMAGES_SUCCESS,
//   UPLOAD_BLOG_IMAGES_ERROR,
// } from "./actions";

// import { initialState } from "./appContext";

// const appReducer = (state, action) => {
//   // register reducer
//   if (action.type === REGISTER_USER_BEGIN) {
//     return { ...state, isLoading: true };
//   }
//   if (action.type === REGISTER_USER_SUCCESS) {
//     return {
//       ...state,
//       isLoading: false,
//       userInfo: action.payload,
//       error: null,
//       success: true,
//     };
//   }
//   if (action.type === REGISTER_USER_ERROR) {
//     return {
//       ...state,
//       isLoading: false,
//       error: action.payload,
//       success: false,
//     };
//   }
//   // login reducer
//   if (action.type === LOGIN_USER_BEGIN) {
//     return { ...state, isLoading: true };
//   }
//   if (action.type === LOGIN_USER_SUCCESS) {
//     return {
//       ...state,
//       isLoading: false,
//       userInfo: action.payload,
//       error: null,
//       success: true,
//     };
//   }
//   if (action.type === LOGIN_USER_ERROR) {
//     return {
//       ...state,
//       isLoading: false,
//       error: action.payload,
//       success: false,
//     };
//   }
//   // get all users reducer
//   if (action.type === GET_ALL_USERS_BEGIN) {
//     return { ...state, isLoading: true };
//   }
//   if (action.type === GET_ALL_USERS_SUCCESS) {
//     return {
//       ...state,
//       isLoading: false,
//       users: action.payload,
//       error: null,
//     };
//   }
//   if (action.type === GET_ALL_USERS_ERROR) {
//     return {
//       ...state,
//       isLoading: false,
//       error: action.payload,
//     };
//   }
//   // logout reducer
//   if (action.type === LOGOUT_USER) {
//     return {
//       ...initialState,
//       userInfo: null,
//       isLoading: false,
//       isLoadingBlog: false,
//       error: null,
//       errorBlog: null,
//       wasLoggedOut: action.manualLogout,
//     };
//   }
//   // reset blogPost state
//   if (action.type === RESET_BLOG_POST) {
//     return { ...state, blogPost: {} };
//   }
//   // reset error state
//   if (action.type === RESET_USER_ERROR) {
//     return { ...state, error: null };
//   }
//   // reset success state
//   if (action.type === RESET_USER_SUCCESS) {
//     return { ...state, success: false };
//   }
//   // reset blog error
//   if (action.type === RESET_BLOG_ERROR) {
//     return { ...state, errorBlog: null };
//   }
//   // reset blog loading
//   if (action.type === RESET_BLOG_LOADING) {
//     return { ...state, isLoadingBlog: false };
//   }
//   // reset wasLoggedOut state
//   if (action.type === RESET_WAS_LOGGED_OUT) {
//     return { ...state, wasLoggedOut: false };
//   }
//   // reset successMessage state
//   if (action.type === RESET_SUCCESS_MESSAGE) {
//     return { ...state, successMessage: "" };
//   }
//   // reset errorReset state
//   if (action.type === RESET_ERROR_MESSAGE) {
//     return { ...state, errorReset: null };
//   }
//   // reset filtered blog posts
//   if (action.type === RESET_FILTERED_BLOG_POSTS) {
//     return { ...state, blogFilter: [] };
//   }
//   // reset errorFilter state
//   if (action.type === RESET_ERROR_FILTER) {
//     return { ...state, errorFilter: null };
//   }
//   // list available blog posts - keep blog info here
//   if (action.type === GET_ALL_BLOG_POSTS_BEGIN) {
//     return { ...state, isLoadingBlog: true };
//   }
//   if (action.type === GET_ALL_BLOG_POSTS_SUCCESS) {
//     return {
//       ...state,
//       isLoadingBlog: false,
//       blogInfo: action.payload,
//       errorBlog: null,
//     };
//   }
//   if (action.type === GET_ALL_BLOG_POSTS_ERROR) {
//     return { ...state, isLoadingBlog: false, errorBlog: action.payload };
//   }
//   // list filtered blog posts, comments, and votes
//   if (action.type === GET_FILTERED_BLOG_POSTS_BEGIN) {
//     return { ...state, isLoadingFilter: true };
//   }
//   if (action.type === GET_FILTERED_BLOG_POSTS_SUCCESS) {
//     return {
//       ...state,
//       isLoadingFilter: false,
//       blogFilter: action.payload,
//       errorFilter: null,
//     };
//   }
//   if (action.type === ADD_FILTERED_BLOG_POSTS_SUCCESS) {
//     return {
//       ...state,
//       isLoadingFilter: false,
//       blogFilter: [...state.blogFilter, ...action.payload],
//       errorFilter: null,
//     };
//   }
//   if (action.type === GET_FILTERED_COMMENTS_SUCCESS) {
//     return {
//       ...state,
//       isLoadingFilter: false,
//       commentFilter: action.payload,
//       errorFilter: null,
//     };
//   }
//   if (action.type === ADD_FILTERED_COMMENTS_SUCCESS) {
//     return {
//       ...state,
//       isLoadingFilter: false,
//       commentFilter: [...state.commentFilter, ...action.payload],
//       errorFilter: null,
//     };
//   }
//   if (action.type === GET_FILTERED_VOTES_SUCCESS) {
//     return {
//       ...state,
//       isLoadingFilter: false,
//       voteFilter: action.payload,
//       errorFilter: null,
//     };
//   }
//   if (action.type === ADD_FILTERED_VOTES_SUCCESS) {
//     return {
//       ...state,
//       isLoadingFilter: false,
//       voteFilter: [...state.voteFilter, ...action.payload],
//       errorFilter: null,
//     };
//   }
//   if (action.type === GET_FILTERED_BLOG_POSTS_ERROR) {
//     return { ...state, isLoadingFilter: false, errorFilter: action.payload };
//   }
//   if (action.type === GET_FILTERED_COMMENTS_ERROR) {
//     return { ...state, isLoadingFilter: false, errorFilter: action.payload };
//   }
//   if (action.type === GET_FILTERED_VOTES_ERROR) {
//     return { ...state, isLoadingFilter: false, errorFilter: action.payload };
//   }
//   // get single blog post
//   if (action.type === GET_SINGLE_BLOG_POST_BEGIN) {
//     return { ...state, isLoadingBlog: true };
//   }
//   if (action.type === GET_SINGLE_BLOG_POST_SUCCESS) {
//     return {
//       ...state,
//       isLoadingBlog: false,
//       blogPost: action.payload,
//       errorBlog: null,
//     };
//   }
//   if (action.type === GET_SINGLE_BLOG_POST_ERROR) {
//     return { ...state, isLoadingBlog: false, errorBlog: action.payload };
//   }
//   // add a new blog post
//   if (action.type === ADD_BLOG_POST_BEGIN) {
//     return { ...state, isLoadingBlog: true };
//   }
//   if (action.type === ADD_BLOG_POST_SUCCESS) {
//     return {
//       ...state,
//       isLoadingBlog: false,
//       blogFilter: [...state.blogFilter, action.payload],
//       errorBlog: null,
//     };
//   }
//   if (action.type === ADD_BLOG_POST_ERROR) {
//     return { ...state, isLoadingBlog: false, errorBlog: action.payload };
//   }
//   // edit an existing blog post
//   if (action.type === EDIT_BLOG_POST_BEGIN) {
//     return { ...state, isLoadingBlog: true };
//   }
//   if (action.type === EDIT_BLOG_POST_SUCCESS) {
//     const updatedBlogInfo = state.blogFilter.map(post => {
//       if (post._id === action.payload._id) {
//         return action.payload;
//       } else {
//         return post;
//       }
//     });
//     return {
//       ...state,
//       isLoadingBlog: false,
//       blogInfo: updatedBlogInfo,
//       blogFilter: updatedBlogInfo,
//       errorBlog: null,
//     };
//   }
//   if (action.type === EDIT_BLOG_POST_ERROR) {
//     return { ...state, isLoadingBlog: false, errorBlog: action.payload };
//   }
//   // delete an existing blog post
//   if (action.type === DELETE_BLOG_POST_BEGIN) {
//     return { ...state, isLoadingBlog: true };
//   }
//   if (action.type === DELETE_BLOG_POST_SUCCESS) {
//     const updatedBlogInfo = state.blogInfo.filter(
//       post => post._id !== action.payload
//     );
//     return {
//       ...state,
//       isLoadingBlog: false,
//       blogInfo: updatedBlogInfo,
//       errorBlog: null,
//     };
//   }
//   if (action.type === DELETE_BLOG_POST_ERROR) {
//     return { ...state, isLoadingBlog: false, errorBlog: action.payload };
//   }
//   // update logged in user password
//   if (action.type === UPDATE_USER_PASSWORD_BEGIN) {
//     return { ...state, isLoadingReset: true };
//   }
//   if (action.type === UPDATE_USER_PASSWORD_SUCCESS) {
//     return {
//       ...state,
//       isLoadingReset: false,
//       successMessage: action.payload,
//       errorReset: null,
//     };
//   }
//   if (action.type === UPDATE_USER_PASSWORD_ERROR) {
//     return {
//       ...state,
//       isLoadingReset: false,
//       errorReset: action.payload,
//     };
//   }
//   // send email to user that forgot password
//   if (action.type === FORGOT_USER_PASSWORD_BEGIN) {
//     return { ...state, isLoadingReset: true };
//   }
//   if (action.type === FORGOT_USER_PASSWORD_SUCCESS) {
//     return {
//       ...state,
//       isLoadingReset: false,
//       successMessage: action.payload,
//       errorReset: null,
//     };
//   }
//   if (action.type === FORGOT_USER_PASSWORD_ERROR) {
//     return {
//       ...state,
//       isLoadingReset: false,
//       errorReset: action.payload,
//     };
//   }
//   // send email and reset user password
//   if (action.type === RESET_USER_PASSWORD_BEGIN) {
//     return { ...state, isLoadingReset: true };
//   }
//   if (action.type === RESET_USER_PASSWORD_SUCCESS) {
//     return {
//       ...state,
//       isLoadingReset: false,
//       successMessage: action.payload,
//       errorReset: null,
//     };
//   }
//   if (action.type === RESET_USER_PASSWORD_ERROR) {
//     return { ...state, isLoadingReset: false, errorReset: action.payload };
//   }
//   // upload images to cloudinary
//   if (action.type === UPLOAD_BLOG_IMAGES_BEGIN) {
//     return { ...state, isLoadingBlog: true };
//   }
//   if (action.type === UPLOAD_BLOG_IMAGES_SUCCESS) {
//     return {
//       ...state,
//       isLoadingBlog: false,
//       images: action.payload,
//       errorBlog: null,
//     };
//   }
//   if (action.type === UPLOAD_BLOG_IMAGES_ERROR) {
//     return { ...state, isLoadingBlog: false, errorBlog: action.payload };
//   }
//   return { ...state, isLoadingBlog: false };
// };
// export default appReducer;
