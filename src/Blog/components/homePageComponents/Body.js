import { useEffect } from "react";
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

// Body component
const Body = ({ userInfo, blogDataToShow, isFiltering }) => {
  const { wasLoggedOut } = useAppContextState();
  const { isLoadingFilter, errorFilter, hasMore, page } = useBlogContextState();
  const { commentFilterLocalStorage } = useCommentContextState();
  const { voteFilterLocalStorage } = useVoteContextState();
  const [loadingRef, isLoaderVisible] = useIntersectionObserver();

  useEffect(() => {
    if (isLoaderVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoaderVisible]);

  if (!userInfo) {
    return (
      <ErrorComponent
        message={
          wasLoggedOut
            ? "Please log in to view available blog posts"
            : "Session expired, please log in to view available blog posts"
        }
      />
    );
  }

  if (errorFilter) {
    return <ErrorComponent message={errorFilter} />;
  }

  console.log("isLoadingFilter", isLoadingFilter);
  console.log("blogFilterLocalStorage", blogDataToShow);
  console.log("commentFilterLocalStorage", commentFilterLocalStorage);
  console.log("voteFilterLocalStorage", voteFilterLocalStorage);
  // loading state resolves quickly on local machine, can't see comp.
  if (
    (isLoadingFilter && page === 1) ||
    !blogDataToShow ||
    !commentFilterLocalStorage ||
    !voteFilterLocalStorage
  ) {
    return <LoadingComponent />;
  }

  if (blogDataToShow.length === 0 && !isLoadingFilter && !isFiltering) {
    return <NoPosts />;
  }

  console.log("hasMore", hasMore);

  return (
    <Container>
      <Row className="my-3" id={`category1`}>
        <Col md={2}>
          <BlogSections blogDataToShow={blogDataToShow} />
        </Col>
        <Col md={10}>
          <BlogPosts blogDataToShow={blogDataToShow} userInfo={userInfo} />
          {hasMore && (
            <div ref={loadingRef}>
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
};

export default Body;
