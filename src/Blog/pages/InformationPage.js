import { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Layout from "../components/Layout";
import Exchange from "../components/informationComponents/Exchange";
import Geolocation from "../components/informationComponents/Geolocation";
import Holiday from "../components/informationComponents/Holiday";
import useGeolocation from "../components/hooks/useGeolocation";

const InformationPage = () => {
  const apiKey = process.env.REACT_APP_ABSTRACT_LOCATION_API_KEY;
  const locationData = useGeolocation(apiKey);

  const links = [
    { text: "Exchange rates for your trip", component: <Exchange /> },
    {
      text: "Location of your trip",
      component: locationData && <Geolocation locationData={locationData} />,
    },
    {
      text: "Holiday season at destination",
      component: locationData && <Holiday locationData={locationData} />,
    },
  ];

  const [activeLink, setActiveLink] = useState(links[0].text.toLowerCase());

  return (
    <Layout>
      <Row className="m-3">
        <Col>
          <h1>Information that might be of interest to you...</h1>
          <Col md={8}>
            <ListGroup>
              {links.map((link, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => setActiveLink(link.text.toLowerCase())}
                  active={activeLink === link.text.toLowerCase()}
                  action
                >
                  {link.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col>
          {links.map((link, index) => (
            <Container key={index}>
              {activeLink === link.text.toLowerCase() && link.component}
            </Container>
          ))}
        </Col>
      </Row>
    </Layout>
  );
};

export default InformationPage;
