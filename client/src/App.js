import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import { UserTokenAction, UserInfoAction } from "./Redux/Actions/UserActions";
import { ProductListaction } from "./Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import Payments from "./Components/Payments/Payments";
import Order from "./Components/Order/Order";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import { useEffect } from "react";
import MyOrders from "./Components/MyOrders/MyOrders";
import { MyOrdersAction } from "./Redux/Actions/OrderActions";


function App() {
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
  }, [logged]);
  const userTokeno = useSelector((state) => state.userToken);
  const { userToken } = userTokeno;

  if (userToken) {
    dispatch(UserInfoAction(userToken));
    dispatch(MyOrdersAction(userToken));
  }

  return (
    <>
      <Header />
      <main className="my-3">
        <Container>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/product/:id">
              <ProductDetails />
            </Route>
            <Route exact path="/cart/:id?">
              <Cart />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/shippingaddress">
              <ShippingAddress />
            </Route>
            <Route exact path="/payments">
              <Payments />
            </Route>
            <Route exact path="/Order">
              <Order />
            </Route>
            <Route exact path="/order/:id">
              <OrderDetails />
            </Route>
            <Route exact path="/orderhistory">
              <MyOrders />
            </Route>
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
