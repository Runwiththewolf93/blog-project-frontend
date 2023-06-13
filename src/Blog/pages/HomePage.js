import { useRef, useCallback, useState, useEffect } from "react";
import Message from "../components/homePageComponents/Message";
import Body from "../components/homePageComponents/Body";
import Layout from "../components/shared/Layout";
import { useAppContextState, useAppContextDispatch } from "../store/appContext";

// HomePage component
const HomePage = () => {
  const searchTimeout = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [isFiltering, setIsFiltering] = useState(true);
  const { userInfo, blogFilter, postUpdated } = useAppContextState();
  const { getAllBlogPosts, setPostUpdated } = useAppContextDispatch();

  useEffect(() => {
    getAllBlogPosts();
    setPostUpdated(false);
    // eslint-disable-next-line
  }, [postUpdated]);

  const debouncedHandleSearch = useCallback(
    event => {
      event.preventDefault();
      const searchQuery = event.target.value.trim().toLowerCase();
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setIsFiltering(true);
        setSearchQuery(searchQuery);
        setIsFiltering(false);
      }, 500);
    },
    [setSearchQuery]
  );

  const toggleShowMyPosts = useCallback(() => {
    setShowMyPosts(!showMyPosts);
  }, [showMyPosts, setShowMyPosts]);

  let blogDataToShow;

  if (showMyPosts) {
    blogDataToShow = blogFilter?.filter(
      post => post.user?._id === userInfo?._id
    );
  } else {
    blogDataToShow = blogFilter?.filter(post =>
      post.title?.toLowerCase().includes(searchQuery)
    );
  }

  console.log(blogDataToShow);

  return (
    <Layout handleSearch={debouncedHandleSearch}>
      <Message
        userInfo={userInfo}
        getAllBlogPosts={getAllBlogPosts}
        toggleShowMyPosts={toggleShowMyPosts}
        setSearchQuery={setSearchQuery}
        setShowMyPosts={setShowMyPosts}
      />
      <Body
        userInfo={userInfo}
        blogDataToShow={blogDataToShow}
        isFiltering={isFiltering}
      />
    </Layout>
  );
};

export default HomePage;
