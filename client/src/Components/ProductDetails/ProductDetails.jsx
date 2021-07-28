import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import Ratings from "../../shared/Ratings";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetailsAction } from "../../Redux/Actions/ProductActions";
import Loading from "../Loading/Loading";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
const history = useHistory()
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(ProductDetailsAction(path));
    };
    fetchProduct();
  }, [path, dispatch]);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const addToCartHandler = () => {
    history.push(`/cart/${path}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>errrorr.........</h1>
      ) : (
        <div>
          <Link to="/" className="btn btn-light">
            <i class="fas fa-arrow-left    "></i>
            &nbsp; GO BACK
          </Link>
          <Row>
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                className="deeetails"
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.title}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Ratings
                    value={product.rating}
                    text={`${product.NumReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    {product.InStock > 0 ? "In Stock " : "out of stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.InStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.InStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
