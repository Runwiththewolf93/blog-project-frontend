import { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Layout from "../components/Layout";
import Exchange from "../components/informationComponents/Exchange";
import Geolocation from "../components/informationComponents/Geolocation";
import Holiday from "../components/informationComponents/Holiday";

const InformationPage = () => {
  const [activeLink, setActiveLink] = useState("exchange");

  const links = [
    { text: "Exchange", component: <Exchange /> },
    { text: "Geolocation", component: <Geolocation /> },
    { text: "Holiday", component: <Holiday /> },
  ];

  return (
    <Layout>
      <Row className="m-3">
        <Col>
          <h1>Information that might be of interest to you...</h1>
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

// const randomIp = Array(4)
//   .fill(0)
//   .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
//   .join(".");

// console.log(randomIp);
