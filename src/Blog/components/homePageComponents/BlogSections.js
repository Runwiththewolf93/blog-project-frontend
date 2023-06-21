import { Card, ListGroup } from "react-bootstrap";
import { useBlogContextDispatch } from "../../store/blogContext";
import { useMediaQuery } from "react-responsive";

const BlogSections = ({ blogDataToShow }) => {
  const { scrollToBlogPost } = useBlogContextDispatch();
  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Card className={isTabletOrMobileDevice && "mb-3"}>
      <Card.Header
        as="h5"
        className={isTabletOrMobileDevice && "text-center fw-bold fs-3"}
      >
        Blog Sections
      </Card.Header>
      <ListGroup variant="flush">
        {blogDataToShow.map(post => (
          <ListGroup.Item
            key={post._id}
            onClick={() => scrollToBlogPost(post._id)}
            style={{ cursor: "pointer" }}
            className={isTabletOrMobileDevice && "text-center fw-bold fs-5"}
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
