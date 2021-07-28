import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Products from "../Components/Products/Products";
import { ProductListaction } from "../Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading/Loading";
import { UserTokenAction, UserInfoAction } from "../Redux/Actions/UserActions";

const Home = () => {
  const productListt = useSelector((state) => state.productList);
  const { loading, error, products } = productListt;
  const dispatch = useDispatch();

  const logged = localStorage.getItem("userLog");
  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(ProductListaction());
      if (logged) {
        await dispatch(UserTokenAction());
      }
    };
    fetchProducts();
  }, []);
  const userTokeno = useSelector((state) => state.userToken);
  const { userToken } = userTokeno;
  const token = localStorage.getItem("token");

  if (userToken) {
    dispatch(UserInfoAction(userToken));
  }
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
