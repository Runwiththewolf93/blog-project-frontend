import { Card, ListGroup } from "react-bootstrap";

const Information = ({ userCommentInfo, userInfo, blogInfo }) => {
  console.log(userCommentInfo);
  console.log(userInfo);
  console.log(blogInfo);

  return (
    <Card className="mt-4">
      <Card.Header>Most Popular Blog Post</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates,
          porro quisquam nisi alias pariatur esse sequi accusamus libero ratione
          perferendis ipsam dolorem in, minus itaque quibusdam recusandae ex
          cumque exercitationem.
        </ListGroup.Item>
        <Card.Header>Most Popular Comment</Card.Header>
        <ListGroup.Item>
          {/* {userProfile.location?.city} {userProfile.location?.country} */}
        </ListGroup.Item>
        <Card.Header>Interesting Fact</Card.Header>
        <ListGroup.Item>
          You are our most prolific voter, congratulations! / You are not our
          most prolific voter, but you are getting there. Keep at it!
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Information;

// I would like to revise my Information component, to make it a bit more dynamic. As far as I'm concerned, we can remake the whole Information component no problem. Below you can find what one of my blogInfo objects looks like, as well as the userInfo object. I'd like to filter through the blogInfo object to find the blogInfo objects of the logged in user. Then, we will find the most popular blog post based on the totalVotes property of the BlogPost. Here we have to keep in mind that popularity goes both ways, so we have to check for both the highest and lowest number of votes for a blog post. E.g., if the highest upvoted post is 2, the highest downvoted post is -3, then the post popular vote is the one with -3. Once we have this blog post, I'd like to display its title and content. How might we do all of this? Relevant code below:
