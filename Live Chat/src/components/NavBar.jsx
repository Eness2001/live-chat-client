import React from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Notifications from "./chat/Notifications";
const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar
      bg="dark"
      className="mb-4"
      style={{
        height: "3.75rem",
        position: "fixed",
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        {user && (
          <span className="text-warning">Logged in as {user?.name}</span>
        )}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
              <Notifications />
                <Link
                  to="/"
                  className="link-light text-decoration-none"
                  onClick={() => logoutUser()}
                >
                  Log Out
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
