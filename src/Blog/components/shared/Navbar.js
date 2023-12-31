import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import {
  useAppContextState,
  useAppContextDispatch,
} from "../../store/appContext";
import { useMediaQuery } from "react-responsive";

/**
 * Renders a navigation component with a search bar and links to different pages.
 *
 * @param {function} handleSearch - a callback function to handle search input changes
 * @return {JSX.Element} - the rendered navigation component
 */
// Navigation component
function Navigation({ handleSearch }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { userInfo } = useAppContextState();
  const { logoutUser } = useAppContextDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px" });

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            My Blog
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {handleSearch && (
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className={`me-2 ${isTabletOrMobile ? "my-3" : ""}`}
                    aria-label="Search"
                    onChange={handleSearch}
                  />
                  {!isTabletOrMobile && (
                    <Button variant="outline-dark">Search</Button>
                  )}
                </Form>
              )}
              <Link to="/profile-page" className="nav-link">
                My Profile
              </Link>
              <Link to="/interests-page" className="nav-link">
                Interests
              </Link>
              <Link to="/information-page" className="nav-link">
                Information
              </Link>
              <Link to="/reset-password" className="nav-link">
                Reset-pass
              </Link>
              {userInfo ? (
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => logoutUser(true)}
                >
                  Logout
                </Link>
              ) : (
                <Link className="nav-link" onClick={handleLoginClick}>
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginPage
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

export default Navigation;
