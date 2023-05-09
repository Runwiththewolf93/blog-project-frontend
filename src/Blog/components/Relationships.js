import { CardGroup, Card, Image } from "react-bootstrap";
import useRandomUsers from "./hooks/useRandomUsers";
import { processUsers } from "../utils/helper";

const Relationships = ({ userProfile, allUsers, userInfo, blogInfo }) => {
  const { users } = useRandomUsers();

  const { filteredUsers, latestBlogPost, userAvatars } = processUsers(
    allUsers,
    userInfo,
    blogInfo
  );

  console.log(users);

  const displayedUsers =
    filteredUsers?.length > 0 ? filteredUsers.slice(0, 7) : users.slice(0, 7);

  return (
    <Card className="mt-4">
      <Card.Title className="my-1">
        Spends most of {userProfile.gender === "male" ? "his" : "her"} time
        with:
      </Card.Title>
      <CardGroup>
        {displayedUsers.map(user => (
          <Card key={user._id || user.id} className="text-center">
            <Image
              variant="top"
              src={userAvatars?.[user._id] || user.picture.thumbnail}
              roundedCircle
              className="ms-2 me-2"
              style={{ objectFit: "cover", height: "70px", width: "70px" }}
            />
            <Card.Text>
              {filteredUsers?.length > 0
                ? `${user.name.split(" ")[0]} ${user.name.split(" ")[1][0]}.`
                : `${user.name.first} ${user.name.last.charAt(0)}.`}
            </Card.Text>
          </Card>
        ))}
      </CardGroup>
    </Card>
  );
};

export default Relationships;
