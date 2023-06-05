import { useState, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import CarouselLogin from "../components/loginPageComponents/CarouselLogin";
import { useAppContextState, useAppContextDispatch } from "../store/appContext";
import { useCommentContextDispatch } from "../store/commentContext";
import LoginForm from "../components/loginPageComponents/LoginForm";
import ErrorAlert from "../components/loginPageComponents/ErrorAlert";
import useForm from "../components/loginPageComponents/useForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const LoginPage = ({ show, handleClose }) => {
  const { isLoading, error, success } = useAppContextState();
  const { registerUser, loginUser, resetUserError, resetUserSuccess } =
    useAppContextDispatch();
  const { resetCommentError } = useCommentContextDispatch();

  const onSubmit = values => {
    const { name, email, password, isMember } = values;
    if (isMember) {
      loginUser({ email, password });
    } else {
      registerUser({ name, email, password });
    }
  };

  const { values, handleChange, handleSubmit, formValid, setValues } = useForm(
    initialState,
    onSubmit,
    error,
    resetUserError,
    resetUserSuccess
  );

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (success) {
      handleClose();
      resetUserError();
      resetUserSuccess();
      resetCommentError();
    }
  }, [
    success,
    handleClose,
    resetUserError,
    resetUserSuccess,
    resetCommentError,
  ]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
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
              <h1 className="text-center mb-4">
                {values.isMember ? "Login to blog" : "Create an account"}
              </h1>
              <LoginForm
                onSubmit={handleSubmit}
                values={values}
                handleChange={handleChange}
                formValid={formValid}
                isLoading={isLoading}
                toggleMember={toggleMember}
              />
              <ErrorAlert
                error={error}
                showError={showError}
                setShowError={setShowError}
              />
            </Col>
            <Col md={6}>
              <CarouselLogin />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default LoginPage;
