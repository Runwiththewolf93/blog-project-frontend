import { useState, useEffect, useCallback } from "react";
import Message from "../components/Message";
import Body from "../components/Body";
import Layout from "../components/Layout";
import blog from "../data/blog";
import { useAppContext } from "../components/store/appContext";

const HomePage = () => {
  const { getAllBlogPosts, blogInfo } = useAppContext();
  const [blogData, setBlogData] = useState(blog);
  const [searchQuery, setSearchQuery] = useState("");

  useCallback(() => {
    getAllBlogPosts();
  }, [getAllBlogPosts]);

  console.log(blogInfo);

  useEffect(() => {
    const storedData = localStorage.getItem("blogData");
    if (storedData) {
      setBlogData(JSON.parse(storedData));
    } else {
      setBlogData(blog);
    }

    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("blogData");
    });
  }, []);

  const blogDataSetter = blogData => {
    setBlogData(blogData);
  };

  const handleSearch = event => {
    event.preventDefault();
    const searchQuery = event.target.value.trim().toLowerCase();
    setSearchQuery(searchQuery);
  };

  return (
    <Layout handleSearch={handleSearch}>
      <Message blogData={blogData} setBlogData={blogDataSetter} />
      <Body
        blogData={blogData}
        setBlogData={blogDataSetter}
        searchQuery={searchQuery}
      />
    </Layout>
  );
};

export default HomePage;
