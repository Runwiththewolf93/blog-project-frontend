import Layout from "../components/Layout";
import CarouselComponent from "../components/Carousel";
import EditorsChoice from "../components/EditorsChoice";
import OtherChoices from "../components/OtherChoices";
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
