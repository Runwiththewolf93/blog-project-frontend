import React from "react";
import { Card } from "react-bootstrap";
import BlogPost from "./BlogPost";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const BlogPosts = ({
  blogDataToShow,
  userInfo,
  blogInfo,
  commentInfo,
  voteInfo,
  deleteBlogPost,
  getSingleBlogPost,
  deleteAllCommentsBlogPost,
  updateBlogVoteCount,
  updateCommentVoteCount,
  editCommentBlogPost,
  deleteCommentBlogPost,
}) => {
  return blogDataToShow.map(post => (
    <React.Fragment key={post._id}>
      <div id={post._id}></div>
      <BlogPost
        post={post}
        userInfo={userInfo}
        blogInfo={blogInfo}
        commentInfo={commentInfo}
        voteInfo={voteInfo}
        deleteBlogPost={deleteBlogPost}
        getSingleBlogPost={getSingleBlogPost}
        showPostOverlay={true}
        deleteAllCommentsBlogPost={deleteAllCommentsBlogPost}
        updateBlogVoteCount={updateBlogVoteCount}
      />
      <Card className="mb-3">
        <CommentList
          blogId={post._id}
          editCommentBlogPost={editCommentBlogPost}
          deleteCommentBlogPost={deleteCommentBlogPost}
          userInfo={userInfo}
          voteInfo={voteInfo}
          updateCommentVoteCount={updateCommentVoteCount}
        />
        <CommentForm blogId={post._id} />
      </Card>
    </React.Fragment>
  ));
};

export default BlogPosts;
