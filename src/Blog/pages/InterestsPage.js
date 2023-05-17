import Layout from "../components/shared/Layout";
import CarouselComponent from "../components/interestsPageComponents/Carousel";
import EditorsChoice from "../components/interestsComponents/EditorsChoice";
import OtherChoices from "../components/interestsComponents/OtherChoices";
import { Row, Col } from "react-bootstrap";

const InterestsPage = () => {
  return (
    <Layout>
      <Row>
        <Col>
          <CarouselComponent />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <EditorsChoice />
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
