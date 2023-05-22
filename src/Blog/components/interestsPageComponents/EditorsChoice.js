import { useState, useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";

const EditorsChoice = ({ blogInfo, commentInfo }) => {
  const [sortedComments, setSortedComments] = useState([]);
  const [postType, setPostType] = useState("popular");

  useEffect(() => {
    const blogInfoMap = blogInfo.reduce((acc, cur) => {
      acc[cur._id] = cur;
      return acc;
    }, {});

    const sortedComments = [...commentInfo].sort((a, b) => {
      if (postType === "popular") {
        return Math.abs(b.totalVotes) - Math.abs(a.totalVotes);
      } else if (postType === "upvoted") {
        return b.totalVotes - a.totalVotes;
      } else {
        // downvoted
        return a.totalVotes - b.totalVotes;
      }
    });

    sortedComments.forEach(comment => {
      const blogPost = blogInfoMap[comment.blog];
      const randomImageIndex = Math.floor(
        Math.random() * blogPost.images.length
      );
      comment.blogPostTitle = blogPost.title;
      comment.blogPostImage = blogPost.images[randomImageIndex];
    });

    setSortedComments(sortedComments);
  }, [blogInfo, commentInfo, postType]);

  console.log(sortedComments);

  return (
    <div className="m-3">
      <h1 className="mx-0 px-0 mb-3">
        See some of our most{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setPostType("popular")}
          className="text-light text-decoration-underline"
        >
          popular
        </span>{" "}
        /{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setPostType("upvoted")}
          className="text-light text-decoration-underline"
        >
          upvoted
        </span>{" "}
        /{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setPostType("downvoted")}
          className="text-light text-decoration-underline"
        >
          downvoted
        </span>{" "}
        comments
      </h1>
      <CardGroup>
        {sortedComments.slice(0, 5).map(comment => (
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
            <Card.Footer>
              <small className="text-muted me-2">{comment.user.name}</small>
              <small className="text-muted me-2">{comment.user.email}</small>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default EditorsChoice;
