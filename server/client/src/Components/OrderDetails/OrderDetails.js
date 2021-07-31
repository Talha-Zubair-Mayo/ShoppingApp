import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import {Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../Redux/Actions/OrderActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import axios from "axios";
import { Order_Payment_Reset } from "../../Redux/Constants/OrderConstant";
function OrderDetails() {
  const [sdkReady, setSdkReady] = useState(false);
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const orderDetail = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetail;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successpay } = orderPay;
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
    localStorage.setItem("cartItems", []);
  };
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successpay) {
      dispatch({ type: Order_Payment_Reset });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successpay]);
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup.Item variant="flush">
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email : </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address :</strong>
                {order.shippingAddress.address}&nbsp;
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.postalcode}&nbsp;
                {order.shippingAddress.country}&nbsp;
              </p>
              {order.isDeliverd ? (
                <h2 className="text-success">Paid On {order.isDeliverd}</h2>
              ) : (
                <h2 className="text-danger">Not Deliverd</h2>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                <strong>{order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <h2 className="text-success">
                  Paid On {order.paidAt.substring(0, 10)}
                </h2>
              ) : (
                <h2 className="text-danger">Not Paid</h2>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <h2>Your Cart is Empty</h2>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ${item.price} = ${item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <h2 className="text-danger">{error}</h2>}
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loading />}
                {!sdkReady ? (
                  <Loading />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </Col>
        </Row>
      )}
    </>
  );
}

export default OrderDetails;
