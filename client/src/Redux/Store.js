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
} from "./Reducers/UserReducer";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: ProductDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userToken: userTokenReducer,
  userInfo: userInfoReducer,
  userRegister: userRegisterReducer,
});

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userInfo: userInfoFromStorage,
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
