import { useEffect } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import Progress from "../components/Progress";
import Relationships from "../components/Relationships";
import Pictures from "../components/Pictures";
import Map from "../components/Map";
import Information from "../components/Information";
import useRandomUsers from "../components/hooks/useRandomUsers";
import BlogPost from "../components/BlogPost";
import { useAppContext } from "../components/store/appContext";
import { useCommentContext } from "../components/store/commentContext";
import Spinner from "../components/Spinner";

const ProfilePage = () => {
  const { userProfile } = useRandomUsers();
  const {
    blogPost,
    userInfo,
    deleteBlogPost,
    getSingleBlogPost,
    resetBlogPost,
  } = useAppContext();
  const {
    isLoadingUserComment,
    userCommentInfo,
    errorUserComment,
    getAllCommentsUser,
  } = useCommentContext();

  console.log(blogPost);

  useEffect(() => {
    getAllCommentsUser();
    // eslint-disable-next-line
  }, []);

  console.log(userCommentInfo);

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
          {isLoadingUserComment && <Spinner />}
          {errorUserComment && (
            <ListGroup className="mb-3">
              <ListGroup.Item variant="danger">
                {errorUserComment}
              </ListGroup.Item>
            </ListGroup>
          )}
          {!isLoadingUserComment && !errorUserComment && (
            <>
              <h3>An overview of all your submitted comments</h3>
              {userCommentInfo.map(comment => (
                <Card key={comment._id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{comment.blog.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text>{comment.comment}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
