const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const capitalizeName = name => {
  const namesArray = name?.split(" ");
  const capitalizedNames = namesArray?.map(
    name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  );
  return capitalizedNames?.join(" ");
};

const getLatestAvatar = (blogInfo, userInfo) => {
  // Filter blog posts by user id and get the latest one
  const latestBlogPost = blogInfo
    ?.filter(post => post.user._id === userInfo?._id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  // Extract avatar from latest blog post
  return latestBlogPost?.avatar;
};

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

const concatAndSliceData = (data, additionalData, maxLength) => {
  const numAdditionalData = Math.max(0, maxLength - data?.length);
  const concatenatedData = data.concat(
    additionalData?.slice(0, numAdditionalData)
  );
  return concatenatedData.slice(0, maxLength);
};

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

const truncateContent = (content, length, ellipsis = "...") => {
  if (content?.length > length) {
    return `${content.slice(0, length)}${ellipsis}`;
  }
  return content;
};

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

const sortData = (data, postType) => {
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

const calculateMostPost = (data, countProp, calcCount, blogInfo) => {
  const counts = data.reduce((acc, curr) => {
    acc[curr[countProp]] = (acc[curr[countProp]] || 0) + calcCount(curr);
    return acc;
  }, {});

  const mostPostId = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  return blogInfo.find(post => post._id === mostPostId);
};

const generateChartData = (data, labelKey, valueKey) => {
  return Object.entries(data).map(([key, value]) => ({
    [labelKey]: key,
    [valueKey]: value,
  }));
};

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
};
