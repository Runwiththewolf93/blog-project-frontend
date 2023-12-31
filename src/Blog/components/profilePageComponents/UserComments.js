import { Alert, ListGroup } from "react-bootstrap";
import Spinner from "../shared/Spinner";
import PinnedBlogPost from "./PinnedBlogPost";
import CommentsOverview from "./CommentsOverview";
import useSort from "./useSort";

/**
 * Renders the UserComments component.
 *
 * @param {Object} userInfo - The information about the user.
 * @param {boolean} isLoadingUserComment - Indicates if the user comments are still loading.
 * @param {string} errorUserComment - The error message, if any, when loading the user comments.
 * @param {Object} userCommentInfo - The information about the user's comments.
 * @return {JSX.Element} The rendered UserComments component.
 */
const UserComments = ({
  userInfo,
  isLoadingUserComment,
  errorUserComment,
  userCommentInfo,
}) => {
  const {
    sortType,
    titleSortOrder,
    dateSortOrder,
    sortByTitleFunction,
    sortByDateFunction,
  } = useSort("date", "asc");

  if (!userInfo) {
    return (
      <Alert variant="info" className="fs-5 text-center mb-4">
        Please log in to view available blog posts and comments
      </Alert>
    );
  }

  return (
    <>
      <PinnedBlogPost />
      {isLoadingUserComment && (
        <div
          className="d-flex justify-content-center mb-3"
          data-testid="spinner"
        >
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
