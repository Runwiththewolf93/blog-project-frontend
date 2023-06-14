import Layout from "../components/shared/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useAppContextState } from "../store/appContext";
import { useBlogContextState } from "../store/blogContext";
import { useCommentContextState } from "../store/commentContext";
import useProfilePage from "../hooks/useProfilePage";
import ProfileCard from "../components/profilePageComponents/ProfileCard";
import Progress from "../components/profilePageComponents/Progress";
import Relationships from "../components/profilePageComponents/Relationships";
import Pictures from "../components/profilePageComponents/Pictures";
import Map from "../components/profilePageComponents/Map";
import Information from "../components/profilePageComponents/Information";
import useRandomUsers from "../hooks/useRandomUsers";
import UserComments from "../components/profilePageComponents/UserComments";

const ProfilePage = () => {
  const { userProfile } = useRandomUsers("male");
  const { userInfo } = useAppContextState();
  const { blogInfo } = useBlogContextState();
  const { isLoadingUserComment, userCommentInfo, errorUserComment } =
    useCommentContextState();
  useProfilePage();

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
          <Col>
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

export default ProfilePage;
