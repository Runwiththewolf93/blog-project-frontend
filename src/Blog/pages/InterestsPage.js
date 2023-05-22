import Layout from "../components/shared/Layout";
import CarouselComponent from "../components/interestsPageComponents/Carousel";
import EditorsChoice from "../components/interestsPageComponents/EditorsChoice";
import OtherChoices from "../components/interestsPageComponents/OtherChoices";
import { Row, Col } from "react-bootstrap";
import { useAppContext } from "../store/appContext";
import { useCommentContext } from "../store/commentContext";

const InterestsPage = () => {
  const { blogInfo } = useAppContext();
  const { commentInfo } = useCommentContext();

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
          <OtherChoices />
        </Col>
      </Row>
    </Layout>
  );
};

export default InterestsPage;
