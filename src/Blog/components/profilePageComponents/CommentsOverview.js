import CommentsHeader from "./CommentsHeader";
import CommentsList from "./CommentsList";

/**
 * Render the overview of comments.
 *
 * @param {object} userCommentInfo - Information about user comments.
 * @param {string} sortType - The type of sorting.
 * @param {string} titleSortOrder - The sort order for titles.
 * @param {string} dateSortOrder - The sort order for dates.
 * @param {function} sortByTitleFunction - The sorting function for titles.
 * @param {function} sortByDateFunction - The sorting function for dates.
 * @return {JSX.Element} The rendered comments overview.
 */
const CommentsOverview = ({
  userCommentInfo,
  sortType,
  titleSortOrder,
  dateSortOrder,
  sortByTitleFunction,
  sortByDateFunction,
}) => (
  <>
    <CommentsHeader
      {...{
        sortByTitleFunction,
        sortByDateFunction,
        titleSortOrder,
        dateSortOrder,
      }}
    />
    <CommentsList
      {...{
        userCommentInfo,
        sortType,
        titleSortOrder,
        dateSortOrder,
      }}
    />
  </>
);

export default CommentsOverview;
