import { useState, useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { sortData } from "../../utils/helper";
import PostTypeSelector from "./PostTypeSelector";

const EditorsChoice = ({ blogInfo, commentInfo }) => {
  const [sortedComments, setSortedComments] = useState([]);
  const [postType, setPostType] = useState("popular");

  useEffect(() => {
    const blogInfoMap = blogInfo.reduce((acc, cur) => {
      acc[cur._id] = cur;
      return acc;
    }, {});

    const sortedComments = sortData(commentInfo, postType);

    sortedComments.forEach(comment => {
      const blogPost = blogInfoMap[comment.blog];
      const randomImageIndex = Math.floor(
        Math.random() * blogPost.images.length
      );
      comment.blogPostTitle = blogPost.title;
      comment.blogPostImage = blogPost.images[randomImageIndex];
    });

    setSortedComments(sortedComments.slice(0, 5));
  }, [blogInfo, commentInfo, postType]);

  return (
    <div className="m-3">
      <h1 className="mx-0 px-0 mb-3">
        See some of our most{" "}
        <PostTypeSelector setPostType={setPostType} typeText="comments" />
      </h1>
      <CardGroup>
        {sortedComments.map(comment => (
          <Card key={comment._id}>
            <Card.Img
              variant="top"
              src={comment.blogPostImage}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body>
              <Card.Title>{comment.blogPostTitle}</Card.Title>
              <Card.Text>{comment.comment}</Card.Text>
            </Card.Body>
            <Card.Footer className="py-0">
              <small className="text-muted me-2">{comment.user.name}</small>
              <small className="text-muted me-2">{comment.user.email}</small>
              <div style={{ marginTop: "-6px" }}>
                <small className="text-muted">
                  Total votes: {comment.totalVotes}
                </small>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default EditorsChoice;
