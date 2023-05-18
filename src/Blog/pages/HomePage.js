import { useState, useEffect, useRef } from "react";
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
  const [blogDataToShow, setBlogDataToShow] = useState([]);
  const searchTimeout = useRef();

  const debouncedHandleSearch = event => {
    event.preventDefault();
    const searchQuery = event.target.value.trim().toLowerCase();
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => setSearchQuery(searchQuery), 500);
  };

  const toggleShowMyPosts = () => {
    setShowMyPosts(!showMyPosts);
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      await getAllBlogPosts();

      if (showMyPosts) {
        setBlogDataToShow(
          blogInfo.filter(post => post.user?._id === userInfo?._id)
        );
      } else {
        setBlogDataToShow(
          blogInfo.filter(post =>
            post.title?.toLowerCase().includes(searchQuery)
          )
        );
      }
      setPostUpdated(false);
    };

    fetchBlogPosts();
    // eslint-disable-next-line
  }, [postUpdated, searchQuery, showMyPosts, userInfo?._id]);

  console.log(blogDataToShow);

  return (
    <Layout handleSearch={debouncedHandleSearch}>
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
