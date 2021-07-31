import React from "react";
import { Row, Col } from "react-bootstrap";
import Products from "../Components/Products/Products";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading/Loading";

const Home = () => {
  const productListt = useSelector((state) => state.productList);
  const { loading, error, products } = productListt;

    return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>Error..........</h1>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={3}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
