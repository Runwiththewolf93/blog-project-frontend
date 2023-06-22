import { useState, useEffect, useRef } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
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
  const [reset, setReset] = useState(false);
  const [show, setShow] = useState(true);
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
    setReset(true);
  };

  const handleOrderChange = newOrder => {
    setOrder(newOrder);
    setReset(true);
  };

  useEffect(() => {
    if (!mounted.current) {
      // Ensure this runs on the first render
      console.log("Resetting filters...");
      const executeGetFilteredBlogPosts = async () => {
        await resetFilteredBlogPosts(() => {
          getFilteredBlogPosts();
        });
      };
      executeGetFilteredBlogPosts();
      mounted.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Condition that prevents the useEffect from running if reset is true
  useEffect(() => {
    if (mounted.current && page !== 1 && !isLoadingFilter && !reset) {
      // Ensure this is not the first render and isLoadingFilter and reset are false
      getFilteredBlogPosts(page, sort, 5, order);
    }
    // eslint-disable-next-line
  }, [page, sort, order]);

  useEffect(() => {
    // On 'sort' or 'order' change, reset all related state
    if (reset) {
      setPage(1);
      resetFilteredBlogPosts();
      setReset(false);
    }
    // Once reset is done, fetch the first page of posts
    else {
      resetFilteredBlogPosts(() => {
        getFilteredBlogPosts(1, sort, 5, order);
      });
    }
    // eslint-disable-next-line
  }, [sort, order, reset]);

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
          <Dropdowns
            onSortChange={handleSortChange}
            onOrderChange={handleOrderChange}
          />
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
