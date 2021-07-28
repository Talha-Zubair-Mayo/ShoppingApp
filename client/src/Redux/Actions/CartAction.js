import axios from "axios";
import { Cart_Add_Item, Cart_Remove_Item } from "../Constants/CartConstants";
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${id}`);
  dispatch({
    type: Cart_Add_Item,
    payload: {
      product: data._id,
      title: data.title,
      image: data.image,
      price: data.price,
      InStock: data.InStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: Cart_Remove_Item,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
