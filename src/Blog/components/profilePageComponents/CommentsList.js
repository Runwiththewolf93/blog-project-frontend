import UserComment from "./UserComment";
import CustomListGroup from "../shared/CustomListGroup";
import useSortedComments from "./useSortedComments";

/**
 * Renders a list of comments based on the provided information.
 *
 * @param {Object} userCommentInfo - Information about the user's comments.
 * @param {string} sortType - The type of sorting to be applied.
 * @param {string} titleSortOrder - The sort order for comments based on the title.
 * @param {string} dateSortOrder - The sort order for comments based on the date.
 * @return {JSX.Element} The rendered list of comments.
 */
const CommentsList = ({
  userCommentInfo,
  sortType,
  titleSortOrder,
  dateSortOrder,
}) => {
  const sortedComments = useSortedComments(
    userCommentInfo,
    sortType,
    titleSortOrder,
    dateSortOrder
  );

  return (
    <div className="mb-5">
      {sortedComments.length > 0 ? (
        sortedComments.map(comment => (
          <UserComment key={comment._id} comment={comment} />
        ))
      ) : (
        <CustomListGroup
          mb={5}
          text="No comments yet? Go to the home page and create one"
        />
      )}
    </div>
  );
};

export default CommentsList;
