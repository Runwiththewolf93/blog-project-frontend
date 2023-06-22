import Layout from "../shared/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import Progress from "./Progress";
import Relationships from "./Relationships";
import Pictures from "./Pictures";
import Map from "./Map";
import Information from "./Information";
import UserComments from "./UserComments";

const DesktopLayout = ({
  userProfile,
  userInfo,
  blogInfo,
  userCommentInfo,
  isLoadingUserComment,
  errorUserComment,
}) => {
  return (
    <Layout>
      <Container className="mt-5">
        <Row>
          <Col md={3}>
            <ProfileCard
              {...{
                userProfile,
                userInfo,
                blogInfo,
                userCommentInfo,
                isLoadingUserComment,
                errorUserComment,
              }}
            />
          </Col>
          <Col md={6} className="mb-4">
            <Progress userProfile={userProfile} userInfo={userInfo} />
            <Relationships
              userProfile={userProfile}
              userInfo={userInfo}
              blogInfo={blogInfo}
            />
            <Pictures
              userProfile={userProfile}
              userInfo={userInfo}
              blogInfo={blogInfo}
            />
          </Col>
          <Col md={3}>
            <Map userProfile={userProfile} userInfo={userInfo} />
            <Information
              userCommentInfo={userCommentInfo}
              userInfo={userInfo}
              blogInfo={blogInfo}
            />
          </Col>
        </Row>
        <UserComments
          {...{
            userInfo,
            isLoadingUserComment,
            errorUserComment,
            userCommentInfo,
          }}
        />
      </Container>
    </Layout>
  );
};

export default DesktopLayout;
