import { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTwitter, FaUser, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const NavbarComponent = () => {
  const context = useContext(AuthContext);
  const isAuthenticated = context?.isAuthenticated;
  const user = context?.user;
  const { logout } = context!;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="w-100"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaTwitter /> MiniTweet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to={`/profile/${user?.username}`}>
                  <FaUser /> {user?.username}
                </Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
