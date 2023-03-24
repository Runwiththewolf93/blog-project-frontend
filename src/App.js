import { useState, useEffect } from "react";
import Navbar from "./Blog/components/Navbar";
import Message from "./Blog/components/Message";
import Body from "./Blog/components/Body";
import placeholderImage from "./Blog/images/images.png";
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
  }, []);

  const handleAddPost = (title, text) => {
    const newBlogData = [
      ...blogData,
      {
        id: blogData.length + 1,
        title: title,
        date: new Date().toLocaleString(),
        avatar: { id: 1, src: placeholderImage, alt: "Avatar Image" },
        content: text,
        images: [
          { id: 1, src: placeholderImage, alt: "Image 1" },
          { id: 2, src: placeholderImage, alt: "Image 2" },
          { id: 3, src: placeholderImage, alt: "Image 3" },
        ],
      },
    ];
    setBlogData(newBlogData);
    localStorage.setItem("blogData", JSON.stringify(newBlogData));
  };

  const handleDeletePost = postId => {
    const updatedBlogPost = blogData.filter(post => post.id !== postId);
    setBlogData(updatedBlogPost);
    localStorage.removeItem("blogData");
  };

  return (
    <>
      <Navbar />
      <Message onAddPost={handleAddPost} />
      <Body
        onAddPost={handleAddPost}
        handleDeletePost={handleDeletePost}
        blogData={blogData}
      />
    </>
  );
}

export default App;
