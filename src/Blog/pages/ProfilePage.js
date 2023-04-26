import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import Progress from "../components/Progress";
import Relationships from "../components/Relationships";
import Pictures from "../components/Pictures";
import Map from "../components/Map";
import Information from "../components/Information";
import useRandomUsers from "../components/hooks/useRandomUsers";
import BlogPost from "../components/BlogPost";
import { useAppContext } from "../components/store/appContext";

const ProfilePage = () => {
  const { userProfile } = useRandomUsers();
  const {
    blogPost,
    userInfo,
    deleteBlogPost,
    getSingleBlogPost,
    resetBlogPost,
  } = useAppContext();

  console.log(blogPost);

  return (
    <Layout>
      <Container className="mt-5">
        <Row>
          <Col>
            <ProfileCard userProfile={userProfile} userInfo={userInfo} />
          </Col>
          <Col md={6} className="mb-4">
            <Progress userProfile={userProfile} />
            <Relationships userProfile={userProfile} />
            <Pictures userProfile={userProfile} />
          </Col>
          <Col>
            <Map userProfile={userProfile} />
            <Information userProfile={userProfile} />
          </Col>
          {blogPost && (
            <BlogPost
              post={blogPost}
              userInfo={userInfo}
              deleteBlogPost={deleteBlogPost}
              getSingleBlogPost={getSingleBlogPost}
              showPostOverlay={false}
              resetBlogPost={resetBlogPost}
            />
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
