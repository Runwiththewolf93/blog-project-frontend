import { Card, CardGroup } from "react-bootstrap";
import useUnsplashImages from "../../hooks/useUnsplash";

const EditorsChoice = () => {
  const images = useUnsplashImages("random", 3);

  return (
    <div className="m-3">
      <h1>Editors choice:</h1>
      <CardGroup>
        {images.map(image => (
          <Card key={image.id}>
            <Card.Img
              variant="top"
              src={image.urls.regular}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body>
              <Card.Title>
                {image.alt_description.charAt(0).toUpperCase() +
                  image.alt_description.slice(1)}
              </Card.Title>
              <Card.Text>
                {image.description} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Amet ratione voluptatum at laborum tenetur,
                nihil nisi consequuntur minima magni placeat!
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {image.tags.map((tag, idx) => (
                <small key={idx} className="text-muted me-2">
                  {tag.title}
                </small>
              ))}
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default EditorsChoice;
