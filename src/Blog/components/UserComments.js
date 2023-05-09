import { useState } from "react";
import { Alert, ListGroup, Button, Card } from "react-bootstrap";
import BlogPost from "./BlogPost";
import Spinner from "./Spinner";

const UserComments = ({
  userInfo,
  blogPost,
  deleteBlogPost,
  getSingleBlogPost,
  resetBlogPost,
  loadingComment,
  errorUserComment,
  userCommentInfo,
}) => {
  const [sortByTitle, setSortByTitle] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [titleSortOrder, setTitleSortOrder] = useState("asc");
  const [dateSortOrder, setDateSortOrder] = useState("asc");

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
    <>
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
                <h3 className="mt-3">
                  An overview of all your submitted comments:
                </h3>
                <div className="mt-3">
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
                      <Card.Subtitle className="mb-3 text-muted">
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
    </>
  );
};

export default UserComments;
