import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useCommentContext } from "./store/commentContext";
import Spinner from "./Spinner";

const CommentList = ({ blogId }) => {
  const {
    getAllCommentsBlogPost,
    isLoadingComment,
    commentInfo,
    errorComment,
  } = useCommentContext();

  useEffect(() => {
    getAllCommentsBlogPost(blogId);
    // eslint-disable-next-line
  }, []);

  const commentsForBlogPost = commentInfo.filter(
    comment => comment.blog === blogId
  );
  console.log(commentsForBlogPost);

  return (
    <>
      {isLoadingComment && <Spinner />}
      {errorComment && (
        <ListGroup className="mb-1">
          <ListGroup.Item variant="danger">{errorComment}</ListGroup.Item>
        </ListGroup>
      )}
      {commentsForBlogPost.length === 0 ? (
        <ListGroup className="mb-1" variant="flush">
          <ListGroup.Item>
            No comments? Be the first to comment on this post!
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <ListGroup className="mb-1">
          {commentsForBlogPost.map(comment => (
            <ListGroup.Item key={comment._id}>
              <h5>{comment.user.name}</h5>
              <p>{comment.comment}</p>
              <small>
                createdAt: {new Date(comment.createdAt).toLocaleString()}
              </small>
              <br />
              <small>
                updatedAt: {new Date(comment.updatedAt).toLocaleString()}
              </small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default CommentList;
