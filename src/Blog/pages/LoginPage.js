import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import CarouselLogin from "../components/CarouselLogin";
import { useAppContext } from "../components/store/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

// figure out error issues

const LoginPage = ({ show, handleClose }) => {
  const [values, setValues] = useState(initialState);
  const [formValid, setFormValid] = useState(false);
  const { isLoading, error, registerUser, loginUser } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const checkFormValidity = () => {
    const { email, password } = values;
    if (values.isMember) {
      if (email && password) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    } else {
      const { name } = values;
      if (name && email && password) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    checkFormValidity();
  };

  const onSubmit = e => {
    console.log("does this shit work");
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!formValid) {
      window.alert("Please provide all values");
      return;
    }
    if (isMember) {
      loginUser({ email, password });
    } else {
      registerUser({ name, email, password });
    }
    handleClose();
  };

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
                {error && <Alert variant="danger">{error}</Alert>}
                <h1 className="text-center mb-4">
                  {values.isMember ? "Login to blog" : "Create an account"}
                </h1>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="ControlInput1">
                    {!values.isMember && (
                      <div className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Username93"
                          autoFocus
                          required
                          value={values.name}
                          onChange={handleChange}
                          name="name"
                        />
                        <Form.Text className="text-muted">
                          Be as unique as possible when creating your username.
                          Leave your mark!
                        </Form.Text>
                      </div>
                    )}
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      required
                      value={values.email}
                      onChange={handleChange}
                      name="email"
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
                      required
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                    />
                    <Form.Text className="text-muted">
                      Your password mut be at least 6 characters long and
                      contain a combination of letters, numbers, and special
                      characters.
                    </Form.Text>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="secondary"
                    onClick={handleClose}
                    disabled={isLoading || !formValid || error}
                    className="mt-3 w-100 fs-5"
                  >
                    Submit
                  </Button>
                  <p className="text-center mt-3 fs-5">
                    {values.isMember
                      ? "Not a member yet?"
                      : "Already a member?"}
                    <Button
                      style={{ paddingTop: "3px" }}
                      variant="link"
                      type="button"
                      onClick={toggleMember}
                      className="fs-5"
                    >
                      {values.isMember ? "Register" : "Login"}
                    </Button>
                  </p>
                </Form>
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
