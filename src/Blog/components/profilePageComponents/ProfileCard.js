import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import Spinner from "../shared/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  capitalizeName,
  getLatestAvatar,
  truncateContent,
} from "../../utils/helper";
import { Link } from "react-router-dom";
import {
  useCommentContextState,
  useCommentContextDispatch,
} from "../../store/commentContext";

const ProfileCard = ({
  userProfile,
  userInfo,
  blogInfo,
  userCommentInfo,
  isLoadingUserComment,
}) => {
  const { blogCommentInfo } = useCommentContextState();
  const { getAllCommentsBlogPost } = useCommentContextDispatch();

  useEffect(() => {
    // Find the blog post with the highest absolute totalVotes
    if (blogInfo && blogInfo.length > 0) {
      const highestVotedBlog = blogInfo.reduce((prev, current) => {
        return Math.abs(prev.totalVotes) > Math.abs(current.totalVotes)
          ? prev
          : current;
      });

      // Fetch comments related to the highest voted blog post
      if (highestVotedBlog && highestVotedBlog._id) {
        getAllCommentsBlogPost(highestVotedBlog._id);
      }
    }

    // eslint-disable-next-line
  }, [blogInfo]);

  const sortedComments = userCommentInfo?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const avatar = getLatestAvatar(blogInfo, userInfo);

  if (isLoadingUserComment) {
    return <Spinner />;
  }

  return (
    <Card>
      {userProfile ? (
        <>
          <Card.Img variant="top" src={avatar || userProfile.picture?.large} />
          <Card.Body>
            <Card.Title className="mb-3">
              {capitalizeName(userInfo?.name) ||
                userProfile.name?.first + userProfile.name?.last}
            </Card.Title>
            {sortedComments && sortedComments.length > 0 ? (
              <>
                <Card.Subtitle className="text-muted mb-1">
                  Your most recent comment:
                </Card.Subtitle>
                <Card.Text>
                  {sortedComments.length > 0 &&
                  sortedComments[0]?.comment.length > 200
                    ? sortedComments[0]?.comment.slice(0, 200) + "..."
                    : sortedComments[0]?.comment}
                </Card.Text>
              </>
            ) : (
              <Card.Text>
                You have no comments yet. <Link to="/">Add some</Link>
              </Card.Text>
            )}
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              {userInfo?.email || userProfile.email}
            </ListGroup.Item>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Below are the comments of your highest upvoted blog post. Enjoy!
              </ListGroup.Item>
              {blogCommentInfo && blogCommentInfo.length > 0 ? (
                blogCommentInfo.map(comment => (
                  <ListGroup.Item key={comment._id}>
                    {truncateContent(comment.comment, 100)}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No comments yet.</ListGroup.Item>
              )}
            </ListGroup>
          </ListGroup>
          <Card.Body className="d-flex justify-content-around">
            <Card.Link href="https://www.facebook.com/">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </Card.Link>
            <Card.Link href="https://www.instagram.com/">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Card.Link>
            <Card.Link href="https://twitter.com/">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Card.Link>
            <Card.Link href="https://github.com/">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Card.Link>
          </Card.Body>
        </>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};

export default ProfileCard;
