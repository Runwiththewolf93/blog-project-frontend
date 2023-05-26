import React, { useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useAppContext } from "../../store/appContext";
import { useCommentContext } from "../../store/commentContext";
import { useVoteContext } from "../../store/voteContext";
import BlogSections from "./BlogSections";
import BlogPosts from "./BlogPosts";
import Spinner from "../shared/Spinner";
import ScrollToTopPopup from "./ButtonOverlay";

const Body = ({ userInfo, deleteBlogPost, blogDataToShow }) => {
  const {
    blogInfo,
    getSingleBlogPost,
    isLoadingBlog,
    errorBlog,
    wasLoggedOut,
  } = useAppContext();
  const {
    getAllComments,
    editCommentBlogPost,
    deleteCommentBlogPost,
    deleteAllCommentsBlogPost,
    isLoadingComment,
    commentInfo,
  } = useCommentContext();
  const {
    voteInfo,
    getAllVotes,
    updateBlogVoteCount,
    updateCommentVoteCount,
    isLoadingVote,
  } = useVoteContext();

  useEffect(() => {
    console.log("userInfo?_id:", userInfo?._id);

    const fetchAllData = async () => {
      await Promise.all([getAllComments(), getAllVotes()]);
    };
    fetchAllData();
    // eslint-disable-next-line
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Alert variant="info" className="fs-5">
          {wasLoggedOut
            ? "Please log in to view available blog posts"
            : "Session expired, please log in to view available blog posts"}
        </Alert>
      </div>
    );
  }

  if (errorBlog) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Alert variant="danger">{errorBlog}</Alert>;
      </div>
    );
  }

  if (
    isLoadingBlog ||
    isLoadingComment ||
    isLoadingVote ||
    !blogDataToShow ||
    !commentInfo ||
    !voteInfo
  ) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Spinner />
      </div>
    );
  }

  if (blogDataToShow.length === 0) {
    return (
      <div className="d-flex justify-content-center mb-3">
        <Alert variant="danger">No blog posts match your query</Alert>
      </div>
    );
  }

  return (
    <Container>
      <Row className="my-3" id={`category1`}>
        <Col md={2}>
          <BlogSections blogDataToShow={blogDataToShow} />
        </Col>
        <Col md={10}>
          <BlogPosts
            {...{
              blogDataToShow,
              userInfo,
              blogInfo,
              voteInfo,
              deleteBlogPost,
              getSingleBlogPost,
              deleteAllCommentsBlogPost,
              updateBlogVoteCount,
              updateCommentVoteCount,
              editCommentBlogPost,
              deleteCommentBlogPost,
            }}
          />
          <div className="d-flex justify-content-end">
            <ScrollToTopPopup />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
