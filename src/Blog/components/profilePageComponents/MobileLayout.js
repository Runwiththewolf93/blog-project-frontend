import Layout from "../shared/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import Progress from "./Progress";
import Relationships from "./Relationships";
import Pictures from "./Pictures";
import Map from "./Map";
import Information from "./Information";
import UserComments from "./UserComments";

const MobileLayout = ({
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
          <Col>
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
            <Map userProfile={userProfile} userInfo={userInfo} />
            <Progress userProfile={userProfile} userInfo={userInfo} />
            <Relationships
              userProfile={userProfile}
              userInfo={userInfo}
              blogInfo={blogInfo}
            />
            <Information
              userCommentInfo={userCommentInfo}
              userInfo={userInfo}
              blogInfo={blogInfo}
            />
            <Pictures
              userProfile={userProfile}
              userInfo={userInfo}
              blogInfo={blogInfo}
            />
            <UserComments
              {...{
                userInfo,
                isLoadingUserComment,
                errorUserComment,
                userCommentInfo,
              }}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default MobileLayout;
