import { CardGroup, Card, Image, Spinner, Alert } from "react-bootstrap";
import useRandomUsers from "../../hooks/useRandomUsers";
import { processUsers, concatAndSliceData } from "../../utils/helper";
import { useAppContextState } from "../../store/appContext";

const Relationships = ({ userProfile, userInfo, blogInfo }) => {
  const { isLoading, users: allUsers, error } = useAppContextState();

  const { filteredUsers, userAvatars } = processUsers(
    allUsers,
    userInfo,
    blogInfo
  );

  const numAdditionalUsers = Math.max(0, 7 - filteredUsers?.length);
  const additionalUsers = useRandomUsers("female", numAdditionalUsers);
  const users = concatAndSliceData(filteredUsers, additionalUsers?.users, 7);

  const imgStyle = {
    objectFit: "cover",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
  };

  const imgContainerStyle = {
    width: "100%",
    paddingBottom: "100%",
    position: "relative",
    margin: "auto",
  };

  const cardStyle = {
    flex: "1 0 30%",
    maxWidth: "25%",
  };

  const cardTextStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    height: "1.2em",
    lineHeight: "1.2em",
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert>{error}</Alert>;
  }

  return (
    <Card className="mt-4 p-1">
      <Card.Title className="my-1">
        Spends most of {userProfile.gender === "male" ? "his" : "her"} time
        with:
      </Card.Title>
      <CardGroup className="d-flex justify-content-around flex-wrap">
        {users.map(user => (
          <Card
            key={user._id || user.login?.uuid}
            className="text-center flex-fill"
            style={cardStyle}
          >
            <div style={imgContainerStyle}>
              <Image
                variant="top"
                src={userAvatars?.[user._id] || user.picture?.thumbnail}
                style={imgStyle}
              />
            </div>
            <Card.Text style={cardTextStyle}>
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
