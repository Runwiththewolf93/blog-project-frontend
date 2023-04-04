import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import Progress from "../components/Progress";
import Relationships from "../components/Relationships";
import Pictures from "../components/Pictures";
import Map from "../components/Map";
import Information from "../components/Information";
import useRandomUsers from "../components/hooks/useRandomUsers";

const ProfilePage = () => {
  const { userProfile } = useRandomUsers();

  return (
    <Layout>
      <Container style={{ height: "100vh" }} className="mt-5">
        <Row>
          <Col>
            <ProfileCard userProfile={userProfile} />
          </Col>
          <Col md={6}>
            <Progress userProfile={userProfile} />
            <Relationships userProfile={userProfile} />
            <Pictures userProfile={userProfile} />
          </Col>
          <Col>
            <Map userProfile={userProfile} />
            <Information userProfile={userProfile} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
