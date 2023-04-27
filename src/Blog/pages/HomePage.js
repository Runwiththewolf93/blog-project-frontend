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

  console.log(blogInfo);
  console.log(userInfo);

  const blogDataToShow = showMyPosts ? filteredMyPosts : filteredBlogData;

  // figure out why this isn't working
  console.log(blogDataToShow);

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
        blogInfo={blogInfo}
      />
    </Layout>
  );
};

export default HomePage;

// previously passed down props to message component
// blogData={blogData}
// setBlogData={blogDataSetter}

// previous used for setting blogData
// const [blogData, setBlogData] = useState(blog);

// previously used for persisting blogData and setting it
// useEffect(() => {
//   const storedData = localStorage.getItem("blogData");
//   if (storedData) {
//     setBlogData(JSON.parse(storedData));
//   } else {
//     setBlogData(blog);
//   }

//   window.addEventListener("beforeunload", () => {
//     localStorage.removeItem("blogData");
//   });
// }, []);

// const blogDataSetter = blogData => {
//   setBlogData(blogData);
// };

// no need to import blog data anymore
// import blog from "../data/blog";

// no longer being passed down to body component
// blogData={blogData}
// setBlogData={blogDataSetter}
// blogInfo={blogInfo}
// searchQuery={searchQuery}
