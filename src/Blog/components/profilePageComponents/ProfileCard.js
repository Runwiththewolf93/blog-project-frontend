import { Card, ListGroup, Alert } from "react-bootstrap";
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
import useFetchHighestVotedBlogComments from "./useFetchHighestVotedBlogComments";
import { useMediaQuery } from "react-responsive";

/**
 * Renders a profile card component.
 *
 * @param {Object} userProfile - The user profile object.
 * @param {Object} userInfo - The user info object.
 * @param {Object} blogInfo - The blog info object.
 * @param {Array} userCommentInfo - The user comment info array.
 * @param {boolean} isLoadingUserComment - Flag indicating if user comment is loading.
 * @param {boolean} errorUserComment - Error flag for user comment.
 * @return {JSX.Element} The profile card component.
 */
// ProfileCard component
const ProfileCard = ({
  userProfile,
  userInfo,
  blogInfo,
  userCommentInfo,
  isLoadingUserComment,
  errorUserComment,
}) => {
  const { isLoadingComment, blogCommentInfo, errorComment } =
    useFetchHighestVotedBlogComments(blogInfo);

  const sortedComments = userCommentInfo?.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return 0;
    }
  });

  const avatar = getLatestAvatar(blogInfo, userInfo);

  const isLessThan1200px = useMediaQuery({ query: "(max-width: 1200px)" });

  if (isLoadingUserComment || isLoadingComment) {
    return <Spinner />;
  } else if (errorUserComment || errorComment) {
    return <Alert>Error fetching comments</Alert>;
  }

  return (
    <Card className={isLessThan1200px && "mb-4"}>
      {userProfile ? (
        <>
          <Card.Img
            variant="top"
            src={avatar || userProfile.picture?.large}
            alt={`${userProfile.name?.first} ${userProfile.name?.last}`}
          />
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
                  {truncateContent(sortedComments[0]?.comment, 200)}
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
