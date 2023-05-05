import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
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

  const [sortByTitle, setSortByTitle] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [titleSortOrder, setTitleSortOrder] = useState("asc");
  const [dateSortOrder, setDateSortOrder] = useState("asc");
  const [loadingComment, setLoadingComment] = useState(isLoadingUserComment);

  useEffect(() => {
    getAllCommentsUser();
    // to resolve isLoadingUserComment not resetting to false
    setTimeout(() => {
      setLoadingComment(false);
    }, 3000);
    // eslint-disable-next-line
  }, []);

  const sortByTitleFunction = () => {
    setSortByDate(false);
    setSortByTitle(!sortByTitle);
    setTitleSortOrder(titleSortOrder === "asc" ? "desc" : "asc");
  };

  const sortByDateFunction = () => {
    setSortByTitle(false);
    setSortByDate(!sortByDate);
    setDateSortOrder(dateSortOrder === "asc" ? "desc" : "asc");
  };

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
          {!userInfo && (
            <Alert variant="info" className="fs-5 text-center mb-4">
              Please log in to view available blog posts and comments
            </Alert>
          )}
          {userInfo && (
            <>
              {blogPost && (
                <>
                  <h3>Pinned blog post:</h3>
                  <BlogPost
                    post={blogPost}
                    userInfo={userInfo}
                    deleteBlogPost={deleteBlogPost}
                    getSingleBlogPost={getSingleBlogPost}
                    showPostOverlay={false}
                    resetBlogPost={resetBlogPost}
                  />
                </>
              )}
              {loadingComment && (
                <div className="d-flex justify-content-center mb-3">
                  <Spinner />
                </div>
              )}
              {errorUserComment && (
                <ListGroup className="mb-3">
                  <ListGroup.Item variant="danger">
                    {errorUserComment}
                  </ListGroup.Item>
                </ListGroup>
              )}
              {!loadingComment && !errorUserComment && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mt-1">
                      An overview of all your submitted comments:
                    </h3>
                    <div>
                      <Button variant="link" onClick={sortByTitleFunction}>
                        Sort by title {titleSortOrder === "asc" ? "▲" : "▼"}
                      </Button>
                      <Button variant="link" onClick={sortByDateFunction}>
                        Sort by date {dateSortOrder === "asc" ? "▲" : "▼"}
                      </Button>
                    </div>
                  </div>
                  {userCommentInfo
                    .sort((a, b) => {
                      if (sortByTitle) {
                        return (
                          (titleSortOrder === "asc" ? 1 : -1) *
                          a.blog.title.localeCompare(b.blog.title)
                        );
                      }
                      return (
                        (dateSortOrder === "asc" ? 1 : -1) *
                        (new Date(b.createdAt) - new Date(a.createdAt))
                      );
                    })
                    .map(comment => (
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
            </>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
