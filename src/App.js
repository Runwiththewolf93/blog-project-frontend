import { useState, useEffect } from "react";
import Navbar from "./Blog/components/Navbar";
import Message from "./Blog/components/Message";
import Body from "./Blog/components/Body";
import Footer from "./Blog/components/Footer";
import "./App.css";
import blog from "./Blog/data/blog";

function App() {
  const [blogData, setBlogData] = useState(blog);
  const [searchQuery, setSearchQuery] = useState("");

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
    <>
      <Navbar handleSearch={handleSearch} />
      <Message blogData={blogData} setBlogData={blogDataSetter} />
      <Body
        blogData={blogData}
        setBlogData={blogDataSetter}
        searchQuery={searchQuery}
      />
      <Footer />
    </>
  );
}

export default App;
