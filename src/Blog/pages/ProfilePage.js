import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import Progress from "../components/Progress";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios.get("https://randomuser.me/api/").then(({ data }) => {
      setUserProfile(data.results[0]);
      console.log(data.results[0]);
    });
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <ProfileCard userProfile={userProfile} />
          </Col>
          <Col md={6}>
            <Progress userProfile={userProfile} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
