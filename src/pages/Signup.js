import React from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";
import { Alert } from "bootstrap";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();
  //handle SignUp
  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="signupimagecontainer"></Col>
        <Col md={6} className="signupformcontainer">
          <Form style={{ width: "100%" }} onSubmit={handleSignUp}>
            <h1>Create an Account</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group onSubmit={handleSignUp}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
                Create Account
              </Button>
            </Form.Group>
            <p>
              Don't have an Account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
