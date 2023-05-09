import { CardGroup, Card, Image } from "react-bootstrap";
import useRandomUsers from "./hooks/useRandomUsers";
import { processUsers, concatAndSliceData } from "../utils/helper";

const Relationships = ({ userProfile, allUsers, userInfo, blogInfo }) => {
  const { filteredUsers, latestBlogPost, userAvatars } = processUsers(
    allUsers,
    userInfo,
    blogInfo
  );

  const numAdditionalUsers = Math.max(0, 7 - filteredUsers?.length);
  const additionalUsers = useRandomUsers("female", numAdditionalUsers);
  const users = concatAndSliceData(filteredUsers, additionalUsers?.users, 7);

  return (
    <Card className="mt-4">
      <Card.Title className="my-1">
        Spends most of {userProfile.gender === "male" ? "his" : "her"} time
        with:
      </Card.Title>
      <CardGroup>
        {users.map(user => (
          <Card key={user._id || user.login?.uuid} className="text-center">
            <Image
              variant="top"
              src={userAvatars?.[user._id] || user.picture?.thumbnail}
              roundedCircle
              className="ms-2 me-2"
              style={{ objectFit: "cover", height: "70px", width: "70px" }}
            />
            <Card.Text>
              {typeof user.name === "string"
                ? `${user.name?.split(" ")[0]} ${user.name?.split(" ")[1][0]}.`
                : `${user.name.first} ${user.name.last.charAt(0)}.`}
            </Card.Text>
          </Card>
        ))}
      </CardGroup>
    </Card>
  );
};

export default Relationships;
