import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Accordion,
} from "react-bootstrap";
import * as marked from "marked";
import styles from "./MarkdownPreview.module.css";
import classNames from "classnames";

const defaultMarkdown = `
# Heading 1
## Heading 2
[Link](https://www.example.com)
\`inline code\`
\`\`\`
// code block
function foo() {
  console.log('Hello, world!');
}
\`\`\`
- List item 1
- List item 2
> Blockquote
![Image](https://via.placeholder.com/150x150)
**Bold text**
`;

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setMarkdown(defaultMarkdown);
  }, []);

  const handleMarkdownChange = e => {
    setMarkdown(e.target.value);
  };

  const renderMarkdown = () => {
    return { __html: marked.parse(markdown) };
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-3">Markdown Previewer</h1>
        </Col>
      </Row>
      <Row>
        <Card className={expanded ? `${styles.fullscreen}` : ""}>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label className="mt-2">Editor</Form.Label>
                  <Button
                    className="mb-3"
                    onClick={() => setExpanded(!expanded)}
                  >
                    Button
                  </Button>
                </div>
                <Form.Control
                  as="textarea"
                  id="editor"
                  value={markdown}
                  onChange={handleMarkdownChange}
                  rows={10}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Accordion defaultActiveKey="0" className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              <div className={styles["markdown-preview-container"]}>
                <div id="preview" dangerouslySetInnerHTML={renderMarkdown()} />
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default MarkdownPreviewer;
