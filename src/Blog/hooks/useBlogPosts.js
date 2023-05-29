import { useState, useEffect } from "react";
import { useAppContextState, useAppContextDispatch } from "../store/appContext";

const useBlogPosts = () => {
  const { userInfo, postUpdated } = useAppContextState();
  const { getAllBlogPosts, setPostUpdated } = useAppContextDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [blogDataToShow, setBlogDataToShow] = useState([]);

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

  return {
    userInfo,
    setSearchQuery,
    showMyPosts,
    setShowMyPosts,
    blogDataToShow,
    getAllBlogPosts,
  };
};

export default useBlogPosts;
