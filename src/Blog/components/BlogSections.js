import { Card, ListGroup } from "react-bootstrap";

const BlogSections = ({ blogDataToShow }) => {
  const scrollToBlogPost = postId => {
    const blogPostElement = document.getElementById(postId);
    if (blogPostElement) {
      blogPostElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Card>
      <Card.Header as="h5">Blog Sections</Card.Header>
      <ListGroup variant="flush">
        {blogDataToShow.map(post => (
          <ListGroup.Item
            key={post._id}
            onClick={() => scrollToBlogPost(post._id)}
            style={{ cursor: "pointer" }}
          >
            {post.title.length > 20
              ? `${post.title.slice(0, 20)}...`
              : post.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default BlogSections;
