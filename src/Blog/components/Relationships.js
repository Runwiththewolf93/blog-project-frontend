import { CardGroup, Card, Image } from "react-bootstrap";
import useRandomUsers from "./hooks/useRandomUsers";
import { getLatestAvatar } from "../utils/helper";

const Relationships = ({ userProfile, allUsers, userInfo, blogInfo }) => {
  const { users } = useRandomUsers();

  const avatar = getLatestAvatar(blogInfo, userInfo);

  return (
    <Card className="mt-4">
      <Card.Title className="my-1">
        Spends most of {userProfile.gender === "male" ? "his" : "her"} time
        with:
      </Card.Title>
      <CardGroup>
        {users.map(user => (
          <Card key={user.login.uuid}>
            <Image
              variant="top"
              src={user.picture.thumbnail}
              roundedCircle
              className="ms-2 me-2"
            />
            <Card.Text>{`${user.name.first} ${user.name.last.charAt(
              0
            )}.`}</Card.Text>
          </Card>
        ))}
      </CardGroup>
    </Card>
  );
};

export default Relationships;
