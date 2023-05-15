import UserComment from "./UserComment";

const CommentsList = ({
  userCommentInfo,
  sortType,
  titleSortOrder,
  dateSortOrder,
}) => (
  <>
    {userCommentInfo
      .sort((a, b) => {
        if (sortType === "title") {
          return (
            (titleSortOrder === "asc" ? 1 : -1) *
            a.blog.title.toLowerCase().localeCompare(b.blog.title.toLowerCase())
          );
        }
        return (
          (dateSortOrder === "asc" ? 1 : -1) *
          (new Date(b.createdAt) - new Date(a.createdAt))
        );
      })
      .map(comment => (
        <UserComment key={comment._id} comment={comment} />
      ))}
  </>
);

export default CommentsList;
