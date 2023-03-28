import { useState, useEffect } from "react";
import { CardGroup, Card, Image } from "react-bootstrap";
import axios from "axios";

const Relationships = ({ userProfile }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=7")
      .then(({ data }) => setUsers(data.results));
  }, []);

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
