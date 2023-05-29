import { useRef, useCallback } from "react";
import Message from "../components/homePageComponents/Message";
import Body from "../components/homePageComponents/Body";
import Layout from "../components/shared/Layout";
import useBlogPosts from "../hooks/useBlogPosts";

const HomePage = () => {
  const searchTimeout = useRef();

  const {
    userInfo,
    setSearchQuery,
    showMyPosts,
    setShowMyPosts,
    blogDataToShow,
    getAllBlogPosts,
  } = useBlogPosts();

  const debouncedHandleSearch = useCallback(
    event => {
      event.preventDefault();
      const searchQuery = event.target.value.trim().toLowerCase();
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(
        () => setSearchQuery(searchQuery),
        500
      );
    },
    [setSearchQuery]
  );

  const toggleShowMyPosts = useCallback(() => {
    setShowMyPosts(!showMyPosts);
  }, [showMyPosts, setShowMyPosts]);

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
