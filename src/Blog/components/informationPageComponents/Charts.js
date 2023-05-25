import { Row, Col, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
      setLoading(false);
    };
    fetchUsers();
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
          {loading ? (
            <Spinner animation="border" />
          ) : (
            users.length > 0 && (
              <PieChartComponent voteInfo={voteInfo} users={users} />
            )
          )}
        </Col>
      </Row>
    </>
  );
};

export default Charts;
