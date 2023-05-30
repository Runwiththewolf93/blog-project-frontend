import { useEffect } from "react";
import {
  useCommentContextState,
  useCommentContextDispatch,
} from "../../store/commentContext";

const useFetchHighestVotedBlogComments = blogInfo => {
  const { isLoadingComment, blogCommentInfo, errorComment } =
    useCommentContextState();
  const { getAllCommentsBlogPost } = useCommentContextDispatch();

  useEffect(() => {
    if (blogInfo && blogInfo.length > 0) {
      const highestVotedBlog = blogInfo.reduce((prev, current) => {
        return Math.abs(prev.totalVotes) > Math.abs(current.totalVotes)
          ? prev
          : current;
      });

      if (highestVotedBlog && highestVotedBlog._id) {
        getAllCommentsBlogPost(highestVotedBlog._id);
      }
    }
    // eslint-disable-next-line
  }, [blogInfo]);

  return { isLoadingComment, blogCommentInfo, errorComment };
};

export default useFetchHighestVotedBlogComments;
