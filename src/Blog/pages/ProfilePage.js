import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import Progress from "../components/Progress";
import Relationships from "../components/Relationships";
import Pictures from "../components/Pictures";
import Map from "../components/Map";
import Information from "../components/Information";
import useRandomUsers from "../components/hooks/useRandomUsers";
import { useAppContext } from "../components/store/appContext";
import { useCommentContext } from "../components/store/commentContext";
import UserComments from "../components/UserComments";

const ProfilePage = () => {
  // added gender for single user
  const { userProfile } = useRandomUsers("male");
  const {
    blogPost,
    userInfo,
    blogInfo,
    users,
    deleteBlogPost,
    getSingleBlogPost,
    resetBlogPost,
    getAllUsers,
  } = useAppContext();
  const {
    isLoadingUserComment,
    userCommentInfo,
    errorUserComment,
    getAllCommentsUser,
  } = useCommentContext();

  const [loadingComment, setLoadingComment] = useState(isLoadingUserComment);

  useEffect(() => {
    getAllCommentsUser();
    getAllUsers();
    // to resolve isLoadingUserComment not resetting to false
    setTimeout(() => {
      setLoadingComment(false);
    }, 3000);
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Container className="mt-5">
        <Row>
          <Col>
            <ProfileCard
              userProfile={userProfile}
              userInfo={userInfo}
              blogInfo={blogInfo}
              userCommentInfo={userCommentInfo}
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
            <Information userProfile={userProfile} />
          </Col>
        </Row>
        <UserComments
          userInfo={userInfo}
          blogPost={blogPost}
          deleteBlogPost={deleteBlogPost}
          getSingleBlogPost={getSingleBlogPost}
          resetBlogPost={resetBlogPost}
          loadingComment={loadingComment}
          errorUserComment={errorUserComment}
          userCommentInfo={userCommentInfo}
        />
      </Container>
    </Layout>
  );
};

export default ProfilePage;
