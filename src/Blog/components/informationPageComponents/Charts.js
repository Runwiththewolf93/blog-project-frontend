import { useEffect } from "react";
import { useAppContext } from "../../store/appContext";
import { useCommentContext } from "../../store/commentContext";
import { useVoteContext } from "../../store/voteContext";
import LineChartComponent from "./LineChart";

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
  console.log(users);

  return <div>Charts</div>;
};

export default Charts;
