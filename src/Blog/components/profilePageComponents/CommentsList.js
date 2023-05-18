import UserComment from "./UserComment";
import CustomListGroup from "../shared/CustomListGroup";

const CommentsList = ({
  userCommentInfo,
  sortType,
  titleSortOrder,
  dateSortOrder,
}) => (
  <>
    {userCommentInfo.length > 0 ? (
      userCommentInfo
        .sort((a, b) => {
          const titleA = a.blog.title ? a.blog.title.toLowerCase() : "";
          const titleB = b.blog.title ? b.blog.title.toLowerCase() : "";

          if (sortType === "title") {
            return (
              (titleSortOrder === "asc" ? 1 : -1) * titleA.localeCompare(titleB)
            );
          }
          return (
            (dateSortOrder === "asc" ? 1 : -1) *
            (new Date(b.createdAt) - new Date(a.createdAt))
          );
        })
        .map(comment => <UserComment key={comment._id} comment={comment} />)
    ) : (
      <CustomListGroup
        mb={5}
        text="No comments yet? Go to the home page and create one"
      />
    )}
  </>
);

export default CommentsList;
