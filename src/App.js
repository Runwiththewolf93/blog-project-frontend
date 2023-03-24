import { useState, useEffect } from "react";
import Navbar from "./Blog/components/Navbar";
import Message from "./Blog/components/Message";
import Body from "./Blog/components/Body";
import "./App.css";
import blog from "./Blog/data/blog";

function App() {
  const [blogData, setBlogData] = useState(blog);

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

  return (
    <>
      <Navbar />
      <Message blogData={blogData} setBlogData={blogDataSetter} />
      <Body blogData={blogData} setBlogData={blogDataSetter} />
    </>
  );
}

export default App;
