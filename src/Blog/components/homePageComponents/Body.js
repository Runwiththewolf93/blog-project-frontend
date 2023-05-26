import React, { useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useAppContextState } from "../../store/appContext";
import {
  useCommentContextState,
  useCommentContextDispatch,
} from "../../store/commentContext";
import {
  useVoteContextState,
  useVoteContextDispatch,
} from "../../store/voteContext";
import BlogSections from "./BlogSections";
import BlogPosts from "./BlogPosts";
import Spinner from "../shared/Spinner";
import ScrollToTopPopup from "./ButtonOverlay";

const Body = ({ userInfo, blogDataToShow }) => {
  const { isLoadingBlog, errorBlog, wasLoggedOut } = useAppContextState();
  const { isLoadingComment, commentInfo } = useCommentContextState();
  const { getAllComments } = useCommentContextDispatch();
  const { isLoadingVote, voteInfo } = useVoteContextState();
  const { getAllVotes } = useVoteContextDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      await getAllComments();
      await getAllVotes();
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
          <BlogPosts blogDataToShow={blogDataToShow} userInfo={userInfo} />
          <div className="d-flex justify-content-end">
            <ScrollToTopPopup />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
