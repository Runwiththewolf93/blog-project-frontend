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
        <Navbar.Brand href="#home">My Blog</Navbar.Brand>
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
            <Nav.Link href="#link">Link 1</Nav.Link>
            <Nav.Link href="#link">Link 2</Nav.Link>
            <Nav.Link href="#link">Link 3</Nav.Link>
            <Link to="/profile-page" className="nav-link">
              My Profile
            </Link>
            <Nav.Link href="#link">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
