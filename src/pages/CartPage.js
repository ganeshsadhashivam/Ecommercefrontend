import React from "react";
import { Container, Row, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./CartPage.css";
const CartPage = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
      <Row>
        <h1 className="pt-2 h4">Shopping Cart</h1>
        {cart.length == 0 ? (
          <Alert variant="info">
            Shopping Cart is Empty. Add Products to Your Cart
          </Alert>
        ) : (
          <div>Payment here</div>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
