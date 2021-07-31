import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductListReducer,
  ProductDetailReducer,
} from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducer";
import {
  userLoginReducer,
  userTokenReducer,
  userInfoReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./Reducers/UserReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderLISTReducer,
  orderPayReducer,
} from "./Reducers/OrderReducer";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userToken: userTokenReducer,
  userInfo: userInfoReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrder: orderLISTReducer,
});

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userInfo: userInfoFromStorage,
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
