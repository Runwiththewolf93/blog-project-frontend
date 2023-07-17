import { Container, Row, Col } from "react-bootstrap";
import { useAppContextState } from "../../store/appContext";
import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";
import BlogSections from "./BlogSections";
import BlogPosts from "./BlogPosts";
import ScrollToTopPopup from "./ButtonOverlay";
import { LoadingComponent, ErrorComponent, NoPosts } from "./BodyComponents";
import useIntersectionObserver from "./useIntersectionObserver";
import PropTypes from "prop-types";

/**
 * Renders the body component.
 *
 * @param {Object} userInfo - The user information.
 * @param {Array} blogDataToShow - The blog data to show.
 * @param {boolean} isFiltering - Indicates if filtering is active.
 * @returns {JSX.Element} The rendered body component.
 */
// Body component
const Body = ({ userInfo, blogDataToShow, isFiltering }) => {
  const { wasLoggedOut } = useAppContextState();
  const { isLoadingFilter, errorFilter, hasMore, page } = useBlogContextState();
  const { commentFilterLocalStorage } = useCommentContextState();
  const { voteFilterLocalStorage } = useVoteContextState();
  const [loadingRef, isLoaderVisible] = useIntersectionObserver();

  // console.log("isLoadingFilter", isLoadingFilter);
  // console.log("blogFilterLocalStorage", blogDataToShow);
  // console.log("commentFilterLocalStorage", commentFilterLocalStorage);
  // console.log("voteFilterLocalStorage", voteFilterLocalStorage);
  // console.log("hasMore", hasMore);
  // loading state resolves quickly on local machine, can't see comp.

  switch (true) {
    case !userInfo:
      return (
        <ErrorComponent
          message={
            wasLoggedOut
              ? "Please log in to view available blog posts"
              : "Session expired, please log in to view available blog posts"
          }
        />
      );
    case !!errorFilter:
      return <ErrorComponent message={errorFilter} />;
    case (isLoadingFilter && page === 1) ||
      !blogDataToShow ||
      !commentFilterLocalStorage ||
      !voteFilterLocalStorage:
      return <LoadingComponent />;
    case blogDataToShow.length === 0 && !isLoadingFilter && !isFiltering:
      return <NoPosts />;
    default:
      return (
        <Container style={{ overflow: isLoaderVisible ? "hidden" : "auto" }}>
          <Row className="my-3" id={`category1`}>
            <Col md={2}>
              <BlogSections blogDataToShow={blogDataToShow} />
            </Col>
            <Col md={10}>
              <BlogPosts blogDataToShow={blogDataToShow} userInfo={userInfo} />
              {hasMore && (
                <div ref={loadingRef}>
                  {console.log("does this work?")}
                  <LoadingComponent />
                </div>
              )}
              <div className="d-flex justify-content-end">
                <ScrollToTopPopup />
              </div>
            </Col>
          </Row>
        </Container>
      );
  }
};

export default Body;

Body.propTypes = {
  userInfo: PropTypes.object,
  blogDataToShow: PropTypes.array,
  isFiltering: PropTypes.bool,
};
