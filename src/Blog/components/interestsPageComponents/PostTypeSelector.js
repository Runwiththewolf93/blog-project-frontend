import React from "react";

/**
 * Renders a PostTypeSelector component.
 *
 * @param {function} setPostType - A function to set the post type.
 * @param {string} typeText - The text to display after the post types.
 * @return {JSX.Element} The rendered PostTypeSelector component.
 */
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
