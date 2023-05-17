import { useState } from "react";
import { Accordion } from "react-bootstrap";
import useUnsplashImages from "../../hooks/useUnsplash";

function OtherChoices() {
  const [activeItem, setActiveItem] = useState("0");

  let query = "city";
  if (activeItem === "1") query = "sea";
  if (activeItem === "2") query = "forest";

  const images = useUnsplashImages(query, 3);

  return (
    <div className="m-3">
      <h1>Other topics that might interest you...</h1>
      <Accordion defaultActiveKey="0">
        {[
          { eventKey: "0", title: "Items of interest #1" },
          { eventKey: "1", title: "Items of interest #2" },
          { eventKey: "2", title: "Items of interest #3" },
        ].map((item, idx) => (
          <Accordion.Item key={item.eventKey} eventKey={item.eventKey}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body onEnter={() => setActiveItem(idx.toString())}>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {images.map(image => (
                  <div className="col" key={image.id}>
                    <div className="card h-100">
                      <img
                        src={image.urls.regular}
                        alt={image.alt_description}
                        className="card-img-top"
                        style={{ objectFit: "cover", height: "200px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {image.alt_description.charAt(0).toUpperCase() +
                            image.alt_description.slice(1)}
                        </h5>
                        <p className="card-text">
                          {image.description ||
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, provident!"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default OtherChoices;
