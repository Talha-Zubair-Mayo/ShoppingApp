import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Table } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { LinkContainer } from "react-router-bootstrap";
import { MyOrdersAction } from "../../Redux/Actions/OrderActions";

function MyOrders() {

    const dispatch = useDispatch()
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(MyOrdersAction());
    };
    fetchProducts();
  }, [dispatch]);

  const orderListMy = useSelector((state) => state.myOrder);
  const { loading, order, error } = orderListMy;
  return (
    <>
      <Row>
        <Col md={12}>
          <h1>My Orders</h1>
          {loading ? (
            <Loading />
          ) : error ? (
            <h2 className="danger">{error}</h2>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>DATE</td>
                  <td>TOTAL</td>
                  <td>PAID</td>
                  <td>DELIVERD</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {order?.map((ordersss) => (
                  <tr key={ordersss._id}>
                    <td>{ordersss._id}</td>
                    <td>{ordersss.createdAt.substring(0, 10)}</td>
                    <td>${ordersss.totalPrice}</td>
                    <td>
                      {ordersss.isPaid ? (
                        ordersss.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {ordersss.isDeleverd ? (
                        ordersss.deleverdAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${ordersss._id}`}>
                        <Button variant="light">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
}

export default MyOrders;
