import { useEffect } from "react";
import { useAppContext } from "../../store/appContext";
import { useCommentContext } from "../../store/commentContext";
import { useVoteContext } from "../../store/voteContext";

const Charts = () => {
  const { userInfo, blogInfo, getAllUsers, users } = useAppContext();
  const { commentInfo } = useCommentContext();
  const { voteInfo } = useVoteContext();

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  console.log(userInfo);
  console.log(blogInfo);
  console.log(commentInfo);
  console.log(voteInfo);

  return <div>Charts</div>;
};

export default Charts;

// I was thinking of ways to show the information that we have in our app and what occurred to me is that we could implement charts! So I've downloaded and installed the recharts library, which I suppose you are familiar with. Below you can find what the charts component looks like currently, as well as the objects that I am retrieving from the state.
