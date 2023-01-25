import React from "react";
import { Alert, Button } from "react-bootstrap";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { useLoginMutation } from "../services/appApi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation();
  console.log(email, password);
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="loginformcontainer">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1>Login to your Account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" disabled={isLoading}>
                Login
              </Button>
            </Form.Group>
            <p>
              Don't have an Account? <Link to="/signup">Create Account</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="loginimagecontainer"></Col>
      </Row>
    </Container>
  );
};

export default Login;
