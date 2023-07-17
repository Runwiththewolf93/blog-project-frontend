import React from "react";
import { Card } from "react-bootstrap";
import BlogPost from "./BlogPost";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

/**
 * Render a list of blog posts with comments and comment form.
 *
 * @param {Array} blogDataToShow - the list of blog posts to render
 * @param {Object} userInfo - the user information
 * @return {React.Fragment} - the rendered blog post list
 */
// BlogPosts component
const BlogPosts = ({ blogDataToShow, userInfo }) => {
  return blogDataToShow.map(post => (
    <React.Fragment key={post._id}>
      <div id={post._id} data-testid={`post-${post._id}`} />
      <BlogPost post={post} userInfo={userInfo} />
      <Card className="mb-3">
        <CommentForm blogId={post._id} />
        <CommentList blogId={post._id} userInfo={userInfo} />
      </Card>
    </React.Fragment>
  ));
};

export default BlogPosts;
