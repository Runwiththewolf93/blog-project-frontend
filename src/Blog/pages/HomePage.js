import { useState, useEffect } from "react";
import Message from "../components/Message";
import Body from "../components/Body";
import Layout from "../components/Layout";
import { useAppContext } from "../components/store/appContext";

const HomePage = () => {
  const { getAllBlogPosts, deleteBlogPost, blogInfo, userInfo } =
    useAppContext();
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
    // eslint-disable-next-line
  }, []);

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
