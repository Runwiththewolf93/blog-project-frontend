import { useState, useEffect } from "react";
import Message from "../components/homePageComponents/Message";
import Body from "../components/homePageComponents/Body";
import Layout from "../components/shared/Layout";
import { useAppContext } from "../store/appContext";

const HomePage = () => {
  const {
    getAllBlogPosts,
    deleteBlogPost,
    blogInfo,
    userInfo,
    postUpdated,
    setPostUpdated,
  } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMyPosts, setShowMyPosts] = useState(false);

  const handleSearch = event => {
    event.preventDefault();
    const searchQuery = event.target.value.trim().toLowerCase();
    setSearchQuery(searchQuery);
  };

  const filteredBlogData = blogInfo.filter(post =>
    post.title?.toLowerCase().includes(searchQuery)
  );

  const filteredMyPosts = blogInfo.filter(
    post => post.user?._id === userInfo?._id
  );

  const toggleShowMyPosts = () => {
    setShowMyPosts(!showMyPosts);
  };

  useEffect(() => {
    getAllBlogPosts();
    setPostUpdated(false);
    // eslint-disable-next-line
  }, [postUpdated]);

  const blogDataToShow = showMyPosts ? filteredMyPosts : filteredBlogData;

  return (
    <Layout handleSearch={blogDataToShow === filteredBlogData && handleSearch}>
      <Message
        userInfo={userInfo}
        getAllBlogPosts={getAllBlogPosts}
        toggleShowMyPosts={toggleShowMyPosts}
      />
      <Body
        userInfo={userInfo}
        deleteBlogPost={deleteBlogPost}
        blogDataToShow={blogDataToShow}
      />
    </Layout>
  );
};

export default HomePage;
