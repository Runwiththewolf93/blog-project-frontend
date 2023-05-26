import React from "react";
import { Card } from "react-bootstrap";
import BlogPost from "./BlogPost";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const BlogPosts = ({ blogDataToShow, userInfo }) => {
  return blogDataToShow.map(post => (
    <React.Fragment key={post._id}>
      <div id={post._id}></div>
      <BlogPost post={post} userInfo={userInfo} />
      <Card className="mb-3">
        <CommentList blogId={post._id} userInfo={userInfo} />
        <CommentForm blogId={post._id} />
      </Card>
    </React.Fragment>
  ));
};

export default BlogPosts;
