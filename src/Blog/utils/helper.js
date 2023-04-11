const extractIds = data => {
  const ids = [];
  data.forEach(post => {
    ids.push(post.avatar.match(/[^/]*$/)[0].split("?")[0]);
    post.images.forEach(image => {
      ids.push(image.match(/[^/]*$/)[0].split("?")[0]);
    });
  });
  return ids;
};

export { extractIds };
