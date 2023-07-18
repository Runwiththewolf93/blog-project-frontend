/**
 * The function `capitalizeFirstLetter` takes a string as input and returns the same string with the
 * first letter capitalized and the rest of the letters in lowercase.
 * @returns The function `capitalizeFirstLetter` returns a string with the first letter capitalized and
 * the rest of the letters in lowercase.
 */
const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * The `capitalizeName` function takes a name as input, splits it into an array of names, capitalizes
 * the first letter of each name, converts the rest of the letters to lowercase, and then joins the
 * names back together with a space.
 * @returns The function `capitalizeName` returns a string with each word capitalized.
 */
const capitalizeName = name => {
  const namesArray = name?.split(" ");
  const capitalizedNames = namesArray?.map(
    name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  );
  return capitalizedNames?.join(" ");
};

/**
 * Retrieves the latest avatar from the given blog posts based on the user ID.
 *
 * @param {Array} blogInfo - The array of blog posts to filter.
 * @param {Object} userInfo - The user information object containing the user ID.
 * @return {string|null} The latest avatar URL or null if no matching blog post is found.
 */
const getLatestAvatar = (blogInfo, userInfo) => {
  // Filter blog posts by user id and get the latest one
  const latestBlogPost = blogInfo
    ?.filter(post => post.user._id === userInfo?._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  // Extract avatar from latest blog post
  return latestBlogPost?.avatar;
};

/**
 * Processes the users by filtering out the current user, finding the latest blog post for each user, and retrieving their avatars.
 *
 * @param {Array} allUsers - An array of all the user objects.
 * @param {Object} userInfo - The user information object.
 * @param {Array} blogInfo - An array of all the blog post objects.
 * @return {Object} An object containing the filtered users, latest blog posts, and user avatars.
 */
const processUsers = (allUsers, userInfo, blogInfo) => {
  const allUsersCopy = [...allUsers];
  const filteredUsers = allUsersCopy?.filter(
    user => user._id !== userInfo?._id
  );

  const latestBlogPost = filteredUsers?.reduce((acc, user) => {
    const latestPost = blogInfo
      .filter(post => post.user._id === user._id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    return { ...acc, [user._id]: latestPost };
  }, {});

  const userAvatars = filteredUsers?.reduce((acc, user) => {
    const latestPost = latestBlogPost[user._id];
    return { ...acc, [user._id]: latestPost ? latestPost.avatar : null };
  }, {});

  return { filteredUsers, latestBlogPost, userAvatars };
};

/**
 * Concatenates two arrays, slices the resulting array to a maximum length, and returns the sliced array.
 *
 * @param {array} data - The original array.
 * @param {array} additionalData - The additional array to concatenate with the original array.
 * @param {number} maxLength - The maximum length of the resulting array.
 * @return {array} - The sliced array with a maximum length of 'maxLength'.
 */
const concatAndSliceData = (data, additionalData, maxLength) => {
  const numAdditionalData = Math.max(0, maxLength - data?.length);
  const concatenatedData = data.concat(
    additionalData?.slice(0, numAdditionalData)
  );
  return concatenatedData.slice(0, maxLength);
};

/**
 * Finds the most popular item based on a given vote key.
 *
 * @param {Array} items - An array of items to search through.
 * @param {string} voteKey - The key used for voting.
 * @return {Object} The most popular item.
 */
const findMostPopularItem = (items, voteKey) => {
  return items?.reduce(
    (prev, current) => {
      return Math.abs(current[voteKey]) > Math.abs(prev[voteKey])
        ? current
        : prev;
    },
    { [voteKey]: 0 }
  );
};

/**
 * Truncates the given content if it exceeds a certain length, adding an ellipsis at the end.
 *
 * @param {string} content - The content to truncate.
 * @param {number} length - The maximum length of the truncated content.
 * @param {string} [ellipsis="..."] - The ellipsis to add at the end of the truncated content.
 * @return {string} The truncated content.
 */
const truncateContent = (content, length, ellipsis = "...") => {
  if (content?.length > length) {
    return `${content.slice(0, length)}${ellipsis}`;
  }
  return content;
};

/**
 * The function `countUserVoteObjects` takes an array of vote objects and returns an object that counts
 * the number of vote objects for each user.
 * @returns The function `countUserVoteObjects` returns an object `userVoteCounts` which contains the
 * count of vote objects for each user.
 */
const countUserVoteObjects = voteInfo => {
  const userVoteCounts = {};

  // Count vote objects for each user
  voteInfo?.forEach(vote => {
    const { user } = vote;
    if (userVoteCounts[user]) {
      userVoteCounts[user]++;
    } else {
      userVoteCounts[user] = 1;
    }
  });

  return userVoteCounts;
};

/**
 * Sorts the given data based on the specified postType.
 *
 * @param {Array} data - The data to be sorted.
 * @param {string} postType - The type of post to sort by. Possible values are "popular", "upvoted", and "downvoted".
 * @return {Array} The sorted data.
 */
// sortData helper function
const sortData = (data, postType) => {
  // just in case
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  let sortedData = [...data];

  if (postType === "popular") {
    sortedData.sort((a, b) => Math.abs(b.totalVotes) - Math.abs(a.totalVotes));
  } else if (postType === "upvoted") {
    sortedData.sort((a, b) => b.totalVotes - a.totalVotes);
  } else if (postType === "downvoted") {
    sortedData.sort((a, b) => a.totalVotes - b.totalVotes);
  }

  return sortedData;
};

/**
 * Calculates the post with the most occurrences based on a given data array,
 * count property, calculation function, and blog information.
 *
 * @param {Array} data - The data array to be processed.
 * @param {string} countProp - The property to be used for counting occurrences.
 * @param {function} calcCount - The function used to calculate the count.
 * @param {Array} blogInfo - The array containing blog information.
 * @return {Object|null} - The blog post with the most occurrences or null if no
 * post is found.
 */
// calculateMostPost helper function
const calculateMostPost = (data, countProp, calcCount, blogInfo) => {
  const counts = data?.reduce((acc, curr) => {
    acc[curr[countProp]] = (acc[curr[countProp]] || 0) + calcCount(curr);
    return acc;
  }, {});

  const mostPostId =
    Object.keys(counts).length > 0
      ? Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
      : null;

  return mostPostId ? blogInfo.find(post => post._id === mostPostId) : null;
};

/**
 * Generates chart data based on the provided data, label key, and value key.
 *
 * @param {Object} data - The data to generate chart data from.
 * @param {string} labelKey - The key to use as the label in the chart data.
 * @param {string} valueKey - The key to use as the value in the chart data.
 * @return {Array} An array of objects representing the chart data.
 */
const generateChartData = (data, labelKey, valueKey) => {
  return Object.entries(data).map(([key, value]) => ({
    [labelKey]: key,
    [valueKey]: value,
  }));
};

/**
 * Handles errors and dispatches an error action.
 *
 * @param {Error} error - The error object.
 * @param {function} dispatch - The dispatch function.
 * @param {string} errorAction - The action type for the error.
 * @return {void}
 */
const errorHandler = (error, dispatch, errorAction) => {
  if (error.response) {
    dispatch({
      type: errorAction,
      payload: error.response.data.msg,
    });
  } else {
    dispatch({
      type: errorAction,
      payload: "Something went wrong",
    });
  }
};

// throw the error below to actually see the message
// throw { response: { data: { msg: "Oopsie Woopsie" } } };

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have passed since the last time the debounced function was
 * invoked.
 *
 * @param {function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @return {function} The debounced function.
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Filters out new items from the server data based on existing items.
 *
 * @param {Array} serverData - The data received from the server.
 * @param {Array} existingItems - The existing items.
 * @return {Array} The filtered data containing only new items.
 */
// filter new items helper function - much more performant
const filterNewItems = (serverData, existingItems) => {
  const existingIds = existingItems.map(item => item._id);
  return serverData.filter(item => !existingIds.includes(item._id));
};

export {
  capitalizeFirstLetter,
  capitalizeName,
  getLatestAvatar,
  processUsers,
  concatAndSliceData,
  findMostPopularItem,
  truncateContent,
  countUserVoteObjects,
  sortData,
  calculateMostPost,
  generateChartData,
  errorHandler,
  debounce,
  filterNewItems,
};
