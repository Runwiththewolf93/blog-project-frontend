import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import {
  useAppContextState,
  useAppContextDispatch,
} from "../../store/appContext";
import { useBlogContextState } from "../../store/blogContext";
import { useCommentContextState } from "../../store/commentContext";
import { useVoteContextState } from "../../store/voteContext";
import LineChartComponent from "./LineChart";
import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";
import PieChartComponent from "./PieChart";
import CustomCard from "./CustomCard";
import { useMediaQuery } from "react-responsive";

// Charts component
const Charts = () => {
  const { users } = useAppContextState();
  const { getAllUsers } = useAppContextDispatch();
  const { blogInfo } = useBlogContextState();
  const { commentInfo } = useCommentContextState();
  const { voteInfo } = useVoteContextState();

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const isLaptopScreenOrSmaller = useMediaQuery({
    query: "(max-width: 992px)",
  });

  return (
    <div className="mt-5">
      <Row>
        <Col lg={6} xs={12} className={isLaptopScreenOrSmaller && "mb-4"}>
          <CustomCard title="Blog Posts Over Time">
            <LineChartComponent blogInfo={blogInfo} />
          </CustomCard>
        </Col>
        <Col lg={6} xs={12}>
          <CustomCard title="Comments Over Time">
            <BarChartComponent commentInfo={commentInfo} />
          </CustomCard>
        </Col>
      </Row>
      <Row className="mt-4 mb-5">
        <Col lg={6} xs={12} className={isLaptopScreenOrSmaller && "mb-4"}>
          <CustomCard title="Votes Over Time">
            <AreaChartComponent blogInfo={blogInfo} />
          </CustomCard>
        </Col>
        <Col lg={6} xs={12}>
          {users.length > 0 && (
            <CustomCard title="Votes By User">
              <PieChartComponent
                voteInfo={voteInfo}
                users={users}
                isLaptopScreenOrSmaller={isLaptopScreenOrSmaller}
              />
            </CustomCard>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Charts;
