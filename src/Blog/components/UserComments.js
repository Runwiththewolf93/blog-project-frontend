import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, ListGroup } from "react-bootstrap";
import Spinner from "./Spinner";
import PinnedBlogPost from "./PinnedBlogPost";
import CommentsOverview from "./CommentsOverview";

const UserComments = ({
  userInfo,
  blogPost,
  getSingleBlogPost,
  resetBlogPost,
  loadingComment,
  errorUserComment,
  userCommentInfo,
}) => {
  const [sortType, setSortType] = useState("date");
  const [titleSortOrder, setTitleSortOrder] = useState("asc");
  const [dateSortOrder, setDateSortOrder] = useState("asc");

  const sortByTitleFunction = () => {
    setTitleSortOrder(titleSortOrder === "asc" ? "desc" : "asc");
    setSortType("title");
  };

  const sortByDateFunction = () => {
    setDateSortOrder(dateSortOrder === "asc" ? "desc" : "asc");
    setSortType("date");
  };

  if (!userInfo) {
    return (
      <Alert variant="info" className="fs-5 text-center mb-4">
        Please log in to view available blog posts and comments
      </Alert>
    );
  }

  console.log(blogPost);

  return (
    <>
      {Object.keys(blogPost).length !== 0 ? (
        <div className="mb-5">
          <PinnedBlogPost {...{ blogPost, getSingleBlogPost, resetBlogPost }} />
        </div>
      ) : (
        <ListGroup className="mb-3">
          <ListGroup.Item variant="secondary" className="fs-5">
            No favorite blog post? Got to the home page to pick one out{" "}
            <Link to="/">now</Link>!
          </ListGroup.Item>
        </ListGroup>
      )}
      {loadingComment && (
        <div className="d-flex justify-content-center mb-3">
          <Spinner />
        </div>
      )}
      {errorUserComment && (
        <ListGroup className="mb-3">
          <ListGroup.Item variant="danger" className="fs-5">
            {errorUserComment}
          </ListGroup.Item>
        </ListGroup>
      )}
      {!loadingComment && !errorUserComment && (
        <CommentsOverview
          {...{
            userCommentInfo,
            sortType,
            titleSortOrder,
            dateSortOrder,
            sortByTitleFunction,
            sortByDateFunction,
          }}
        />
      )}
    </>
  );
};

export default UserComments;
