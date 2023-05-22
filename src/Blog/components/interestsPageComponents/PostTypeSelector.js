import React from "react";

const PostTypeSelector = ({ setPostType, typeText }) => {
  const handlePostTypeChange = type => {
    setPostType(type);
  };

  return (
    <>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => handlePostTypeChange("popular")}
        className="text-light text-decoration-underline"
      >
        popular
      </span>{" "}
      /{" "}
      <span
        style={{ cursor: "pointer" }}
        onClick={() => handlePostTypeChange("upvoted")}
        className="text-light text-decoration-underline"
      >
        upvoted
      </span>{" "}
      /{" "}
      <span
        style={{ cursor: "pointer" }}
        onClick={() => handlePostTypeChange("downvoted")}
        className="text-light text-decoration-underline"
      >
        downvoted
      </span>{" "}
      {typeText}
    </>
  );
};

export default PostTypeSelector;
