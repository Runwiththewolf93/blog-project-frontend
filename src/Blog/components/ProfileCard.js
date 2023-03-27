import { Card, ListGroup } from "react-bootstrap";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const ProfileCard = ({ userProfile }) => {
  return (
    <Card>
      {userProfile ? (
        <>
          <Card.Img variant="top" src={userProfile.picture?.large} />
          <Card.Body>
            <Card.Title>
              {userProfile.name?.first} {userProfile.name?.last}
            </Card.Title>
            <Card.Text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
              voluptates doloribus quasi inventore provident. Saepe reiciendis
              doloremque consectetur distinctio sit facilis iste aut voluptas
              quae!
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{userProfile.email}</ListGroup.Item>
            <ListGroup.Item>{userProfile.location?.city}</ListGroup.Item>
            <ListGroup.Item>{userProfile.phone}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
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
