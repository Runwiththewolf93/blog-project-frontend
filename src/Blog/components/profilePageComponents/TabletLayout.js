import Layout from "../shared/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "./ProfileCard";
import Progress from "./Progress";
import Relationships from "./Relationships";
import Pictures from "./Pictures";
import Map from "./Map";
import Information from "./Information";
import UserComments from "./UserComments";

/**
 * Renders the tablet layout component.
 *
 * @param {Object} userProfile - The user profile information.
 * @param {Object} userInfo - The user information.
 * @param {Object} blogInfo - The blog information.
 * @param {Object} userCommentInfo - The user comment information.
 * @param {boolean} isLoadingUserComment - Indicates if the user comment is being loaded.
 * @param {Object} errorUserComment - The error encountered while loading the user comment.
 * @return {JSX.Element} The tablet layout component.
 */
const TabletLayout = ({
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
          <Col sm={6}>
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
          </Col>
          <Col sm={6} className="mb-4">
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
          </Col>
          <Pictures
            userProfile={userProfile}
            userInfo={userInfo}
            blogInfo={blogInfo}
          />
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

export default TabletLayout;
