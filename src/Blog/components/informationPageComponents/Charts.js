import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useAppContext } from "../../store/appContext";
import { useCommentContext } from "../../store/commentContext";
import { useVoteContext } from "../../store/voteContext";
import LineChartComponent from "./LineChart";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";
import PieChartComponent from "./PieChart";

const Charts = () => {
  const { blogInfo, getAllUsers, users } = useAppContext();
  const { commentInfo } = useCommentContext();
  const { voteInfo } = useVoteContext();

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  // console.log(blogInfo);
  // console.log(commentInfo);
  console.log(voteInfo);
  console.log(users);

  return (
    <>
      <Row>
        <Col md={6}>
          <LineChartComponent blogInfo={blogInfo} />
        </Col>
        <Col md={6}>
          <BarChartComponent commentInfo={commentInfo} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <AreaChartComponent blogInfo={blogInfo} />
        </Col>
        <Col md={6}>
          <PieChartComponent voteInfo={voteInfo} users={users} />
        </Col>
      </Row>
    </>
  );
};

export default Charts;
