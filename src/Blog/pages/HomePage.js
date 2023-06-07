import { useRef, useCallback, useState, useEffect } from "react";
import Message from "../components/homePageComponents/Message";
import Body from "../components/homePageComponents/Body";
import Layout from "../components/shared/Layout";
import { useAppContextState, useAppContextDispatch } from "../store/appContext";

const HomePage = () => {
  const searchTimeout = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMyPosts, setShowMyPosts] = useState(false);
  const { userInfo, blogInfo } = useAppContextState();
  const { getAllBlogPosts, setPostUpdated } = useAppContextDispatch();

  useEffect(() => {
    getAllBlogPosts();
    setPostUpdated(false);
    // eslint-disable-next-line
  }, []);

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

  let blogDataToShow;

  if (showMyPosts) {
    blogDataToShow = blogInfo?.filter(post => post.user?._id === userInfo?._id);
  } else {
    blogDataToShow = blogInfo?.filter(post =>
      post.title?.toLowerCase().includes(searchQuery)
    );
  }

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
