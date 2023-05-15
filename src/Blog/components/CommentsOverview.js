import CommentsHeader from "./CommentsHeader";
import CommentsList from "./CommentsList";

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
