import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation({ handleSearch }) {
  return (
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
                  className="me-2"
                  aria-label="Search"
                  onChange={handleSearch}
                />
                <Button variant="outline-dark">Search</Button>
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
            <Nav.Link href="#link">Login</Nav.Link>
            <Nav.Link href="#link">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
