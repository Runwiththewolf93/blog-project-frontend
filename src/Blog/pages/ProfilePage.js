import { useEffect } from "react";
import Layout from "../components/shared/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../components/profilePageComponents/ProfileCard";
import Progress from "../components/profilePageComponents/Progress";
import Relationships from "../components/profilePageComponents/Relationships";
import Pictures from "../components/profilePageComponents/Pictures";
import Map from "../components/profilePageComponents/Map";
import Information from "../components/profilePageComponents/Information";
import useRandomUsers from "../hooks/useRandomUsers";
import { useAppContextState, useAppContextDispatch } from "../store/appContext";
import {
  useCommentContextState,
  useCommentContextDispatch,
} from "../store/commentContext";
import UserComments from "../components/profilePageComponents/UserComments";

const ProfilePage = () => {
  // added gender for single user
  const { userProfile } = useRandomUsers("male");
  const { blogPost, userInfo, blogInfo, users } = useAppContextState();
  const { resetBlogPost, getAllUsers } = useAppContextDispatch();
  const { isLoadingUserComment, userCommentInfo, errorUserComment } =
    useCommentContextState();
  const { getAllCommentsUser } = useCommentContextDispatch();

  useEffect(() => {
    getAllUsers().then(() => {
      getAllCommentsUser();
    });
    // eslint-disable-next-line
  }, []);

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
              }}
            />
          </Col>
          <Col md={6} className="mb-4">
            <Progress userProfile={userProfile} userInfo={userInfo} />
            <Relationships
              userProfile={userProfile}
              allUsers={users}
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
            blogPost,
            resetBlogPost,
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
