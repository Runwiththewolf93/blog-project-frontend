import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
import ScrollToTopPopup from "./ButtonOverlay";
import { Loading, Error, NoPosts } from "./BodyComponents";

const Body = ({ userInfo, blogDataToShow }) => {
  const { isLoadingBlog, errorBlog, wasLoggedOut } = useAppContextState();
  const { isLoadingComment, commentInfo } = useCommentContextState();
  const { getAllComments } = useCommentContextDispatch();
  const { isLoadingVote, voteInfo } = useVoteContextState();
  const { getAllVotes } = useVoteContextDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([getAllComments(), getAllVotes()]);

      if (userInfo && (commentInfo.length === 0 || voteInfo.length === 0)) {
        window.location.reload();
      }
    };
    fetchAllData();
    // eslint-disable-next-line
  }, [userInfo]);

  if (!userInfo) {
    return (
      <Error
        message={
          wasLoggedOut
            ? "Please log in to view available blog posts"
            : "Session expired, please log in to view available blog posts"
        }
      />
    );
  }

  if (errorBlog) {
    return <Error message={errorBlog} />;
  }

  if (
    isLoadingBlog ||
    isLoadingComment ||
    isLoadingVote ||
    !blogDataToShow ||
    !commentInfo ||
    !voteInfo
  ) {
    return <Loading />;
  }

  if (blogDataToShow.length === 0) {
    return <NoPosts />;
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
