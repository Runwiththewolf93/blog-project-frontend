import { Row, Col, Nav, Tab, Image, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import FigureComponent from "./Figure";

function TabbedInterface({
  locationData,
  images,
  isLoadingGeolocation,
  isLoadingImages,
  errorGeolocation,
  errorImages,
}) {
  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={4}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">
                General information about vacation location
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                Pictures of the potential vacation location
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Row>
                <Col sm={12}>
                  <h4
                    className="mb-4"
                    style={{ transform: "translateX(-15px)" }}
                  >
                    <FontAwesomeIcon
                      icon={faLocationCrosshairs}
                      size="2x"
                      style={{ transform: "translateY(10px)" }}
                    />
                    <strong className="ps-1">Location Information:</strong>
                  </h4>
                  {isLoadingGeolocation ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : errorGeolocation ? (
                    <Alert variant="danger">{errorGeolocation}</Alert>
                  ) : (
                    <Row className="align-items-start">
                      <Col xs={1}>
                        <FontAwesomeIcon icon={faCircle} />
                        <FontAwesomeIcon
                          style={{ marginTop: "20px" }}
                          icon={faCircle}
                        />
                        {Array(7)
                          .fill(null)
                          .map((_, index) => (
                            <FontAwesomeIcon
                              key={index}
                              style={{ marginTop: "20px" }}
                              icon={faCircle}
                            />
                          ))}
                        <FontAwesomeIcon
                          style={{ marginTop: "37px" }}
                          icon={faCircle}
                        />
                      </Col>
                      <Col xs={11}>
                        <p>
                          <strong>Continent:</strong> {locationData.continent}
                        </p>
                        <p>
                          <strong>Country:</strong> {locationData.country} (
                          {locationData.country_code})
                        </p>
                        <p>
                          <strong>City:</strong> {locationData.city}
                        </p>
                        <p>
                          <strong>Region:</strong> {locationData.region}
                        </p>
                        <p>
                          <strong>Postal Code:</strong>{" "}
                          {locationData.postal_code}
                        </p>
                        <p>
                          <strong>Latitude:</strong> {locationData.latitude}
                        </p>
                        <p>
                          <strong>Longitude:</strong> {locationData.longitude}
                        </p>
                        <p>
                          <strong>Currency:</strong>{" "}
                          {locationData.currency_name} (
                          {locationData.currency_code || "No info"})
                        </p>
                        <p>
                          <strong>Current Time:</strong>{" "}
                          {locationData.current_time}
                        </p>
                        <p>
                          <strong>Flag:</strong>
                          <Image
                            src={locationData.png}
                            style={{
                              width: "120px",
                              height: "60px",
                              marginLeft: "1rem",
                            }}
                          />
                        </p>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              {isLoadingImages ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : errorImages ? (
                <Alert variant="danger">{errorImages}</Alert>
              ) : (
                <FigureComponent images={images} />
              )}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

// images tomorrow

export default TabbedInterface;
