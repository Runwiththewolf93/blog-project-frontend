import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import CarouselLogin from "../components/CarouselLogin";

const LoginPage = ({ show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        aria-labelledby="modal-styling-title"
      >
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <h1 className="text-center mb-4">Create account</h1>
                <Form>
                  <Form.Group className="mb-3" controlId="ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      aria-label="Password"
                      aria-required="true"
                      autoComplete="new-password"
                    />
                    <Form.Text className="text-muted">
                      Your password mut be at least 8 characters long and
                      contain a combination of letters, numbers, and special
                      characters.
                    </Form.Text>
                  </Form.Group>
                </Form>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="mt-3 w-100"
                >
                  Sign up
                </Button>
              </Col>
              <Col md={6}>
                <CarouselLogin />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginPage;
