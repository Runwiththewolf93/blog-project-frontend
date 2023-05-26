import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useAppContext } from "../../store/appContext";
import { useCommentContext } from "../../store/commentContext";
import { useVoteContext } from "../../store/voteContext";
import LineChartComponent from "./LineChart";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";
import PieChartComponent from "./PieChart";
import CustomCard from "./CustomCard";

const Charts = () => {
  const { blogInfo, getAllUsers, users } = useAppContext();
  const { commentInfo } = useCommentContext();
  const { voteInfo } = useVoteContext();

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [users]);

  return (
    <div className="mt-5">
      <Row>
        <Col md={6}>
          <CustomCard title="Blog Posts Over Time">
            <LineChartComponent blogInfo={blogInfo} />
          </CustomCard>
        </Col>
        <Col md={6}>
          <CustomCard title="Comments Over Time">
            <BarChartComponent commentInfo={commentInfo} />
          </CustomCard>
        </Col>
      </Row>
      <Row className="mt-4 mb-5">
        <Col md={6}>
          <CustomCard title="Votes Over Time">
            <AreaChartComponent blogInfo={blogInfo} />
          </CustomCard>
        </Col>
        <Col md={6} className="d-flex align-items-stretch">
          {users.length > 0 && (
            <CustomCard title="Votes By User">
              <PieChartComponent voteInfo={voteInfo} users={users} />
            </CustomCard>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Charts;

// figure out body component and why comments and votes aren't loading
