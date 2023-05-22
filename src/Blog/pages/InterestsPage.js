import Layout from "../components/shared/Layout";
import CarouselComponent from "../components/interestsPageComponents/Carousel";
import EditorsChoice from "../components/interestsPageComponents/EditorsChoice";
import OtherChoices from "../components/interestsPageComponents/OtherChoices";
import { Row, Col } from "react-bootstrap";
import { useAppContext } from "../store/appContext";
import { useCommentContext } from "../store/commentContext";
import { useVoteContext } from "../store/voteContext";

const InterestsPage = () => {
  const { blogInfo } = useAppContext();
  const { commentInfo } = useCommentContext();
  const { voteInfo } = useVoteContext();

  return (
    <Layout>
      <Row>
        <Col>
          <CarouselComponent blogInfo={blogInfo} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <EditorsChoice blogInfo={blogInfo} commentInfo={commentInfo} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <OtherChoices
            blogInfo={blogInfo}
            commentInfo={commentInfo}
            voteInfo={voteInfo}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default InterestsPage;
