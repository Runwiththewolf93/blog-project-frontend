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
 * Renders the desktop layout for the website.
 *
 * @param {Object} userProfile - User profile information.
 * @param {Object} userInfo - User information.
 * @param {Object} blogInfo - Blog information.
 * @param {Object} userCommentInfo - User comment information.
 * @param {boolean} isLoadingUserComment - Indicates if user comment is loading.
 * @param {Error} errorUserComment - Error object if there is an error retrieving user comment.
 * @return {JSX.Element} The desktop layout component.
 */
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
