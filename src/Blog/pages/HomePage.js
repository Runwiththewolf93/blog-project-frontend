import { useState, useEffect, useRef } from "react";
import Message from "../components/homePageComponents/Message";
import Body from "../components/homePageComponents/Body";
import Layout from "../components/shared/Layout";
import { useAppContextState, useAppContextDispatch } from "../store/appContext";

const HomePage = () => {
  const { userInfo, postUpdated } = useAppContextState();
  const { getAllBlogPosts, setPostUpdated } = useAppContextDispatch();
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
      const fetchedBlogInfo = await getAllBlogPosts();

      if (showMyPosts) {
        setBlogDataToShow(
          fetchedBlogInfo?.filter(post => post.user?._id === userInfo?._id)
        );
      } else {
        setBlogDataToShow(
          fetchedBlogInfo?.filter(post =>
            post.title?.toLowerCase().includes(searchQuery)
          )
        );
      }
      setPostUpdated(false);
    };

    fetchBlogPosts();
    // eslint-disable-next-line
  }, [postUpdated, searchQuery, showMyPosts, userInfo?._id]);

  return (
    <Layout handleSearch={debouncedHandleSearch}>
      <Message
        userInfo={userInfo}
        getAllBlogPosts={getAllBlogPosts}
        toggleShowMyPosts={toggleShowMyPosts}
      />
      <Body userInfo={userInfo} blogDataToShow={blogDataToShow} />
    </Layout>
  );
};

export default HomePage;
