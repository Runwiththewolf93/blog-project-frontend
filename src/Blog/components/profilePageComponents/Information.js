import { Card, ListGroup } from "react-bootstrap";
import {
  findMostPopularItem,
  truncateContent,
  countUserVoteObjects,
} from "../../utils/helper";
import { useVoteContextState } from "../../store/voteContext";

const Information = ({ userCommentInfo, userInfo, blogInfo }) => {
  const { voteInfo } = useVoteContextState();

  // Filter blogInfo to only include blogs of the current user
  const userBlogs = blogInfo?.filter(blog => blog.user._id === userInfo._id);

  // Find the most popular (highest or lowest vote count) blog post
  const mostPopularBlogPost = findMostPopularItem(userBlogs, "totalVotes");

  // Find the most popular (highest or lowest vote count) comment
  const mostPopularComment = findMostPopularItem(userCommentInfo, "totalVotes");

  // Count the vote objects for each user
  const userVoteCounts = countUserVoteObjects(voteInfo);

  // Get the vote count of the logged-in user
  const userVoteCount = userVoteCounts[userInfo._id];

  // Find the maximum vote count among all users
  const maxVoteCount = Math.max(...Object.values(userVoteCounts));

  let prolificVoterMessage;

  if (userVoteCount === maxVoteCount) {
    prolificVoterMessage =
      "Congratulations! You are our most prolific voter! Keep it up!";
  } else {
    prolificVoterMessage =
      "You are not our most prolific voter, but you are getting there. Keep it up!";
  }

  return (
    <Card className="mt-4">
      <Card.Header>Most Popular Blog Post</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h5>{mostPopularBlogPost.title}</h5>
          <p>{truncateContent(mostPopularBlogPost.content, 100)}</p>
        </ListGroup.Item>
        <Card.Header>Most Popular Comment</Card.Header>
        <ListGroup.Item>
          <p>{truncateContent(mostPopularComment.comment, 100)}</p>
        </ListGroup.Item>
        <Card.Header>Interesting Fact</Card.Header>
        <ListGroup.Item>{prolificVoterMessage}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Information;
