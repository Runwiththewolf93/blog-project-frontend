import { useState } from "react";
import { Alert, ListGroup } from "react-bootstrap";
import Spinner from "../shared/Spinner";
import PinnedBlogPost from "./PinnedBlogPost";
import CommentsOverview from "./CommentsOverview";
import CustomListGroup from "../shared/CustomListGroup";

const UserComments = ({
  userInfo,
  blogPost,
  getSingleBlogPost,
  resetBlogPost,
  isLoadingUserComment,
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

  return (
    <>
      {Object.keys(blogPost).length !== 0 ? (
        <div className="mb-5">
          <PinnedBlogPost {...{ blogPost, getSingleBlogPost, resetBlogPost }} />
        </div>
      ) : (
        <CustomListGroup
          mb={3}
          text="No favorite blog post? Got to the home page to pick one out"
        />
      )}
      {isLoadingUserComment && (
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
      {!isLoadingUserComment && !errorUserComment && (
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
