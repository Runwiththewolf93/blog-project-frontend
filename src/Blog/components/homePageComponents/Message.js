import { useState, useEffect, useRef } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useAppContextState } from "../../store/appContext";
import {
  useBlogContextState,
  useBlogContextDispatch,
} from "../../store/blogContext";
import { Dropdowns, WelcomeCard, ButtonsGroup } from "./MessageComponents";
import useScrollToLoadMore from "./useScroll";

// Message component
function Message({
  userInfo,
  getAllBlogPosts,
  toggleShowMyPosts,
  setSearchQuery,
  setShowMyPosts,
}) {
  const mounted = useRef(false);
  const [showCard, setShowCard] = useState(false);
  const [sort, setSort] = useState("createdAt");
  const [show, setShow] = useState(true);
  const { success } = useAppContextState();
  const { hasMore, isLoadingFilter, errorFilter, page, order } =
    useBlogContextState();
  const {
    getFilteredBlogPosts,
    resetFilteredBlogPosts,
    resetErrorFilter,
    setPage,
    setOrder,
  } = useBlogContextDispatch();

  const handleSortChange = newSort => {
    setSort(newSort);
  };

  const handleOrderChange = newOrder => {
    setOrder(newOrder);
  };

  // Initial fetch and reset of data from server
  useEffect(() => {
    const resetAndFetchPosts = async () => {
      if (userInfo && success && !mounted.current) {
        console.log("Resetting filters...");
        await resetFilteredBlogPosts(() =>
          getFilteredBlogPosts(1, sort, 5, order)
        );
        mounted.current = true;
      }
    };

    resetAndFetchPosts();
    // eslint-disable-next-line
  }, [userInfo, sort, order, success]);

  console.log("userInfo", userInfo);
  console.log("success", success);
  console.log("mounted.current", mounted.current);
  // see what can be done with the mounted.current state tomorrow, get the app working again

  // Fetch additional data from server
  useEffect(() => {
    if (mounted.current && page !== 1 && !isLoadingFilter) {
      // Ensure this is not the first render and isLoadingFilter is false
      getFilteredBlogPosts(page, sort, 5, order);
    }
    // eslint-disable-next-line
  }, [page]);

  useScrollToLoadMore({ isLoadingFilter, hasMore, setPage });

  const handleCloseCard = () => {
    setShowCard(true);
  };

  const handleRefresh = () => {
    getAllBlogPosts();
    setSearchQuery("");
    setShowMyPosts(false);
  };

  return (
    <Container className="my-3">
      <Row>
        <Col xs={2} className="d-flex justify-content-center">
          {userInfo && (
            <Dropdowns
              onSortChange={handleSortChange}
              onOrderChange={handleOrderChange}
            />
          )}
        </Col>
        <Col xs={10}>
          <Card.Header className="h1 mb-3">Welcome to my Blog</Card.Header>
          <WelcomeCard
            {...{
              userInfo,
              showCard,
              handleCloseCard,
              show,
              setShow,
              errorFilter,
              resetErrorFilter,
            }}
          />
          {userInfo && (
            <ButtonsGroup
              handleRefresh={handleRefresh}
              toggleShowMyPosts={toggleShowMyPosts}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
