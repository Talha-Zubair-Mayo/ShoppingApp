import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../../Redux/Actions/CartAction";
import CheckoutStep from "../../shared/CheckoutStep";

import "./ShippingAddress.css";
function ShippingAddress() {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalcode, setPostalcode] = useState(shippingAddress?.postalcode);
  const [country, setCountry] = useState(shippingAddress?.country);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(saveShippingAddress({ address, city, postalcode, country }));
    history.push("/payments");
  };

  return (
    <>
      <CheckoutStep step1 step2 />

      <div className="container">
        <h1>Shipping</h1>
        <p>Please enter your shipping details.</p>
        <hr />
        <form className="form" onSubmit={submitHandler}>
          <label className="field">
            <span className="field__label" htmlFor="address">
              Address
            </span>
            <input
              className="field__input"
              type="text"
              id="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="Postalcode">
                Postal code
              </span>
              <input
                className="field__input"
                type="text"
                id="Postalcode"
                placeholder="Enter postalcode"
                value={postalcode}
                onChange={(e) => setPostalcode(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="city">
                City
              </span>
              <input
                className="field__input"
                type="text"
                id="city"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="Country">
                Country
              </span>
              <input
                className="field__input"
                id="Country"
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
          </div>
          <hr />

          <button className="button" type="submit">
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default ShippingAddress;
