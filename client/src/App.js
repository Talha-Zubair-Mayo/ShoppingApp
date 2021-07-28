import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";

import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";




function App() {
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
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
