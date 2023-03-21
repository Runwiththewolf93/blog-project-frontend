import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import styles from "./Navbar.module.css";

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">My Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-dark">Search</Button>
            </Form>
            <Nav.Link href="#home">Link 1</Nav.Link>
            <Nav.Link href="#link">Link 2</Nav.Link>
            <Nav.Link href="#link">Link 3</Nav.Link>
            <Nav.Link href="#link">My Profile</Nav.Link>
            <Nav.Link href="#link">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
