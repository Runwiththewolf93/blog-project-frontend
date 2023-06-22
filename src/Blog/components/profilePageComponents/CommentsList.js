import UserComment from "./UserComment";
import CustomListGroup from "../shared/CustomListGroup";
import useSortedComments from "./useSortedComments";

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
