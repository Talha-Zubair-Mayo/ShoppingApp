require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
dotenv.config();
require("colors");
const app = express();
const cors = require("cors");
require("./db/DB");
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(cookieparser());
//Routes
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const orderrr = require("./routes/OrderRoutes");
app.use("/api/", product);
app.use("/api", user);
app.use("/api", orderrr);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PayPal_Client_Id);
});

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(process.env.PORT || port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on Port ${port}`.inverse
  );
});
