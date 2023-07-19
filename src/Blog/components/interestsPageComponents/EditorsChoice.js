import { useState, useEffect } from "react";
import { Row, Col, CardGroup, Spinner, Alert } from "react-bootstrap";
import { sortData } from "../../utils/helper";
import PostTypeSelector from "./PostTypeSelector";
import { useMediaQuery } from "react-responsive";
import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";

/**
 * Renders a component that displays a selection of editor's choice comments based on the provided blog and comment information.
 *
 * @param {Object} blogInfo - An array of blog information objects.
 * @param {Object} commentInfo - An array of comment information objects.
 * @param {boolean} isLoadingBlog - A boolean indicating whether the blog information is currently being loaded.
 * @param {boolean} isLoadingComment - A boolean indicating whether the comment information is currently being loaded.
 * @return {JSX.Element} The rendered component.
 */
// EditorsChoice component
const EditorsChoice = ({
  blogInfo,
  commentInfo,
  isLoadingBlog,
  isLoadingComment,
}) => {
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
      if (blogPost) {
        const randomImageIndex = Math.floor(
          Math.random() * blogPost.images.length
        );
        comment.blogPostTitle = blogPost.title;
        comment.blogPostImage = blogPost.images[randomImageIndex];
      }
    });

    setSortedComments(sortedComments.slice(0, 6));
  }, [blogInfo, commentInfo, postType]);

  // Use the useMediaQuery hook to check if the screen width is less than or equal to 768px
  const isMediumScreenAndSmaller = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const isSmallScreenAndSmaller = useMediaQuery({
    query: "(max-width: 576px)",
  });

  if (isLoadingBlog || isLoadingComment) {
    return <Spinner variant="primary" />;
  }

  if (sortedComments.length === 0) {
    return (
      <Alert>
        Looks like no comments have been added. Head over to the{" "}
        <Link to="/">home page</Link> to add some!
      </Alert>
    );
  }

  return (
    <div className="m-3">
      <h1 className="mx-0 px-0 mb-3">
        See some of our most{" "}
        <PostTypeSelector setPostType={setPostType} typeText="comments" />
      </h1>
      {isMediumScreenAndSmaller ? (
        <>
          <Row className={!isSmallScreenAndSmaller && "my-4"}>
            {sortedComments.slice(0, 3).map(comment => (
              <Col sm={4} key={comment._id}>
                <CardComponent comment={comment} />
              </Col>
            ))}
          </Row>
          <Row>
            {sortedComments.slice(3, 6).map(comment => (
              <Col sm={4} key={comment._id}>
                <CardComponent comment={comment} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <CardGroup>
          {sortedComments.map(comment => (
            <CardComponent key={comment._id} comment={comment} />
          ))}
        </CardGroup>
      )}
    </div>
  );
};

export default EditorsChoice;
