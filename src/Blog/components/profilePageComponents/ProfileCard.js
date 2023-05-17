import { Card, ListGroup } from "react-bootstrap";
import Spinner from "../shared/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { capitalizeName, getLatestAvatar } from "../../utils/helper";

const ProfileCard = ({ userProfile, userInfo, blogInfo, userCommentInfo }) => {
  const sortedComments = userCommentInfo?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const avatar = getLatestAvatar(blogInfo, userInfo);

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
            <Card.Subtitle className="text-muted mb-1">
              Your most recent comment:
            </Card.Subtitle>
            <Card.Text>
              {sortedComments.length > 0 &&
              sortedComments[0]?.comment.length > 200
                ? sortedComments[0]?.comment.slice(0, 200) + "..."
                : sortedComments[0]?.comment}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              {userInfo?.email || userProfile.email}
            </ListGroup.Item>
            <ListGroup.Item>{userProfile.location?.city}</ListGroup.Item>
            <ListGroup.Item>{userProfile.phone}</ListGroup.Item>
          </ListGroup>
          <Card.Body className="d-flex justify-content-around">
            <Card.Link href="https://www.facebook.com/">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </Card.Link>
            <Card.Link href="https://www.instagram.com/">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
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
