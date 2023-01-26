import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "./Navigation.css";
import { LinkContainer } from "react-router-bootstrap";
import { NavbarBrand } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { Button } from "react-bootstrap";

const Navigation = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Ecommerce</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if no user */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            {/* if user  */}

            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}

            {user && (
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                {user.isAdmin && (
                  <>
                    <LinkContainer to="/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/new-product">
                      <NavDropdown.Item>Create Product</NavDropdown.Item>
                    </LinkContainer>
                    {/* <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item> */}
                  </>
                )}

                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/cart">
                      <NavDropdown.Item>Cart</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>My orders</NavDropdown.Item>
                    </LinkContainer>
                    {/* <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item> */}
                  </>
                )}
                <NavDropdown.Divider />
                {/* <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
                <Button
                  variant="danger"
                  onClick={handlelogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
