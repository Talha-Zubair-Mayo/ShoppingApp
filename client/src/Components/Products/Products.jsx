import React from "react";
import "./Products.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "../../shared/Ratings";

const Products = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded cardd">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" className="imagess" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.title}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Ratings
              value={product.rating}
              text={`${product.NumReviews} reviews`}
            />
            {/* {product.rating} from {`${product.NumReviews} reviews`} */}
          </Card.Text>
          <Card.Text as="div">$ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Products;
