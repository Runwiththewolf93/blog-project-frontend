import { Card } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const CardComponent = ({ comment }) => {
  // Use the useMediaQuery hook to check if the screen width is less than or equal to 992px and 576px
  const isLargeScreenAndSmaller = useMediaQuery({
    query: "(max-width: 992px)",
  });
  const isSmallScreenAndSmaller = useMediaQuery({
    query: "(max-width: 576px)",
  });

  const textEllipsis = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Card className={isSmallScreenAndSmaller && "mb-3"}>
      <Card.Img
        variant="top"
        src={comment.blogPostImage}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body
        style={isLargeScreenAndSmaller && textEllipsis}
        className={isSmallScreenAndSmaller && "text-center"}
      >
        <Card.Title className={`d-inline ${isSmallScreenAndSmaller && "fs-3"}`}>
          {comment.blogPostTitle}
        </Card.Title>
        <div className="mt-3" />
        <Card.Text className={`d-inline ${isSmallScreenAndSmaller && "fs-4"}`}>
          {comment.comment}
        </Card.Text>
      </Card.Body>
      <Card.Footer
        className={`py-0 text-muted ${
          isSmallScreenAndSmaller && "text-center fs-5"
        }`}
        style={isLargeScreenAndSmaller && textEllipsis}
      >
        <small>{comment.user.name}</small>
        <div />
        <small>{comment.user.email}</small>
        <div style={{ marginTop: "-6px" }}>
          <small>Total votes: {comment.totalVotes}</small>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CardComponent;
