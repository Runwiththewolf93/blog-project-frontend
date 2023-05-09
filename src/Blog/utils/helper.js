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
  const filteredUsers = allUsers?.filter(user => user._id !== userInfo?._id);

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

export {
  capitalizeFirstLetter,
  capitalizeName,
  getLatestAvatar,
  processUsers,
  concatAndSliceData,
};
