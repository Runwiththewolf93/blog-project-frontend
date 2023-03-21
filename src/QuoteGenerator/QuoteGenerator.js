import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styles from "./QuoteGenerator.module.css";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios.get("https://type.fit/api/quotes").then(({ data }) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex].text);
      setAuthor(data[randomIndex].author);
    });
  }, []);

  return (
    <div className={styles["quote-generator-container"]}>
      <Card className={`text-center ${styles["quote-card"]}`}>
        <Card.Body>
          <Card.Text className="h1">
            <FontAwesomeIcon icon={faQuoteLeft} size="sm" /> {quote}{" "}
            <FontAwesomeIcon icon={faQuoteRight} size="sm" />
          </Card.Text>
          <Row>
            <Col md={7}></Col>
            <Col md={5} className="text-end">
              <Card.Text className="text-xl">{author}</Card.Text>
            </Col>
          </Row>
          <div className={styles["button-wrapper"]}>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-dark mt-2 text-left"
                onClick={() => window.open("https://twitter.com")}
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </Button>
              <Button
                variant="outline-dark mt-2 text-left"
                onClick={() => window.open("https://tumblr.com")}
              >
                <FontAwesomeIcon icon={faTumblr} size="2x" />
              </Button>
            </div>
            <Button
              variant="primary mt-2 text-right"
              onClick={() => window.location.reload()}
            >
              New Quote
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Card.Footer className={`text-muted ${styles["card-footer"]}`}>
        By Stevan Zivanovic
      </Card.Footer>
    </div>
  );
};

export default QuoteGenerator;
