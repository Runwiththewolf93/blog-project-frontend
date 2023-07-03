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
  toggleShowMyPosts,
  setSearchQuery,
  setShowMyPosts,
  blogFilterLocalStorage,
}) {
  const mounted = useRef(false);
  const sortOrOrderChanged = useRef(false);
  const [showCard, setShowCard] = useState(false);
  const [sort, setSort] = useState("createdAt");
  const [show, setShow] = useState(true);
  const { hasMore, isLoadingFilter, errorFilter, page, order } =
    useBlogContextState();
  const {
    getFilteredBlogPosts,
    resetFilteredBlogPosts,
    resetErrorFilter,
    setPage,
    setOrder,
    setIsStateReset,
  } = useBlogContextDispatch();

  // Test out the app further
  const handleSortChange = newSort => {
    setSort(newSort);
    setIsStateReset(true);
    sortOrOrderChanged.current = true;
  };

  const handleOrderChange = newOrder => {
    setOrder(newOrder);
    setIsStateReset(true);
    sortOrOrderChanged.current = true;
  };

  // Initial fetch and reset of data from server
  useEffect(() => {
    const resetAndFetchPosts = () => {
      if ((userInfo && !mounted.current) || sortOrOrderChanged.current) {
        console.log("Resetting filters...");
        setPage(1);
        resetFilteredBlogPosts(() =>
          getFilteredBlogPosts([], 1, sort, 5, order)
        );
        mounted.current = true;
        sortOrOrderChanged.current = false;
      }
    };

    resetAndFetchPosts();
    // eslint-disable-next-line
  }, [userInfo, sort, order]);

  console.log("userInfo", userInfo);
  console.log("mounted.current", mounted.current);
  console.log("sortOrOrderChanged.current", sortOrOrderChanged.current);
  console.log(
    "blogFilterLocalStorage",
    blogFilterLocalStorage.map(b => b._id)
  );

  // Fetch additional data from server
  useEffect(() => {
    if (mounted.current && page !== 1 && !isLoadingFilter) {
      console.log("2nd useEffect in Message");
      // Ensure this is not the first render and isLoadingFilter is false
      // Perhaps remove the ref, not much point using it here
      getFilteredBlogPosts(
        blogFilterLocalStorage.map(b => b._id),
        page,
        sort,
        5,
        order
      );
    }
    // eslint-disable-next-line
  }, [page]);

  console.log("sort", sort);
  console.log("order", order);
  console.log("page", page);
  console.log("hasMore", hasMore);

  useScrollToLoadMore({ isLoadingFilter, hasMore, setPage });

  const handleCloseCard = () => {
    setShowCard(true);
  };

  const handleRefresh = () => {
    setPage(1);
    resetFilteredBlogPosts(() => getFilteredBlogPosts([], 1, sort, 5, order));
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
