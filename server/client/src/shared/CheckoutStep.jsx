import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/login">
              <Nav.Link>LOGIN</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>login</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/shippingaddress">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/payments">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/order">
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutStep;
